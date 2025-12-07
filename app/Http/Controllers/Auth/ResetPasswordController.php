<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Auth\Events\PasswordReset;
use App\Models\User;

class ResetPasswordController extends Controller
{
    /**
     * Show the password reset form
     */
    public function showResetForm(Request $request, $token = null)
    {
        // Check if token is valid
        if (!$token) {
            return redirect()->route('password.request')
                ->withErrors(['email' => 'Invalid or missing reset token. Please request a new password reset link.']);
        }

        return view('user.auth.resetpassword')->with(
            ['token' => $token, 'email' => $request->email]
        );
    }

    /**
     * Reset the user's password
     */
    public function reset(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email|exists:users,email',
            'password' => 'required|string|min:8|confirmed',
        ], [
            'email.required' => 'Email address is required.',
            'email.email' => 'Please enter a valid email address.',
            'email.exists' => 'We could not find a user with that email address.',
            'password.required' => 'Password is required.',
            'password.min' => 'Password must be at least 8 characters.',
            'password.confirmed' => 'Password confirmation does not match.',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            return redirect()->route('user.signin')->with('success', 'Your password has been reset successfully! You can now sign in with your new password.');
        }

        // Handle specific error cases
        if ($status === Password::INVALID_TOKEN) {
            $errorMessage = 'This password reset token is invalid or has expired. Please request a new password reset link.';
        } elseif ($status === Password::INVALID_USER) {
            $errorMessage = 'We could not find a user with that email address.';
        } else {
            $errorMessage = 'An error occurred while resetting your password. Please try again.';
        }

        return back()->withErrors(['email' => $errorMessage])->withInput($request->only('email'));
    }
}

