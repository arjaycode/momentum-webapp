<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class AdminAuthController extends Controller
{
    public function show()
    {
        return Inertia::render('Auth/AdminSignIn');
    }
}
