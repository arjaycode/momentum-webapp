<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Habit;
use App\Models\HabitLog;
use App\Models\HabitsCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class HabitApiController extends Controller
{
    /**
     * Get all habits for the authenticated user
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        $habits = Habit::where('user_id', $user->id)
            ->with(['category', 'user'])
            ->orderBy('created_at', 'desc')
            ->get();

        // Calculate streak and check completion status for each habit
        $today = now()->toDateString();
        $habits = $habits->map(function($habit) use ($today) {
            $habit->streak = $this->calculateHabitStreak($habit);
            $habit->isCompletedToday = HabitLog::where('habit_id', $habit->id)
                ->whereDate('completed_at', $today)
                ->exists();
            return $habit;
        });

        return response()->json([
            'success' => true,
            'data' => $habits,
            'count' => $habits->count()
        ]);
    }

    /**
     * Get a specific habit
     */
    public function show($id)
    {
        $habit = Habit::where('user_id', Auth::id())
            ->with(['category', 'user', 'logs'])
            ->findOrFail($id);

        $streak = $this->calculateHabitStreak($habit);
        $totalDays = $habit->logs->count();

        return response()->json([
            'success' => true,
            'data' => [
                'habit' => $habit,
                'streak' => $streak,
                'total_days' => $totalDays
            ]
        ]);
    }

    /**
     * Create a new habit
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'category_id' => 'nullable|exists:habits_categories,id',
            'description' => 'nullable|string',
            'enable_push_notifications' => 'nullable|boolean',
            'target_days' => 'required|array|min:1',
            'target_days.*' => 'in:Mon,Tue,Wed,Thu,Fri,Sat,Sun',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        // Check if habit name already exists for this user
        $existingHabit = Habit::where('user_id', Auth::id())
            ->where('habit_name', $request->input('name'))
            ->first();

        if ($existingHabit) {
            return response()->json([
                'success' => false,
                'message' => 'A habit with this name already exists'
            ], 409);
        }

        $validated = $validator->validated();
        $validated['user_id'] = Auth::id();
        $validated['enable_push_notifications'] = $request->has('enable_push_notifications') ? true : false;
        $validated['habit_name'] = $validated['name'];
        unset($validated['name']);

        $habit = Habit::create($validated);
        $habit->load(['category', 'user']);

        return response()->json([
            'success' => true,
            'message' => 'Habit created successfully',
            'data' => $habit
        ], 201);
    }

    /**
     * Update a habit
     */
    public function update(Request $request, $id)
    {
        $habit = Habit::where('user_id', Auth::id())->findOrFail($id);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'category_id' => 'nullable|exists:habits_categories,id',
            'description' => 'nullable|string',
            'enable_push_notifications' => 'nullable|boolean',
            'target_days' => 'required|array|min:1',
            'target_days.*' => 'in:Mon,Tue,Wed,Thu,Fri,Sat,Sun',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        // Check if habit name already exists for this user (excluding current habit)
        $existingHabit = Habit::where('user_id', Auth::id())
            ->where('habit_name', $request->input('name'))
            ->where('id', '!=', $habit->id)
            ->first();

        if ($existingHabit) {
            return response()->json([
                'success' => false,
                'message' => 'A habit with this name already exists'
            ], 409);
        }

        $validated = $validator->validated();
        $validated['enable_push_notifications'] = $request->has('enable_push_notifications') ? true : false;
        $validated['habit_name'] = $validated['name'];
        unset($validated['name']);

        $habit->update($validated);
        $habit->load(['category', 'user']);

        return response()->json([
            'success' => true,
            'message' => 'Habit updated successfully',
            'data' => $habit
        ]);
    }

    /**
     * Delete a habit
     */
    public function destroy($id)
    {
        $habit = Habit::where('user_id', Auth::id())->findOrFail($id);
        $habitName = $habit->name;

        // Delete all related habit logs
        HabitLog::where('habit_id', $habit->id)->delete();
        
        $habit->delete();

        return response()->json([
            'success' => true,
            'message' => "Habit '{$habitName}' deleted successfully"
        ]);
    }

    /**
     * Mark a habit as done for today
     */
    public function markAsDone($id)
    {
        $habit = Habit::where('user_id', Auth::id())->findOrFail($id);
        $today = now()->toDateString();

        // Check if already completed today
        $exists = HabitLog::where('habit_id', $habit->id)
            ->whereDate('completed_at', $today)
            ->exists();

        if ($exists) {
            return response()->json([
                'success' => false,
                'message' => 'Habit already marked as done today!'
            ], 400);
        }

        // Create habit log entry
        HabitLog::create([
            'habit_id' => $habit->id,
            'completed_at' => now(),
        ]);

        // Calculate new streak
        $newStreak = $this->calculateHabitStreak($habit);

        return response()->json([
            'success' => true,
            'message' => 'Habit marked as done!',
            'data' => [
                'streak' => $newStreak,
                'habit' => $habit->fresh(['category', 'user'])
            ]
        ]);
    }

    /**
     * Calculate streak for a habit
     */
    private function calculateHabitStreak($habit)
    {
        $logs = HabitLog::where('habit_id', $habit->id)
            ->orderBy('completed_at', 'desc')
            ->pluck('completed_at')
            ->map(function($date) {
                return \Carbon\Carbon::parse($date)->format('Y-m-d');
            })
            ->toArray();

        if (empty($logs)) {
            return 0;
        }

        $streak = 0;
        $today = \Carbon\Carbon::today();
        $checkDate = $today->copy();

        // Check if today is completed
        if (in_array($today->format('Y-m-d'), $logs)) {
            $streak = 1;
            $checkDate->subDay();
        }

        // Count consecutive days backwards
        while (in_array($checkDate->format('Y-m-d'), $logs)) {
            $streak++;
            $checkDate->subDay();
        }

        return $streak;
    }
}
