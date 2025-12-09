<?php

namespace App\Http\Controllers\Habit;

use App\Http\Controllers\Controller;
use App\Models\HabitsCategory;
use Illuminate\Http\Request;
use Exception;

class HabitCategoryController extends Controller
{
    //
    public function index()
    {
        $categories = HabitsCategory::withCount('habits')->get();

        return view('admin.layouts.habit_management', compact('categories'));
    }

    public function store(Request $request)
    {
        try {

            $data = $request->validate([
                'title' => 'required|string|max:50',
                'description' => 'string|nullable',
                'status' => 'required|string|in:active,inactive',
                'color' => 'required|string',
                'icon' => 'required|string|nullable'
            ]);

            HabitsCategory::create($data);

            return redirect()->route('admin.habit-management.create')->with('success', 'Category Created.');
        } catch (Exception $e) {
            return redirect()->back()
                ->withInput()
                ->withErrors(['error' => 'Failed to create category: ' . $e->getMessage()]);
        }
    }

    public function edit($id)
    {
        $category = HabitsCategory::find($id);
        return view('admin.layouts.habit_edit', compact('category'));
    }

    public function update(Request $request, $id)
    {
        try {
            $category = HabitsCategory::findOrFail($id);

            $validated = $request->validate([
                'title' => 'required|string|max:50',
                'description' => 'string|nullable',
                'status' => 'required|string|in:active,inactive',
                'color' => 'required|string',
                'icon' => 'required|string|nullable'
            ]);

            $category->update($validated);

            return redirect()->route('admin.habit-management.edit', $category->id)->with('success', 'Category Updated.');
        } catch (Exception $e) {
            return redirect()->back()
                ->withInput()
                ->withErrors(['error' => 'Failed to update category: ' . $e->getMessage()]);
        }
    }

    public function delete($id)
    {
        try {
            $category = HabitsCategory::findOrFail($id);
            $categoryName = $category->title;
            $category->delete();

            return redirect()->route('admin.habit-management')->with('success', 'Category "' . $categoryName . '" deleted successfully.');
        } catch (Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Failed to delete category: ' . $e->getMessage()]);
        }
    }
}
