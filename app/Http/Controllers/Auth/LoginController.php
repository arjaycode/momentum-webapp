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
            $user = Auth::user();
            
            // Check user status - prevent blocked/inactive users from logging in
            if ($user->status === 'blocked') {
                Auth::logout();
                return back()->withErrors([
                    'email' => 'Your account has been blocked. Please contact support.',
                ])->onlyInput('email');
            }
            
            if ($user->status === 'inactive') {
                Auth::logout();
                return back()->withErrors([
                    'email' => 'Your account is inactive. Please contact support.',
                ])->onlyInput('email');
            }
            
            $request->session()->regenerate();
            // 3. Role-Based Redirect
            $role = $user->role;
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
        $user = Auth::user();
        
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        
        return redirect()->route('user.signin');
    }

    /**
     * API Login endpoint
     */
    public function apiLogin(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email|exists:users,email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            
            // Check user status
            if ($user->status === 'blocked' || $user->status === 'inactive') {
                Auth::logout();
                return response()->json([
                    'success' => false,
                    'message' => 'Your account has been ' . $user->status . '. Please contact support.'
                ], 403);
            }

            $request->session()->regenerate();

            return response()->json([
                'success' => true,
                'message' => 'Login successful',
                'data' => [
                    'user' => $user,
                    'token' => $request->session()->token() // For API token-based auth, consider using Sanctum
                ]
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'The provided credentials do not match our records.'
        ], 401);
    }
}
