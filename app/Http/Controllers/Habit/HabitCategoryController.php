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
        $categories = HabitsCategory::all();

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

            return redirect(route('admin.habit-management.create'), 201)->with('success', 'Category Created.');
        } catch (Exception $e) {
            dd($e->getMessage());
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

            $category = HabitsCategory::find($id);

            $newData = $request->all();
            $category->update($newData);

            return redirect(route('admin.habit-management.edit', $category->id), 201)->with('success', 'Category Updated.');
        } catch (Exception $e) {
            dd($e->getMessage());
        }
    }

    public function delete($id)
    {
        $category = HabitsCategory::find($id);
        $category->delete();
    }
}
