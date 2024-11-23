<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TaskListController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/task-list', [TaskListController::class, 'index'])->middleware(['auth', 'verified'])->name('task-list');
    Route::get('/task-list/create', [TaskListController::class, 'create'])->middleware(['auth', 'verified'])->name('task-list.create');
    Route::put('/task-list/:id/edit', [TaskListController::class, 'edit'])->middleware(['auth', 'verified'])->name('task-list.edit');
    Route::delete('/task-list/:id/delete', [TaskListController::class, 'destroy'])->middleware(['auth', 'verified'])->name('task-list.destroy');
});


Route::get('/users', [RegisteredUserController::class, 'index'])->middleware(['auth', 'verified'])->name('users');


require __DIR__.'/auth.php';
