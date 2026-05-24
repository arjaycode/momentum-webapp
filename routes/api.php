<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\HabitApiController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::patch('/profile', [AuthController::class, 'updateProfile']);
    Route::patch('/change-password', [AuthController::class, 'changePassword']);

    Route::get('/dashboard', [HabitApiController::class, 'dashboard']);
    Route::get('/habits', [HabitApiController::class, 'index']);
    Route::get('/habits/search', [HabitApiController::class, 'search']);
    Route::post('/habits', [HabitApiController::class, 'store']);
    Route::get('/habits/{id}', [HabitApiController::class, 'show']);
    Route::put('/habits/{id}', [HabitApiController::class, 'update']);
    Route::delete('/habits/{id}', [HabitApiController::class, 'destroy']);
    Route::post('/habits/{id}/mark-as-done', [HabitApiController::class, 'markAsDone']);

    Route::get('/calendar', [HabitApiController::class, 'calendar']);
    Route::get('/calendar/habits', [HabitApiController::class, 'dayHabits']);

    Route::get('/habits/{habitId}/notes', [HabitApiController::class, 'notes']);
    Route::post('/habits/{habitId}/notes', [HabitApiController::class, 'addNote']);
    Route::delete('/habits/{habitId}/notes/{noteId}', [HabitApiController::class, 'deleteNote']);
    Route::get('/notes/{id}', [HabitApiController::class, 'getNote']);
    Route::patch('/notes/{id}', [HabitApiController::class, 'updateNote']);
});
