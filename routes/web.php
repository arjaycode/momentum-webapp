<?php

use Illuminate\Support\Facades\Route;

Route::view('/admin/signin', 'admin.auth.signin')->name('signin');
Route::view('/admin/dashboard', 'admin.layouts.dashboard')->name('dashboard');
