<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Habit;
use App\Models\HabitLog;
use App\Models\Note; // <--- ADD THIS LINE (or correct it if it's there)
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class DashboardController extends Controller
{
    // app/Http/Controllers/User/DashboardController.php (index method only)

    public function index()
    {
        $user = Auth::user();

        $habits = Habit::where('user_id', $user->id)
            ->with('category')
            ->withCount('logs')
            ->get();


        $notes = Note::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();


        // Calculate stats
        $activeHabits = $habits->count();
        $currentStreak = $this->calculateCurrentStreak($habits);
        $totalPossible = 0;
        $totalCompleted = 0;
        $today = now()->toDateString();
        $currentDayShort = now()->format('D');

        foreach ($habits as $habit) {
            $targetDays = $habit->target_days ?? [];

            if (in_array($currentDayShort, $targetDays)) {
                $totalPossible++;
                $isCompleted = HabitLog::where('habit_id', $habit->id)
                    ->whereDate('completed_at', $today)
                    ->exists();
                if ($isCompleted) {
                    $totalCompleted++;
                }
            }
        }

        $completionRate = $totalPossible > 0
            ? round(($totalCompleted / $totalPossible) * 100)
            : 0;

        // Get today's habits
        $todayHabits = $habits->filter(function ($habit) {
            $targetDays = $habit->target_days ?? [];
            $currentDayShort = now()->format('D');
            return in_array($currentDayShort, $targetDays);
        })->map(function ($habit) use ($today) {
            $isCompleted = HabitLog::where('habit_id', $habit->id)
                ->whereDate('completed_at', $today)
                ->exists();
            return [
                'habit' => $habit,
                'completed' => $isCompleted
            ];
        });

        // Get calendar data for current month
        $year = now()->year;
        $month = now()->month;
        $calendarData = $this->getCalendarData($habits, $year, $month);

        return view('user.layouts.dashboard', compact(
            'habits',            // Required for line 29 fix
            'notes',             // Required for line 67 fix
            'activeHabits',
            'currentStreak',
            'completionRate',
            'todayHabits',
            'calendarData'
        ));
    }
    // ... rest of the controller methods

    private function calculateCurrentStreak($habits)
    {
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
            ->map(function ($date) {
                return \Carbon\Carbon::parse($date)->format('Y-m-d');
            })
            ->toArray();

        if (empty($logs)) {
            return 0;
        }

        $streak = 0;
        $today = \Carbon\Carbon::today();
        $checkDate = $today->copy();

        if (in_array($today->format('Y-m-d'), $logs)) {
            $streak = 1;
            $checkDate->subDay();
        }

        while (in_array($checkDate->format('Y-m-d'), $logs)) {
            $streak++;
            $checkDate->subDay();
        }

        return $streak;
    }

    private function getCalendarData($habits, $year, $month)
    {
        $daysInMonth = cal_days_in_month(CAL_GREGORIAN, $month, $year);
        $calendarData = [];

        $logs = HabitLog::whereHas('habit', function ($query) use ($habits) {
            $query->whereIn('id', $habits->pluck('id'));
        })
            ->whereYear('completed_at', $year)
            ->whereMonth('completed_at', $month)
            ->get()
            ->groupBy(function ($log) {
                return date('j', strtotime($log->completed_at));
            });

        foreach ($habits as $habit) {
            // target_days is already an array due to model cast
            $targetDays = $habit->target_days ?? [];

            for ($day = 1; $day <= $daysInMonth; $day++) {
                $date = \Carbon\Carbon::create($year, $month, $day);
                $dayName = $date->format('D');
                $dayShort = substr($dayName, 0, 3);

                if (in_array($dayShort, $targetDays)) {
                    if (!isset($calendarData[$day])) {
                        $calendarData[$day] = [];
                    }

                    $isCompleted = $logs->has($day) && $logs[$day]->contains(function ($log) use ($habit) {
                        return $log->habit_id === $habit->id;
                    });

                    $calendarData[$day][] = [
                        'id' => $habit->id,
                        'name' => $habit->name,
                        'completed' => $isCompleted
                    ];
                }
            }
        }

        return $calendarData;
    }

    /**
     * Get today's habits for live updates
     */
    public function getTodayHabits()
    {
        $user = Auth::user();
        $today = now()->toDateString();

        $habits = Habit::where('user_id', $user->id)
            ->with('category')
            ->get();

        $todayHabits = $habits->filter(function ($habit) {
            $targetDays = $habit->target_days ?? [];
            $dayName = now()->format('D');
            $dayShort = substr($dayName, 0, 3);
            return in_array($dayShort, $targetDays);
        })->map(function ($habit) use ($today) {
            $isCompleted = HabitLog::where('habit_id', $habit->id)
                ->where('completed_at', $today)
                ->exists();
            return [
                'id' => $habit->id,
                'name' => $habit->name,
                'description' => $habit->description ?: 'No description',
                'category' => $habit->category ? $habit->category->title : 'Uncategorized',
                'completed' => $isCompleted
            ];
        })->values();

        // Calculate stats
        $activeHabits = $habits->count();
        $currentStreak = $this->calculateCurrentStreak($habits);

        $totalPossible = 0;
        $totalCompleted = 0;

        foreach ($habits as $habit) {
            $targetDays = $habit->target_days ?? [];
            $dayName = now()->format('D');
            $dayShort = substr($dayName, 0, 3);

            if (in_array($dayShort, $targetDays)) {
                $totalPossible++;
                $isCompleted = HabitLog::where('habit_id', $habit->id)
                    ->where('completed_at', $today)
                    ->exists();
                if ($isCompleted) {
                    $totalCompleted++;
                }
            }
        }

        $completionRate = $totalPossible > 0
            ? round(($totalCompleted / $totalPossible) * 100)
            : 0;

        return response()->json([
            'success' => true,
            'habits' => $todayHabits,
            'stats' => [
                'activeHabits' => $activeHabits,
                'currentStreak' => $currentStreak,
                'completionRate' => $completionRate,
                'todayProgress' => $totalCompleted . '/' . $totalPossible
            ]
        ]);
    }
}
