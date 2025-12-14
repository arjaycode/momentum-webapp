<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\HabitApiController;
use App\Http\Controllers\Auth\LoginController;

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

// Public API routes
Route::post('/login', [LoginController::class, 'apiLogin'])->name('api.login');

// Protected API routes
Route::middleware('auth')->group(function () {
    // User info
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Habits API
    Route::prefix('habits')->name('habits.')->group(function () {
        Route::get('/', [HabitApiController::class, 'index'])->name('index');
        Route::get('/{id}', [HabitApiController::class, 'show'])->name('show');
        Route::post('/', [HabitApiController::class, 'store'])->name('store');
        Route::put('/{id}', [HabitApiController::class, 'update'])->name('update');
        Route::delete('/{id}', [HabitApiController::class, 'destroy'])->name('destroy');
        Route::post('/{id}/mark-done', [HabitApiController::class, 'markAsDone'])->name('mark-done');
    });
});

