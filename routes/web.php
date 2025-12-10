<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\User\ProfileController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\SignupController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\GoogleController;
use App\Http\Controllers\Habit\HabitCategoryController;
use App\Http\Controllers\Admin\AdminHabitController;
use App\Http\Controllers\Notes\NoteController;

Route::get('/', function () {
    if (!Auth::check()) {
        return redirect()->route('user.signin');
    }
    $user = Auth::user();
    $role = $user->role ?? null;
    if ($role === 'admin') {
        return redirect()->route('admin.dashboard');
    } elseif ($role === 'user') {
        return redirect()->route('user.dashboard');
    } else {
        Auth::logout();
        return redirect()->route('user.signin')
            ->withErrors(['email' => 'Invalid user role. Please contact support.']);
    }
});

Route::post('/logout', [LoginController::class, 'logout'])->name('logout')->middleware('auth');

// Guest Pages
Route::middleware('guest')->group(function () {
    Route::view('/admin/signin', 'admin.auth.signin')->name('admin.signin');
    Route::get('/signup', [SignupController::class, 'signup_view'])->name('user.signup');
    Route::post('/signup', [SignupController::class, 'signup'])->name('user.signup.submit');
    Route::get('/signin', [LoginController::class, 'index'])->name('user.signin');
    Route::post('/signin', [LoginController::class, 'signin'])->name('user.signin.submit');
    Route::get('/forgot-password', [ForgotPasswordController::class, 'showForgotPasswordForm'])->name('password.request');
    Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLinkEmail'])->name('password.email');
    Route::get('/reset-password/{token}', [ResetPasswordController::class, 'showResetForm'])->name('password.reset');
    Route::post('/reset-password', [ResetPasswordController::class, 'reset'])->name('password.update');
});

