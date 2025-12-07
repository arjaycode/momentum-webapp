<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Habit;
use App\Models\HabitsCategory;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HabitController extends Controller
{
    //
    public function index()
    {
        $habits = Habit::all();
        $withHighest = Habit::where('user_id', Auth::id())->orderBy('streak_days', 'desc')->first();
        return view('user.layouts.habits', compact('habits', 'withHighest'));
    }
    public function create()
    {
        try {
            $user_id = Auth::user()->id;
            $habits_category = HabitsCategory::all();
            return view('user.layouts.habits_add', compact('habits_category', 'user_id'));
        } catch (Exception $e) {
            $e->getMessage();
        }
    }



    public function edit()
    {
        return view('user.layouts.habits_edit');
    }
    public function view()
    {
        return view('user.layouts.habits_view');
    }

    public function store(Request $request)
    {
        $incoming_data = $request->validate([
            'habit_name' => 'required|string|max:50',
            'description' => 'string|nullable',
            'enable_push_notifications' => 'boolean|required',
            'target_days' => 'json'
        ]);

        Habit::create($incoming_data);
        return redirect(route('user.habits'), 201)->with('success', 'Habit Added');
    }
}
