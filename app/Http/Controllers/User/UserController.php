<?php

namespace App\Http\Controllers\User;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

use function Laravel\Prompts\error;

class UserController extends Controller
{
    //
    public function index()
    {
        $users = User::all();
        $totalUsers = $users->count();
        $totalActiveUsers = $users->where('status', 'active')->count();
        $totalBlockedUsers = $users->where('status', 'blocked')->count();
        $totalInactiveUsers = $users->where('status', 'inactive')->count();

        return view('admin.layouts.user_management', compact('totalActiveUsers', 'totalInactiveUsers', 'totalUsers', 'totalBlockedUsers', 'users'));
    }

    public function store(Request $request)
    {
        $user = $request->validate([
            'firstname' => 'required|string|max:50',
            'lastname' => 'required|string|max:50',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'role' => 'required|string',
            'status' => 'required|string'
        ]);

        $createdUser = User::create($user);

        return redirect(route('admin.user-management.create'), 201)->with('success', 'Account Succesfully Created. Account can now be used for logging in');
    }

    public function edit($id)
    {
        $user = User::findOrFail($id);
        return view('admin.layouts.user_edit', compact('user'));
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $newCredentials = $request->validate([
            'firstname' => 'required|string|max:50',
            'lastname' => 'required|string|max:50',
            'email' => 'required|email|unique:users,email,' . $user->id, //ignores the email check current user
            'role' => 'required|string',
            'status' => 'required|string',
            'password' => 'nullable|min:8'
        ]);

        if (!$request->filled('password')) {
            unset($newCredentials['password']);
        }

        $user->update($newCredentials);
        return redirect(route('admin.user-management.edit', $user->id), 201)->with('success', 'Account Succesfully Updated.');
    }

    public function delete($id)
    {
        $user = User::findOrFail($id);
        
        // Prevent admin from deleting themselves
        if (Auth::id() == $user->id) {
            return redirect()->route('admin.user-management')
                ->with('error', 'You cannot delete your own account.');
        }
        
        $user->delete();
        
        return redirect()->route('admin.user-management')
            ->with('success', 'User deleted successfully.');
    }

    public function update_status(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $update = $request->validate([
            'status' => 'required|in:active,inactive,blocked'
        ]);

        $user->status = $update['status'];
        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'User status updated.'
        ]);
    }
}
