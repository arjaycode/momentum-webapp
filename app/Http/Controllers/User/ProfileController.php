<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Habit;
use App\Models\HabitLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;

class ProfileController extends Controller
{
    public function show()
    {
        $user = Auth::user();
        return view('user.layouts.settings', compact('user'));
    }

    public function update(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'firstname' => 'required|string|max:50',
            'lastname' => 'required|string|max:50',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('avatar')) {
            // Delete old avatar if exists
            if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
                Storage::disk('public')->delete($user->avatar);
            }
            
            // Store new avatar
            $path = $request->file('avatar')->store('avatars', 'public');
            $validated['avatar'] = $path;
        }

        $user->update($validated);

        return redirect()->route('user.settings')->with('success', 'Profile updated successfully!');
    }

    public function updateAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $user = Auth::user();

        // Delete old avatar if exists
        if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
            Storage::disk('public')->delete($user->avatar);
        }

        // Store new avatar
        $path = $request->file('avatar')->store('avatars', 'public');
        $user->update(['avatar' => $path]);

        return response()->json([
            'success' => true,
            'avatar_url' => asset('storage/' . $path),
            'message' => 'Avatar updated successfully!'
        ]);
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        $user = Auth::user();

        if (!Hash::check($request->current_password, $user->password)) {
            return back()->withErrors(['current_password' => 'The current password is incorrect.']);
        }

        $user->update([
            'password' => Hash::make($request->password),
        ]);

        return redirect()->route('user.settings')->with('success', 'Password changed successfully!');
    }

    public function destroy(Request $request)
    {
        $request->validate([
            'password' => 'required',
        ]);

        $user = Auth::user();

        if (!Hash::check($request->password, $user->password)) {
            return back()->withErrors(['password' => 'The password is incorrect.']);
        }

        // Delete all user data
        HabitLog::whereHas('habit', function($query) use ($user) {
            $query->where('user_id', $user->id);
        })->delete();
        
        Habit::where('user_id', $user->id)->delete();
        
        $user->delete();

        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('user.signin')->with('success', 'Your account has been deleted.');
    }

    public function exportData()
    {
        $user = Auth::user();
        $habits = Habit::where('user_id', $user->id)
            ->with('category')
            ->with('logs')
            ->get();

        $data = [
            'user' => [
                'name' => $user->firstname . ' ' . $user->lastname,
                'email' => $user->email,
                'member_since' => $user->created_at->format('Y-m-d'),
            ],
            'habits' => $habits->map(function($habit) {
                return [
                    'name' => $habit->name,
                    'description' => $habit->description,
                    'category' => $habit->category ? $habit->category->title : null,
                    'target_days' => $habit->target_days,
                    'created_at' => $habit->created_at->format('Y-m-d'),
                    'total_completions' => $habit->logs->count(),
                    'completions' => $habit->logs->map(function($log) {
                        return $log->completed_at->format('Y-m-d');
                    })->toArray(),
                ];
            }),
            'exported_at' => now()->format('Y-m-d H:i:s'),
        ];

        $filename = 'momentum-export-' . now()->format('Y-m-d') . '.json';

        return response()->json($data, 200, [
            'Content-Type' => 'application/json',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ]);
    }
}

