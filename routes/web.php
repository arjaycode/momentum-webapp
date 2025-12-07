<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\SignupController;
use App\Http\Controllers\GoogleController;
use App\Http\Controllers\Habit\HabitCategoryController;
use App\Http\Controllers\Notes\NoteController;
use App\Http\Controllers\User\CalendarController;
use App\Http\Controllers\User\DashboardController;
use App\Http\Controllers\User\HabitController;
use App\Http\Controllers\User\SettingsController;

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
    Route::get('/dashboard', [AdminDashboardController::class, 'view_dashboard'])->name('dashboard');
    //User Management
    Route::get('/user-management', [UserController::class, 'index'])->name('user-management');
    Route::view('/user-management/create', 'admin.layouts.user_addnew')->name('user-management.create');
    Route::post('/user-management/create', [UserController::class, 'store'])->name('user-management.create.submit');
    Route::get('/user-management/edit/{id}', [UserController::class, 'edit'])->name('user-management.edit');
    Route::put('/user-management/edit/{id}', [UserController::class, 'update'])->name('user-management.edit.submit');
    Route::delete('/user-management/delete/{id}', [UserController::class, 'delete'])->name('user-management.delete');
    Route::patch('/user-management/{id}/update-status', [UserController::class, 'update_status'])->name('user-management.update-status');
    //Habits Category Management
    Route::get('/habit-management', [HabitCategoryController::class, 'index'])->name('habit-management');
    Route::view('/habit-management/create', 'admin.layouts.habit_add')->name('habit-management.create');
    Route::post('/habit-management/create', [HabitCategoryController::class, 'store'])->name('habit-management.create.submit');
    Route::get('/habit-management/edit/{id}', [HabitCategoryController::class, 'edit'])->name('habit-management.edit');
    Route::patch('/habit-management/edit/{id}', [HabitCategoryController::class, 'update'])->name('habit-management.edit.submit');
    Route::delete('/habit-management/delete/{id}', [HabitCategoryController::class, 'delete'])->name('habit-management.delete');

    Route::get('/note-management', [NoteController::class, 'index'])->name('note-management');
    Route::get('/note-management/create', [NoteController::class, 'create'])->name('note-management.create');
    Route::get('/note-management/edit', [NoteController::class, 'edit'])->name('note-management.edit');
    Route::view('/settings', 'admin.layouts.settings')->name('settings');
  });

  //User
  Route::prefix('user')->name('user.')->middleware(['role:user'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/habits', [HabitController::class, 'index'])->name('habits');

    Route::get('/habits/add', [HabitController::class, 'create'])->name('habits.add');
    Route::post('/habits/add', [HabitController::class, 'store'])->name('habits.add.submit');

    Route::get('/habits/edit', [HabitController::class, 'edit'])->name('habits.edit');
    Route::get('/habits/view', [HabitController::class, 'view'])->name('habits.view');
    Route::get('/calendar', [CalendarController::class, 'index'])->name('calendar');
    Route::get('/settings', [SettingsController::class, 'index'])->name('settings');
  });
});

Route::get('auth/google', [GoogleController::class, 'google_auth'])->name('google.auth');
Route::get('auth/google/callback', [GoogleController::class, 'google_callback'])->name('google.auth.callback');
