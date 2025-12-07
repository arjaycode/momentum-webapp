<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;

class ForgotPasswordController extends Controller
{
    /**
     * Show the forgot password form
     */
    public function showForgotPasswordForm()
    {
        return view('user.auth.forgotpassword');
    }

    /**
     * Send password reset link
     */
    public function sendResetLinkEmail(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
        ], [
            'email.required' => 'Please enter your email address.',
            'email.email' => 'Please enter a valid email address.',
            'email.exists' => 'We could not find a user with that email address.',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput($request->only('email'));
        }

        // Send password reset link
        $status = Password::sendResetLink(
            $request->only('email')
        );

        if ($status === Password::RESET_LINK_SENT) {
            return back()->with('success', 'We have emailed your password reset link! Please check your inbox and spam folder.');
        }

        // Handle specific error cases with user-friendly messages
        if ($status === Password::RESET_THROTTLED) {
            $errorMessage = 'Too many reset attempts. Please wait a few minutes before trying again.';
        } else {
            $errorMessage = 'Unable to send reset link. Please try again later or contact support if the problem persists.';
        }

        return back()->withErrors(['email' => $errorMessage])->withInput($request->only('email'));
    }
}

