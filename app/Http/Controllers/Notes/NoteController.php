<?php

namespace App\Http\Controllers\Notes;

use App\Http\Controllers\Controller;
use App\Models\Note;
use App\Models\User;
use App\Models\Habit;
use Illuminate\Http\Request;
use Exception;

class NoteController extends Controller
{
    public function index()
    {
        $notes = Note::with(['user', 'habit.category'])
            ->orderBy('created_at', 'desc')
            ->get();
        
        return view('admin.layouts.note_management', compact('notes'));
    }

    public function create()
    {
        $users = User::where('role', 'user')->get();
        $habits = Habit::with('category')->get();
        
        return view('admin.layouts.note_add', compact('users', 'habits'));
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'user_id' => 'required|exists:users,id',
                'habit_id' => 'nullable|exists:habits,id',
                'message' => 'required|string|max:1000',
            ]);

            // Convert empty string to null for habit_id
            if (isset($validated['habit_id']) && $validated['habit_id'] === '') {
                $validated['habit_id'] = null;
            }

            Note::create($validated);

            return redirect()->route('admin.note-management')->with('success', 'Note created successfully.');
        } catch (Exception $e) {
            return redirect()->back()
                ->withInput()
                ->withErrors(['error' => 'Failed to create note: ' . $e->getMessage()]);
        }
    }

    public function edit($id)
    {
        $note = Note::with(['user', 'habit'])->findOrFail($id);
        $users = User::where('role', 'user')->get();
        $habits = Habit::with('category')->get();
        
        return view('admin.layouts.note_edit', compact('note', 'users', 'habits'));
    }

    public function update(Request $request, $id)
    {
        try {
            $note = Note::findOrFail($id);

            $validated = $request->validate([
                'user_id' => 'required|exists:users,id',
                'habit_id' => 'nullable|exists:habits,id',
                'message' => 'required|string|max:1000',
            ]);

            // Convert empty string to null for habit_id
            if (isset($validated['habit_id']) && $validated['habit_id'] === '') {
                $validated['habit_id'] = null;
            }

            $note->update($validated);

            return redirect()->route('admin.note-management')->with('success', 'Note updated successfully.');
        } catch (Exception $e) {
            return redirect()->back()
                ->withInput()
                ->withErrors(['error' => 'Failed to update note: ' . $e->getMessage()]);
        }
    }

    public function destroy($id)
    {
        try {
            $note = Note::findOrFail($id);
            $note->delete();

            return redirect()->route('admin.note-management')->with('success', 'Note deleted successfully.');
        } catch (Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Failed to delete note: ' . $e->getMessage()]);
        }
    }
}
