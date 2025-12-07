<?php

namespace App\Http\Controllers\User;

use App\Models\Note;
use App\Models\Habit;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $habits = Habit::all();
        $withHighest = Habit::where('user_id', Auth::id())->orderBy('streak_days', 'desc')->first();
        $notes = Note::all();
        return view('user.layouts.dashboard', compact('habits', 'notes', 'withHighest'));
    }
}
