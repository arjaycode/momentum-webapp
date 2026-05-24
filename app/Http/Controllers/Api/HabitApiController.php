<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Habit;
use App\Models\HabitLog;
use App\Models\HabitsCategory;
use App\Models\Note;
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
            ->with(['category', 'user', 'logs'])
            ->orderBy('created_at', 'desc')
            ->get();

        // Calculate streak and check completion status for each habit
        $today = now()->toDateString();
        $habits = $habits->map(function($habit) use ($today) {
            $habit->streak = $this->calculateHabitStreak($habit);
            $habit->isCompletedToday = HabitLog::where('habit_id', $habit->id)
                ->whereDate('completed_at', $today)
                ->exists();
            // last 30 days completed dates for UI
            $habit->logs_last_30 = HabitLog::where('habit_id', $habit->id)
                ->where('completed_at', '>=', now()->subDays(30))
                ->selectRaw('DATE(completed_at) as completed_date')
                ->distinct()
                ->orderByDesc('completed_date')
                ->pluck('completed_date')
                ->map(function ($d) { return date('Y-m-d', strtotime($d)); })
                ->toArray();

            return $habit;
        });

        return response()->json([
            'success' => true,
            'data' => $habits,
            'count' => $habits->count()
        ]);
    }

    public function dashboard(Request $request)
    {
        $user = Auth::user();
        $totalHabits = Habit::where('user_id', $user->id)->count();
        $totalNotes = Note::where('user_id', $user->id)->count();
        $today = now()->toDateString();

        $completedToday = HabitLog::whereHas('habit', function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->whereDate('completed_at', $today)->pluck('habit_id')->unique()->count();

        $completionRate = $totalHabits > 0
            ? intval(round(($completedToday / $totalHabits) * 100))
            : 0;

        $habits = Habit::where('user_id', $user->id)
            ->with(['category'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($habit) use ($today) {
                $habit->isCompletedToday = HabitLog::where('habit_id', $habit->id)
                    ->whereDate('completed_at', $today)
                    ->exists();
                $habit->streak = $this->calculateHabitStreak($habit);
                return $habit;
            });

        // Filter dashboard habits to only those scheduled for today
        $todayShort = \Carbon\Carbon::now()->format('D'); // Mon, Tue, ...
        $habits = $habits->filter(function ($habit) use ($todayShort) {
            $targetDays = $habit->target_days ?? [];
            return is_array($targetDays) && in_array($todayShort, $targetDays);
        })->values();

        $completedDates = HabitLog::whereHas('habit', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->selectRaw('DATE(completed_at) as completed_date')
            ->distinct()
            ->orderBy('completed_date')
            ->pluck('completed_date')
            ->map(function ($date) {
                return date('Y-m-d', strtotime($date));
            });

        return response()->json([
            'success' => true,
            'data' => [
                'total_habits' => $totalHabits,
                'completed_today' => $completedToday,
                'completion_rate' => $completionRate,
                'notes_count' => $totalNotes,
                'streak' => $this->calculateOverallStreak($user),
                'completed_dates' => $completedDates,
                'habits' => $habits,
            ],
        ]);
    }

    public function search(Request $request)
    {
        $query = $request->query('q', '');
        $habits = Habit::where('user_id', Auth::id())
            ->where('habit_name', 'like', '%' . $query . '%')
            ->with(['category'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($habit) {
                $habit->streak = $this->calculateHabitStreak($habit);
                $habit->isCompletedToday = HabitLog::where('habit_id', $habit->id)
                    ->whereDate('completed_at', now()->toDateString())
                    ->exists();
                return $habit;
            });

        return response()->json([
            'success' => true,
            'data' => $habits,
        ]);
    }

    public function calendar(Request $request)
    {
        $user = Auth::user();
        $month = $request->query('month', now()->month);
        $year = $request->query('year', now()->year);

        $completedDates = HabitLog::whereHas('habit', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->whereYear('completed_at', $year)
            ->whereMonth('completed_at', $month)
            ->selectRaw('DATE(completed_at) as completed_date')
            ->distinct()
            ->orderBy('completed_date')
            ->pluck('completed_date')
            ->map(function ($date) {
                return date('Y-m-d', strtotime($date));
            });

        return response()->json([
            'success' => true,
            'completed_dates' => $completedDates,
        ]);
    }

    public function dayHabits(Request $request)
    {
        $date = $request->query('date');

        if (!$date) {
            return response()->json([
                'success' => false,
                'message' => 'The date parameter is required.',
            ], 422);
        }

        $user = Auth::user();
        $habits = HabitLog::whereHas('habit', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->whereDate('completed_at', $date)
            ->with('habit')
            ->get()
            ->map(function ($log) {
                return [
                    'id' => $log->habit->id,
                    'name' => $log->habit->name,
                    'description' => $log->habit->description,
                    'completed_at' => $log->completed_at->toDateTimeString(),
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $habits,
        ]);
    }

    public function notes(Request $request, $habitId)
    {
        $habit = Habit::where('user_id', Auth::id())->findOrFail($habitId);

        $notes = Note::where('user_id', Auth::id())
            ->where('habit_id', $habit->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $notes,
        ]);
    }

    public function addNote(Request $request, $habitId)
    {
        $habit = Habit::where('user_id', Auth::id())->findOrFail($habitId);

        $validated = $request->validate([
            'message' => 'required|string|max:1000',
        ]);

        $note = Note::create([
            'user_id' => Auth::id(),
            'habit_id' => $habit->id,
            'message' => $validated['message'],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Note added successfully.',
            'data' => $note,
        ], 201);
    }

    public function deleteNote($habitId, $noteId)
    {
        $habit = Habit::where('user_id', Auth::id())->findOrFail($habitId);
        $note = Note::where('user_id', Auth::id())
            ->where('habit_id', $habit->id)
            ->where('id', $noteId)
            ->firstOrFail();

        $note->delete();

        return response()->json([
            'success' => true,
            'message' => 'Note deleted successfully.',
        ]);
    }

    public function getNote($id)
    {
        $note = Note::where('user_id', Auth::id())
            ->with('habit')
            ->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $note,
        ]);
    }

    public function updateNote(Request $request, $id)
    {
        $note = Note::where('user_id', Auth::id())->findOrFail($id);

        $validated = $request->validate([
            'message' => 'required|string|max:1000',
        ]);

        $note->update([
            'message' => $validated['message'],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Note updated successfully.',
            'data' => $note,
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

        // Ensure habit is scheduled for today
        $todayShort = \Carbon\Carbon::now()->format('D');
        $targetDays = $habit->target_days ?? [];
        if (!is_array($targetDays) || !in_array($todayShort, $targetDays)) {
            return response()->json([
                'success' => false,
                'message' => 'Habit is not scheduled for today.'
            ], 400);
        }

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

    private function calculateOverallStreak($user)
    {
        $dates = HabitLog::whereHas('habit', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->selectRaw('DATE(completed_at) as completed_date')
            ->distinct()
            ->orderByDesc('completed_date')
            ->pluck('completed_date')
            ->map(function ($date) {
                return date('Y-m-d', strtotime($date));
            })
            ->toArray();

        if (empty($dates)) {
            return 0;
        }

        $streak = 0;
        $today = \Carbon\Carbon::today();
        $checkDate = $today->copy();

        if (in_array($today->format('Y-m-d'), $dates)) {
            $streak = 1;
            $checkDate->subDay();
        }

        while (in_array($checkDate->format('Y-m-d'), $dates)) {
            $streak++;
            $checkDate->subDay();
        }

        return $streak;
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

