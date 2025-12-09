<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Exception;

class GoogleController extends Controller
{
    //
    public function google_auth()
    {
        return Socialite::driver('google')->redirect();
    }

    public function google_callback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();

            // Fix name parsing - handle cases where user has only one name
            $fullName = $googleUser->name ?? '';
            $nameParts = explode(' ', trim($fullName));
            
            if (count($nameParts) === 1) {
                // User has only one name
                $firstname = $nameParts[0];
                $lastname = $nameParts[0]; // Use same name for lastname
            } else {
                // User has multiple names
                $firstname = $nameParts[0];
                $lastname = implode(' ', array_slice($nameParts, 1)); // Join remaining parts as lastname
            }

            // Fix updateOrCreate logic - check by email first, then update google_id, or create new user
            $user = User::where('email', $googleUser->email)->first();
            
            if ($user) {
                // User exists by email - update google_id if not set
                if (!$user->google_id) {
                    $user->google_id = $googleUser->id;
                    $user->save();
                }
            } else {
                // User doesn't exist - create new user
                $user = User::create([
                    'email' => $googleUser->email,
                    'google_id' => $googleUser->id,
                    'firstname' => $firstname,
                    'lastname' => $lastname,
                    'email_verified_at' => now(),
                    'role' => 'user',
                    'status' => 'active',
                    'password' => bcrypt(str()->random(32)), // Random password since using Google auth
                ]);
            }

            // Check user status before logging in
            if ($user->status === 'blocked') {
                return redirect()->route('user.signin')
                    ->withErrors(['email' => 'Your account has been blocked. Please contact support.']);
            }
            
            if ($user->status === 'inactive') {
                return redirect()->route('user.signin')
                    ->withErrors(['email' => 'Your account is inactive. Please contact support.']);
            }

            if ($user) {
                Auth::login($user);
                request()->session()->regenerate();
                
                // Role-based redirect using route helper
                if ($user->role === 'admin') {
                    return redirect()->intended(route('admin.dashboard'));
                }
                return redirect()->intended(route('user.dashboard'));
            } else {
                return redirect()->route('user.signin')
                    ->withErrors(['email' => 'Failed to authenticate with Google.']);
            }
        } catch (Exception $e) {
            return redirect()->route('user.signin')
                ->withErrors(['email' => 'An error occurred during Google authentication: ' . $e->getMessage()]);
        }
    }
}
