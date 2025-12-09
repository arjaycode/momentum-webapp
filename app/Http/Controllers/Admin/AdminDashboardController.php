<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Habit;
use App\Models\Note;
use App\Models\HabitLog;
use App\Models\HabitsCategory;
use Illuminate\Http\Request;
use Carbon\Carbon;

class AdminDashboardController extends Controller
{
    public function view_dashboard()
    {
        $users = User::where('role', 'user')->get();
        $habits = Habit::all();
        $notes = Note::all();
        $habitLogs = HabitLog::all();
        
        // Popular habits (habits with most users)
        $popularHabits = Habit::selectRaw('habit_name, COUNT(DISTINCT user_id) as user_count, COUNT(*) as total_count')
            ->groupBy('habit_name')
            ->orderBy('user_count', 'desc')
            ->orderBy('total_count', 'desc')
            ->limit(4)
            ->get()
            ->map(function($habit) {
                // Calculate completion rate for this habit
                $habitIds = Habit::where('habit_name', $habit->habit_name)->pluck('id');
                $totalLogs = HabitLog::whereIn('habit_id', $habitIds)->count();
                $totalPossible = $habitIds->count() * 7; // Rough estimate
                $completionRate = $totalPossible > 0 ? round(($totalLogs / $totalPossible) * 100) : 0;
                
                return [
                    'name' => $habit->habit_name,
                    'user_count' => $habit->user_count,
                    'completion_rate' => $completionRate,
                    'icon' => $this->getHabitIcon($habit->habit_name),
                    'color' => $this->getHabitColor($habit->habit_name)
                ];
            });
        
        // Recent users (last 4 registered)
        $recentUsers = User::where('role', 'user')
            ->orderBy('created_at', 'desc')
            ->limit(4)
            ->get()
            ->map(function($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->firstname . ' ' . $user->lastname,
                    'avatar' => $user->avatar ? asset('storage/' . $user->avatar) : 'https://ui-avatars.com/api/?name=' . urlencode($user->firstname . ' ' . $user->lastname) . '&background=random',
                    'joined' => $user->created_at->diffForHumans(),
                    'status' => $user->status ?? 'active'
                ];
            });
        
        // Notes analytics
        $notesWithHabits = Note::whereNotNull('habit_id')->count();
        $notesWithoutHabits = Note::whereNull('habit_id')->count();
        $totalNotes = $notes->count();
        $notesWithHabitsPercent = $totalNotes > 0 ? round(($notesWithHabits / $totalNotes) * 100) : 0;
        
        // Calculate daily notes (notes created today)
        $dailyNotes = Note::whereDate('created_at', today())->count();
        $habitNotes = Note::whereNotNull('habit_id')->count();
        $goalNotes = Note::whereNull('habit_id')->count();
        
