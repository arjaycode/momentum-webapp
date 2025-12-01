<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\SignupController;

Route::get('/', function () {
  $user = Auth::user();
  if (!$user) {
    return redirect()->route('user.signin');
  }

  if ($user->role === 'admin') {
    return redirect()->route('admin.dashboard');
  }

  return redirect()->route('user.dashboard');
});

Route::post('/logout', [LoginController::class, 'logout'])->name('logout')->middleware('auth');

// Guest Pages
Route::middleware('guest')->group(function () {
  Route::view('/admin/signin', 'admin.auth.signin')->name('admin.signin');

  Route::get('/signup', [SignupController::class, 'signup_view'])->name('user.signup');
  Route::post('/signup', [SignupController::class, 'signup'])->name('user.signup.submit');

  Route::get('/signin', [LoginController::class, 'index'])->name('user.signin');
  Route::post('/signin', [LoginController::class, 'signin'])->name('user.signin.submit');
});

Route::middleware('auth')->group(function () {
  //Admin
  Route::prefix('admin')->name('admin.')->middleware(['role:admin'])->group(function () {
    Route::view('/dashboard', 'admin.layouts.dashboard')->name('dashboard');

    Route::view('/user-management', 'admin.layouts.user_management')->name('user-management');
    Route::view('/user-management/create', 'admin.layouts.user_addnew')->name('user-management.create');
    Route::view('/user-management/edit', 'admin.layouts.user_edit')->name('user-management.edit');

    Route::view('/habit-management', 'admin.layouts.habit_management')->name('habit-management');
    Route::view('/habit-management/create', 'admin.layouts.habit_add')->name('habit-management.create');
    Route::view('/habit-management/edit', 'admin.layouts.habit_edit')->name('habit-management.edit');

    Route::view('/note-management', 'admin.layouts.note_management')->name('note-management');
    Route::view('/note-management/create', 'admin.layouts.note_add')->name('note-management.create');
    Route::view('/note-management/edit', 'admin.layouts.note_edit')->name('note-management.edit');

    Route::view('/settings', 'admin.layouts.settings')->name('settings');
  });

  //User
  Route::prefix('user')->name('user.')->middleware(['role:user'])->group(function () {
    Route::view('/dashboard', 'user.layouts.dashboard')->name('dashboard');

    Route::view('/habits', 'user.layouts.habits')->name('habits');
    Route::view('/habits/add', 'user.layouts.habits_add')->name('habits.add');
    Route::view('/habits/edit', 'user.layouts.habits_edit')->name('habits.edit');
    Route::view('/habits/view', 'user.layouts.habits_view')->name('habits.view');

    Route::view('/calendar', 'user.layouts.calendar')->name('calendar');
    Route::view('/settings', 'user.layouts.settings')->name('settings');
  });
});
