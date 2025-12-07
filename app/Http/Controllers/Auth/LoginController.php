<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function index()
    {
        return view('user.auth.signin');
    }

    public function signin(Request $request)
    {
        // 1. Validate Input
        $credentials = $request->validate([
            'email' => 'required|email|exists:users,email',
            'password' => 'required',
        ], [
            'email.required' => 'Please enter your email address.',
            'email.email' => 'Please enter a valid email address.',
            'email.exists' => 'We could not find a user with that email address.',
            'password.required' => 'Please enter your password.',
        ]);

        // 2. Attempt Login
        if (Auth::attempt($credentials, $request->filled('remember'))) {
            $request->session()->regenerate();
            // 3. Role-Based Redirect
            $role = Auth::user()->role;
            if ($role === 'admin') {
                return redirect()->route('admin.dashboard')->with('success', 'Welcome back!');
            }
            return redirect()->route('user.dashboard')->with('success', 'Welcome back!');
        }

        // 4. Login Failed
        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('user.signin');
    }
}
