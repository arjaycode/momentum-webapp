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

            $fullName = $googleUser->name;
            $nameParts = explode(' ', $fullName);
            $firstname = $nameParts[0];
            $lastname = array_pop($nameParts);
            $user = User::updateOrCreate(
                // 1. Check if user exists by Google ID
                ['google_id' => $googleUser->id],
                // 2. If not, check by email and fill in details
                [
                    'email' => $googleUser->email,
                    'firstname' => $firstname,
                    'lastname' => $lastname,
                    'email_verified_at' => now(),
                    'google_id' => $googleUser->id,
                    // Note: Password field will be null if no local password is set
                ]
            );

            if ($user) {
                Auth::login($user);
                request()->session()->regenerate();
                return redirect()->intended('user/dashboard');
            } else {
                return redirect()->route('user.signin');
            }
        } catch (Exception $e) {
            dd($e->getMessage());
        }
    }
}
