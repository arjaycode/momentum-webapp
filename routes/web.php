<?php

use Illuminate\Support\Facades\Route;

Route::view('/admin/signin', 'admin.auth.signin')->name('signin');
Route::view('/admin/dashboard', 'admin.layouts.dashboard')->name('dashboard');
Route::view('/admin/user-management', 'admin.layouts.user_management')->name('user-management');
Route::view('/admin/habit-management', 'admin.layouts.habit_management')->name('habit-management');
Route::view('/admin/note-management', 'admin.layouts.note_management')->name('note-management');
Route::view('/admin/settings', 'admin.layouts.settings')->name('admin-settings');
