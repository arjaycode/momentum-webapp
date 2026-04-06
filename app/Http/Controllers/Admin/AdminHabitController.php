<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Habit;
use App\Models\HabitsCategory;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminHabitController extends Controller
{
    public function index()
    {
        $habits = Habit::with(['user', 'category'])
            ->orderBy('created_at', 'desc')
            ->get();

        $categories = HabitsCategory::all();
        $users = User::where('role', 'user')->get();

        return Inertia::render('Admin/HabitsIndex', [
            'habits' => $habits,
            'categories' => $categories,
            'users' => $users,
        ]);
    }

    public function create()
    {
        $categories = HabitsCategory::where('status', 'active')->get();
        $users = User::where('role', 'user')->get();

        return Inertia::render('Admin/HabitsCreate', [
            'categories' => $categories,
            'users' => $users,
        ]);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'user_id' => 'required|exists:users,id',
                'category_id' => 'nullable|exists:habits_categories,id',
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'enable_push_notifications' => 'nullable|boolean',
                'target_days' => 'required|array|min:1',
                'target_days.*' => 'in:Mon,Tue,Wed,Thu,Fri,Sat,Sun',
            ]);

            $validated['enable_push_notifications'] = $request->has('enable_push_notifications') ? true : false;

            $validated['habit_name'] = $validated['name'];
            unset($validated['name']);

            Habit::create($validated);

            return redirect()->route('admin.habits.index')->with('success', 'Habit created successfully.');
        } catch (Exception $e) {
            return redirect()->back()
                ->withInput()
                ->withErrors(['error' => 'Failed to create habit: ' . $e->getMessage()]);
        }
    }

    public function edit($id)
    {
        $habit = Habit::with(['user', 'category'])->findOrFail($id);
        $categories = HabitsCategory::where('status', 'active')->get();
        $users = User::where('role', 'user')->get();
        $targetDays = $habit->target_days ?? [];

        return Inertia::render('Admin/HabitsEdit', [
            'habit' => $habit,
            'categories' => $categories,
            'users' => $users,
            'targetDays' => $targetDays,
        ]);
    }

    public function update(Request $request, $id)
    {
        try {
            $habit = Habit::findOrFail($id);

            $validated = $request->validate([
                'user_id' => 'required|exists:users,id',
                'category_id' => 'nullable|exists:habits_categories,id',
                'name' => 'required|string|max:255',
                'description' => 'nullable|string',
                'enable_push_notifications' => 'nullable|boolean',
                'target_days' => 'required|array|min:1',
                'target_days.*' => 'in:Mon,Tue,Wed,Thu,Fri,Sat,Sun',
            ]);

            $validated['enable_push_notifications'] = $request->has('enable_push_notifications') ? true : false;

            $validated['habit_name'] = $validated['name'];
            unset($validated['name']);

            $habit->update($validated);

            return redirect()->route('admin.habits.index')->with('success', 'Habit updated successfully.');
        } catch (Exception $e) {
            return redirect()->back()
                ->withInput()
                ->withErrors(['error' => 'Failed to update habit: ' . $e->getMessage()]);
        }
    }

    public function destroy($id)
    {
        try {
            $habit = Habit::findOrFail($id);
            $habitName = $habit->name ?? 'Unknown';
            $habit->delete();

            return redirect()->route('admin.habits.index')->with('success', 'Habit "' . $habitName . '" deleted successfully.');
        } catch (Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Failed to delete habit: ' . $e->getMessage()]);
        }
    }
}