        // Chart data - Habit completion rate (last 7 days)
        $completionData = [];
        $labels = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i);
            $dayName = $date->format('D');
            $labels[] = $dayName;
            
            $dayLogs = HabitLog::whereDate('completed_at', $date->toDateString())->count();
            $dayHabits = Habit::whereHas('logs', function($q) use ($date) {
                $q->whereDate('completed_at', $date->toDateString());
            })->count();
            
            // Calculate completion rate
            $totalHabits = Habit::count();
            $completionRate = $totalHabits > 0 ? round(($dayLogs / $totalHabits) * 100) : 0;
            $completionData[] = min(100, $completionRate);
        }
        
        // User activity data (last 6 time periods - last 24 hours)
        $activityData = [];
        $activityLabels = [];
        for ($i = 5; $i >= 0; $i--) {
            $hour = $i * 4;
            $activityLabels[] = str_pad($hour, 2, '0', STR_PAD_LEFT) . ':00';
            
            $startTime = Carbon::now()->subDay()->setTime($hour, 0);
            $endTime = Carbon::now()->subDay()->setTime($hour + 3, 59);
            
            // Count users who had habit activity (completed habits) during this time period
            $activeUsers = User::where('role', 'user')
                ->whereHas('habits.logs', function($q) use ($startTime, $endTime) {
                    $q->whereBetween('completed_at', [$startTime->toDateString(), $endTime->toDateString()]);
                })
                ->distinct()
                ->count();
            
            $activityData[] = $activeUsers;
        }
        
        return view('admin.layouts.dashboard', compact(
            'users',
            'habits',
            'notes',
            'popularHabits',
            'recentUsers',
            'notesWithHabitsPercent',
            'dailyNotes',
            'habitNotes',
            'goalNotes',
            'completionData',
            'labels',
            'activityData',
            'activityLabels'
        ));
    }
    
    private function getHabitIcon($habitName)
    {
        $icons = [
            'exercise' => 'running',
            'reading' => 'book',
            'meditation' => 'spa',
            'water' => 'glass-water',
            'fitness' => 'dumbbell',
        ];
        
        $name = strtolower($habitName);
        foreach ($icons as $key => $icon) {
            if (strpos($name, $key) !== false) {
                return $icon;
            }
        }
        
        return 'heart';
    }
    
    private function getHabitColor($habitName)
    {
        $colors = [
            'exercise' => 'green',
            'reading' => 'blue',
            'meditation' => 'purple',
            'water' => 'yellow',
            'fitness' => 'green',
        ];
        
        $name = strtolower($habitName);
        foreach ($colors as $key => $color) {
            if (strpos($name, $key) !== false) {
                return $color;
            }
        }
        
        return 'blue';
    }
    
    public function getStats()
    {
        try {
            $users = User::where('role', 'user')->get();
            $habits = Habit::all();
            $notes = Note::all();
            
            return response()->json([
                'success' => true,
                'stats' => [
                    'total_users' => $users->count(),
                    'created_habits' => $habits->count(),
                    'notes_created' => $notes->count(),
                    'inactive_users' => $users->where('status', 'inactive')->count(),
                    'banned_users' => $users->where('status', 'blocked')->count(),
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch statistics'
            ], 500);
        }
    }
    
    public function getChartData(Request $request)
    {
        try {
            $period = $request->input('period', '7'); // 7, 30, or 90 days
            $activityType = $request->input('activity_type', 'daily'); // daily, weekly, monthly
            
            // Habit Completion Rate Data
            $completionData = [];
            $labels = [];
            $days = (int)$period;
            
            for ($i = $days - 1; $i >= 0; $i--) {
                $date = Carbon::now()->subDays($i);
                $dayName = $date->format('D');
                $labels[] = $dayName;
                
                $dayLogs = HabitLog::whereDate('completed_at', $date->toDateString())->count();
                $totalHabits = Habit::count();
                $completionRate = $totalHabits > 0 ? round(($dayLogs / $totalHabits) * 100) : 0;
                $completionData[] = min(100, $completionRate);
            }
            
            // User Activity Data
            $activityData = [];
            $activityLabels = [];
            
            if ($activityType === 'daily') {
                // Last 24 hours in 4-hour intervals
                for ($i = 5; $i >= 0; $i--) {
                    $hour = $i * 4;
                    $activityLabels[] = str_pad($hour, 2, '0', STR_PAD_LEFT) . ':00';
                    
                    $startTime = Carbon::now()->subDay()->setTime($hour, 0);
                    $endTime = Carbon::now()->subDay()->setTime($hour + 3, 59);
                    
                    // Get users who have habits with logs in this time period
                    $habitIds = HabitLog::whereBetween('completed_at', [$startTime->toDateString(), $endTime->toDateString()])
                        ->pluck('habit_id')
                        ->unique();
                    
                    $activeUsers = User::where('role', 'user')
                        ->whereHas('habits', function($q) use ($habitIds) {
                            $q->whereIn('id', $habitIds);
                        })
                        ->distinct()
                        ->count();
                    
                    $activityData[] = $activeUsers;
                }
            } elseif ($activityType === 'weekly') {
                // Last 7 days
                for ($i = 6; $i >= 0; $i--) {
                    $date = Carbon::now()->subDays($i);
                    $activityLabels[] = $date->format('D');
                    
                    // Get users who have habits with logs on this date
                    $habitIds = HabitLog::whereDate('completed_at', $date->toDateString())
                        ->pluck('habit_id')
                        ->unique();
                    
                    $activeUsers = User::where('role', 'user')
                        ->whereHas('habits', function($q) use ($habitIds) {
                            $q->whereIn('id', $habitIds);
                        })
                        ->distinct()
                        ->count();
                    
                    $activityData[] = $activeUsers;
                }
            } else { // monthly
                // Last 4 weeks
                for ($i = 3; $i >= 0; $i--) {
                    $weekStart = Carbon::now()->subWeeks($i)->startOfWeek();
                    $weekEnd = Carbon::now()->subWeeks($i)->endOfWeek();
                    $activityLabels[] = 'Week ' . (4 - $i);
                    
                    // Get users who have habits with logs in this week
                    $habitIds = HabitLog::whereBetween('completed_at', [$weekStart->toDateString(), $weekEnd->toDateString()])
                        ->pluck('habit_id')
                        ->unique();
                    
                    $activeUsers = User::where('role', 'user')
                        ->whereHas('habits', function($q) use ($habitIds) {
                            $q->whereIn('id', $habitIds);
                        })
                        ->distinct()
                        ->count();
                    
                    $activityData[] = $activeUsers;
                }
            }
            
            return response()->json([
                'success' => true,
                'completion' => [
                    'labels' => $labels,
                    'data' => $completionData
                ],
                'activity' => [
                    'labels' => $activityLabels,
                    'data' => $activityData
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch chart data: ' . $e->getMessage()
            ], 500);
        }
    }
}