Route::middleware('auth')->group(function () {
    //Admin
    Route::prefix('admin')->name('admin.')->middleware(['role:admin'])->group(function () {
        Route::get('/dashboard', [AdminDashboardController::class, 'view_dashboard'])->name('dashboard');
        Route::get('/dashboard/stats', [AdminDashboardController::class, 'getStats'])->name('dashboard.stats');
        Route::get('/dashboard/chart-data', [AdminDashboardController::class, 'getChartData'])->name('dashboard.chart-data');
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

        //Habits Management
        Route::get('/habits', [AdminHabitController::class, 'index'])->name('habits.index');
        Route::get('/habits/create', [AdminHabitController::class, 'create'])->name('habits.create');
        Route::post('/habits', [AdminHabitController::class, 'store'])->name('habits.store');
        Route::get('/habits/edit/{id}', [AdminHabitController::class, 'edit'])->name('habits.edit');
        Route::put('/habits/{id}', [AdminHabitController::class, 'update'])->name('habits.update');
        Route::delete('/habits/{id}', [AdminHabitController::class, 'destroy'])->name('habits.destroy');

        Route::get('/note-management', [NoteController::class, 'index'])->name('note-management');
        Route::get('/note-management/create', [NoteController::class, 'create'])->name('note-management.create');
        Route::post('/note-management', [NoteController::class, 'store'])->name('note-management.store');
        Route::get('/note-management/edit/{id}', [NoteController::class, 'edit'])->name('note-management.edit');
        Route::put('/note-management/{id}', [NoteController::class, 'update'])->name('note-management.update');
        Route::delete('/note-management/{id}', [NoteController::class, 'destroy'])->name('note-management.destroy');
        Route::get('/settings', [\App\Http\Controllers\Admin\AdminSettingsController::class, 'show'])->name('settings');
        Route::put('/settings/profile', [\App\Http\Controllers\Admin\AdminSettingsController::class, 'update'])->name('settings.update');
        Route::post('/settings/avatar', [\App\Http\Controllers\Admin\AdminSettingsController::class, 'updateAvatar'])->name('settings.avatar');
        Route::put('/settings/password', [\App\Http\Controllers\Admin\AdminSettingsController::class, 'updatePassword'])->name('settings.password');
        // API Routes
        Route::get('/settings/system', [\App\Http\Controllers\Admin\AdminSettingsController::class, 'getSystemSettings'])->name('settings.system.get');
        Route::put('/settings/system', [\App\Http\Controllers\Admin\AdminSettingsController::class, 'updateSystemSettings'])->name('settings.system.update');
        Route::get('/settings/notifications', [\App\Http\Controllers\Admin\AdminSettingsController::class, 'getNotificationSettings'])->name('settings.notifications.get');
        Route::put('/settings/notifications', [\App\Http\Controllers\Admin\AdminSettingsController::class, 'updateNotificationSettings'])->name('settings.notifications.update');
    });

    //User
    Route::prefix('user')->name('user.')->middleware(['role:user'])->group(function () {
        // Dashboard
        Route::get('/dashboard', [\App\Http\Controllers\User\DashboardController::class, 'index'])->name('dashboard');
        Route::get('/today-habits', [\App\Http\Controllers\User\DashboardController::class, 'getTodayHabits'])->name('today-habits');

        // Habits
        Route::get('/habits', [\App\Http\Controllers\User\HabitController::class, 'index'])->name('habits');
        Route::get('/habits/add', [\App\Http\Controllers\User\HabitController::class, 'create'])->name('habits.add');
        Route::post('/habits/add', [\App\Http\Controllers\User\HabitController::class, 'store'])->name('habits.store');
        Route::get('/habits/calendar-data', [\App\Http\Controllers\User\HabitController::class, 'getCalendarData'])->name('habits.calendar-data');
        Route::get('/habits/search', [\App\Http\Controllers\User\HabitController::class, 'search'])->name('habits.search');
        Route::get('/habits/edit/{id}', [\App\Http\Controllers\User\HabitController::class, 'edit'])->name('habits.edit');
        Route::put('/habits/edit/{id}', [\App\Http\Controllers\User\HabitController::class, 'update'])->name('habits.update');
        Route::get('/habits/view/{id}', [\App\Http\Controllers\User\HabitController::class, 'show'])->name('habits.view');
        Route::delete('/habits/delete/{id}', [\App\Http\Controllers\User\HabitController::class, 'destroy'])->name('habits.delete');
        Route::post('/habits/{id}/mark-done', [\App\Http\Controllers\User\HabitController::class, 'markAsDone'])->name('habits.mark-done');
        // note for habit
        Route::post('/habits/{id}/notes', [\App\Http\Controllers\User\HabitController::class, 'storeNote'])->name('habits.notes.store');
        Route::delete('/habits/{habitId}/notes/{noteId}', [\App\Http\Controllers\User\HabitController::class, 'deleteNote'])->name('habits.notes.delete');

        // --- OTHER USER PAGES ---
        Route::get('/notifications', [\App\Http\Controllers\User\NotificationController::class, 'index'])->name('notifications');
        Route::post('/notifications/clear', [\App\Http\Controllers\User\NotificationController::class, 'clear'])->name('notifications.clear');
        Route::view('/calendar', 'user.layouts.calendar')->name('calendar');

        // --- PROFILE MANAGEMENT ---
        Route::get('/settings', [ProfileController::class, 'show'])->name('settings');
        Route::put('/profile/update', [ProfileController::class, 'update'])->name('profile.update');
        Route::post('/profile/avatar', [ProfileController::class, 'updateAvatar'])->name('profile.avatar');
        Route::put('/profile/password', [ProfileController::class, 'updatePassword'])->name('profile.password');
        Route::delete('/profile/delete', [ProfileController::class, 'destroy'])->name('profile.delete');
        Route::get('/profile/export', [ProfileController::class, 'exportData'])->name('profile.export');
    });
});

Route::get('auth/google', [GoogleController::class, 'google_auth'])->name('google.auth');
Route::get('auth/google/callback', [GoogleController::class, 'google_callback'])->name('google.auth.callback');
