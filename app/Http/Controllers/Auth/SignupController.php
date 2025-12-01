<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SignupController extends Controller
{
    public function signup_view()
    {
        return view('user.auth.signup');
    }

    public function signup(Request $request)
    {
        $credentials = $request->validate([
            'firstname' => 'required|string|max:50',
            'lastname' => 'required|string|max:50',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8'
        ]);

        $user = User::create($credentials);

        return redirect(route('user.signin'), 201)->with('success', 'Account Succesfully Created. You can now login');
    }
}
