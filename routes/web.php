<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
  return redirect()->route('user-signin');
});

Route::view('/admin/signin', 'admin.auth.signin')->name('admin-signin');
Route::view('/admin/dashboard', 'admin.layouts.dashboard')->name('dashboard');

Route::view('/admin/user-management', 'admin.layouts.user_management')->name('user-management');
Route::view('/admin/user-management/create', 'admin.layouts.user_addnew')->name('user-management.create');
Route::view('/admin/user-management/edit', 'admin.layouts.user_edit')->name('user-management.edit');

Route::view('/admin/habit-management', 'admin.layouts.habit_management')->name('habit-management');
Route::view('/admin/habit-management/create', 'admin.layouts.habit_add')->name('habit-management.create');
Route::view('/admin/habit-management/edit', 'admin.layouts.habit_edit')->name('habit-management.edit');

Route::view('/admin/note-management', 'admin.layouts.note_management')->name('note-management');
Route::view('/admin/note-management/create', 'admin.layouts.note_add')->name('note-management.create');
Route::view('/admin/note-management/edit', 'admin.layouts.note_edit')->name('note-management.edit');

Route::view('/admin/settings', 'admin.layouts.settings')->name('admin-settings');

// User Routes
Route::view('/user/signin', 'user.auth.signin')->name('user-signin');
Route::view('/user/signup', 'user.auth.signup')->name('user-signup');

Route::view('/user/dashboard', 'user.layouts.dashboard')->name('user-dashboard');

Route::view('/user/habits', 'user.layouts.habits')->name('user-habits');
Route::view('/user/habits/add', 'user.layouts.habits_add')->name('user-habits-add');
Route::view('/user/habits/edit', 'user.layouts.habits_edit')->name('user-habits-edit');
Route::view('/user/habits/view', 'user.layouts.habits_view')->name('user-habits-view');

Route::view('/user/calendar', 'user.layouts.calendar')->name('user-calendar');
Route::view('/user/settings', 'user.layouts.settings')->name('user-settings');
