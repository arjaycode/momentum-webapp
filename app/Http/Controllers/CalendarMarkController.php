<?php

namespace App\Http\Controllers;

use App\Models\HabitLog;
use Illuminate\Http\Request;

class CalendarMarkController extends Controller
{
    //
    public function markAsDone(Request $request, $habitId)
    {
        // Check if it's already done today to prevent duplicates
        $exists = HabitLog::where('habit_id', $habitId)
            ->where('completed_at', now()->toDateString())
            ->exists();

        if (!$exists) {
            HabitLog::create([
                'habit_id' => $habitId,
                'completed_at' => now()->toDateString(), // Insert 2025-12-03
            ]);
        }

        return response()->json(['message' => 'Habit marked as done!']);
    }
}
