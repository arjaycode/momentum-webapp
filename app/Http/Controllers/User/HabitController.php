<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Habit;
use App\Models\HabitLog;
use App\Models\HabitsCategory;
use App\Models\Notification;
use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HabitController extends Controller
{

    public function index()
    {
        $user = Auth::user();
        $habits = Habit::where('user_id', $user->id)
            ->with('category')
            ->orderBy('created_at', 'desc')
            ->get();

        // Calculate streak and check completion status for each habit
        $today = now()->toDateString();
        $habits = $habits->map(function($habit) use ($today) {
            $habit->streak = $this->calculateHabitStreak($habit);
            // Check if habit is completed today
            $habit->isCompletedToday = \App\Models\HabitLog::where('habit_id', $habit->id)
                ->whereDate('completed_at', $today)
                ->exists();
            return $habit;
        });

        // Calculate stats
        $activeHabits = $habits->count();
        $currentStreak = $this->calculateCurrentStreak($habits);

        return view('user.layouts.habits', compact('habits', 'activeHabits', 'currentStreak'));
    }

    public function create()
    {
        $categories = HabitsCategory::where('status', 'active')->get();
        $user_id = Auth::id();
        return view('user.layouts.habits_add', compact('categories', 'user_id'));
    }

    public function store(Request $request)
    {
        // Convert empty category_id to null
        $request->merge([
            'category_id' => $request->input('category_id') ?: null
        ]);

        // Check if habit name already exists for this user
        $existingHabit = Habit::where('user_id', Auth::id())
            ->where('habit_name', $request->input('name'))
            ->first();

        if ($existingHabit) {
            return redirect()->back()
                ->withInput()
                ->withErrors(['name' => 'A habit with this title already exists. Please choose a different name.']);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'nullable|exists:habits_categories,id',
            'description' => 'nullable|string',
            'enable_push_notifications' => 'nullable|boolean',
            'target_days' => 'required|array|min:1',
            'target_days.*' => 'in:Mon,Tue,Wed,Thu,Fri,Sat,Sun',
        ]);

        $validated['user_id'] = Auth::id();
        // Handle checkbox: if not present in request, set to false
        $validated['enable_push_notifications'] = $request->has('enable_push_notifications') ? true : false;
        // Map 'name' to 'habit_name' for database column
        $validated['habit_name'] = $validated['name'];
        unset($validated['name']);
        // target_days is already an array from validation, model will handle JSON encoding via cast

        $habit = Habit::create($validated);

        // Create notification for habit added
        Notification::create([
            'user_id' => Auth::id(),
            'type' => 'habit_added',
            'title' => 'Habit Added',
            'message' => "You've successfully added a new habit: {$habit->name}",
            'icon' => 'fas fa-plus-circle',
            'color' => '#10b981',
            'link' => route('user.habits.view', $habit->id),
            'read' => false,
        ]);

        // Save temporary notes if any
        $tempNotes = $request->input('temp_notes', []);
        if (is_array($tempNotes) && count($tempNotes) > 0) {
            foreach ($tempNotes as $noteMessage) {
                if (!empty(trim($noteMessage))) {
                    Note::create([
                        'user_id' => Auth::id(),
                        'habit_id' => $habit->id,
                        'message' => trim($noteMessage),
                    ]);
                }
            }
        }

        // Redirect based on where user came from or default to habits list
        $redirectTo = $request->input('redirect_to', 'habits');
        
        if ($redirectTo === 'calendar') {
            return redirect()->route('user.calendar')->with('success', 'Habit "' . $habit->name . '" created successfully! It will appear on your selected days in the calendar.');
        } elseif ($redirectTo === 'dashboard') {
            return redirect()->route('user.dashboard', ['habit_added' => '1'])->with('success', 'Habit "' . $habit->name . '" created successfully! Check your dashboard to see it in today\'s habits.');
        } else {
            return redirect()->route('user.habits')->with('success', 'Habit "' . $habit->name . '" created successfully!');
        }
    }

    public function show($id)
    {
        $habit = Habit::where('user_id', Auth::id())->findOrFail($id);
        $logs = HabitLog::where('habit_id', $habit->id)
            ->orderBy('completed_at', 'desc')
            ->get();

        $streak = $this->calculateHabitStreak($habit);
        $totalDays = $logs->count();

        // Load notes for this habit
        $notes = Note::where('habit_id', $habit->id)
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();

        return view('user.layouts.habits_view', compact('habit', 'logs', 'streak', 'totalDays', 'notes'));
    }

    public function edit($id)
    {
        $habit = Habit::where('user_id', Auth::id())->findOrFail($id);
        $categories = HabitsCategory::where('status', 'active')->get();
        // target_days is already an array due to model cast
        $targetDays = $habit->target_days ?? [];
        
        // Load notes for this habit
        $notes = Note::where('habit_id', $habit->id)
            ->where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();

        return view('user.layouts.habits_edit', compact('habit', 'categories', 'targetDays', 'notes'));
    }

    public function update(Request $request, $id)
    {
        $habit = Habit::where('user_id', Auth::id())->findOrFail($id);

        // Convert empty category_id to null
        $request->merge([
            'category_id' => $request->input('category_id') ?: null
        ]);

        // Check if habit name already exists for this user (excluding current habit)
        $existingHabit = Habit::where('user_id', Auth::id())
            ->where('habit_name', $request->input('name'))
            ->where('id', '!=', $habit->id)
            ->first();

        if ($existingHabit) {
            return redirect()->back()
                ->withInput()
                ->withErrors(['name' => 'A habit with this title already exists. Please choose a different name.']);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'nullable|exists:habits_categories,id',
            'description' => 'nullable|string',
            'enable_push_notifications' => 'nullable|boolean',
            'target_days' => 'required|array|min:1',
            'target_days.*' => 'in:Mon,Tue,Wed,Thu,Fri,Sat,Sun',
        ]);

        // Handle checkbox: if not present in request, set to false
        $validated['enable_push_notifications'] = $request->has('enable_push_notifications') ? true : false;
        // Map 'name' to 'habit_name' for database column
        $validated['habit_name'] = $validated['name'];
        unset($validated['name']);
        // target_days is already an array from validation, model will handle JSON encoding via cast

        $habit->update($validated);

        // Create notification for habit updated
        Notification::create([
            'user_id' => Auth::id(),
            'type' => 'habit_updated',
            'title' => 'Habit Updated',
            'message' => "You've successfully updated your habit: {$habit->name}",
            'icon' => 'fas fa-edit',
            'color' => '#007bff',
            'link' => route('user.habits.view', $habit->id),
            'read' => false,
        ]);

        return redirect()->route('user.habits')->with('success', 'Habit updated successfully!');
    }

    public function destroy($id)
    {
        $habit = Habit::where('user_id', Auth::id())->findOrFail($id);
        
        // Delete all related habit logs first (cascade should handle this, but being explicit)
        HabitLog::where('habit_id', $habit->id)->delete();
        
        // Store habit name for response
        $habitName = $habit->name;
        
        // Create notification for habit deleted
        Notification::create([
            'user_id' => Auth::id(),
            'type' => 'habit_deleted',
            'title' => 'Habit Deleted',
            'message' => "You've deleted the habit: {$habitName}",
            'icon' => 'fas fa-trash',
            'color' => '#ef4444',
            'link' => route('user.habits'),
            'read' => false,
        ]);
        
        // Delete the habit
        $habit->delete();

        // Return JSON response for AJAX requests
        if (request()->wantsJson() || request()->ajax()) {
            return response()->json([
                'success' => true,
                'message' => 'Habit "' . $habitName . '" deleted successfully! It has been removed from your habits, calendar, and dashboard.'
            ]);
        }

        // Fallback to redirect for non-AJAX requests
        return redirect()->route('user.habits')->with('success', 'Habit deleted successfully! It has been removed from your habits, calendar, and dashboard.');
    }

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
            ]);
        }

        // Create habit log entry
        HabitLog::create([
            'habit_id' => $habit->id,
            'completed_at' => now(),
        ]);

        // Calculate new streak
        $newStreak = $this->calculateHabitStreak($habit);

        // Create notification for habit completed
        Notification::create([
            'user_id' => Auth::id(),
            'type' => 'habit_completed',
            'title' => 'Habit Completed!',
            'message' => "Great job! You completed: {$habit->name}. Current streak: {$newStreak} days!",
            'icon' => 'fas fa-check-circle',
            'color' => '#10b981',
            'link' => route('user.habits.view', $habit->id),
            'read' => false,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Habit marked as done! Streak: ' . $newStreak . ' days',
            'streak' => $newStreak
        ]);
    }

    public function search(Request $request)
    {
        $user = Auth::user();
        $query = $request->input('q', '');

        if (strlen($query) < 2) {
            return response()->json([
                'success' => false,
                'message' => 'Search query must be at least 2 characters'
            ]);
        }

        $habits = Habit::where('user_id', $user->id)
            ->where(function($q) use ($query) {
                $q->where('habit_name', 'like', "%{$query}%")
                  ->orWhere('description', 'like', "%{$query}%");
            })
            ->with('category')
            ->limit(10)
            ->get()
            ->map(function($habit) {
                return [
                    'id' => $habit->id,
                    'name' => $habit->name,
                    'description' => $habit->description,
                    'category' => $habit->category ? $habit->category->title : null
                ];
            });

        return response()->json([
            'success' => true,
            'habits' => $habits
        ]);
    }

    public function getCalendarData(Request $request)
    {
        $user = Auth::user();
        $year = (int) $request->input('year', now()->year);
        $month = (int) $request->input('month', now()->month);

        $habits = Habit::where('user_id', $user->id)->get();
        $logs = HabitLog::whereHas('habit', function($query) use ($user) {
            $query->where('user_id', $user->id);
        })
        ->whereYear('completed_at', $year)
        ->whereMonth('completed_at', $month)
        ->get()
        ->groupBy(function($log) {
            return (int) date('j', strtotime($log->completed_at));
        });

        $calendarData = [];
        foreach ($habits as $habit) {
            // target_days is already an array due to model cast
            $targetDays = $habit->target_days ?? [];
            $daysInMonth = cal_days_in_month(CAL_GREGORIAN, $month, $year);
            
            for ($day = 1; $day <= $daysInMonth; $day++) {
                $date = \Carbon\Carbon::create($year, $month, $day);
                $dayName = $date->format('D');
                $dayShort = substr($dayName, 0, 3);
                
                if (in_array($dayShort, $targetDays)) {
                    if (!isset($calendarData[$day])) {
                        $calendarData[$day] = [];
                    }
                    
                    $isCompleted = $logs->has($day) && $logs[$day]->contains(function($log) use ($habit) {
                        return $log->habit_id === $habit->id;
                    });
                    
                    $calendarData[$day][] = [
                        'id' => $habit->id,
                        'name' => $habit->name,
                        'category' => $habit->category ? $habit->category->title : 'Uncategorized',
                        'color' => $habit->category ? $habit->category->color : 'blue',
                        'completed' => $isCompleted
                    ];
                }
            }
        }

        return response()->json($calendarData);
    }

    private function calculateCurrentStreak($habits)
    {
        // Calculate the longest current streak across all habits
        $maxStreak = 0;
        foreach ($habits as $habit) {
            $streak = $this->calculateHabitStreak($habit);
            if ($streak > $maxStreak) {
                $maxStreak = $streak;
            }
        }
        return $maxStreak;
    }

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

    /**
     * Store a note for a habit
     */
    public function storeNote(Request $request, $id)
    {
        $habit = Habit::where('user_id', Auth::id())->findOrFail($id);

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
            'note' => [
                'id' => $note->id,
                'message' => $note->message,
                'created_at' => $note->created_at->format('M j, Y \a\t g:i A'),
                'created_at_iso' => $note->created_at->toISOString(),
            ]
        ]);
    }

    /**
     * Delete a note
     */
    public function deleteNote($habitId, $noteId)
    {
        $habit = Habit::where('user_id', Auth::id())->findOrFail($habitId);
        
        $note = Note::where('id', $noteId)
            ->where('habit_id', $habit->id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $note->delete();

        return response()->json([
            'success' => true,
            'message' => 'Note deleted successfully'
        ]);
    }
}