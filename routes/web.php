<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
  return redirect()->route('admin-signin');
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
