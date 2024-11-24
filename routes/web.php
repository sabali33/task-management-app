<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TaskController;
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
    Route::get('/task-list/{task_list_id}/share', [TaskListController::class, 'share'])->middleware(['auth', 'verified'])->name('task-list.share');
    Route::get('/task-list/{task_list_id}/show', [TaskListController::class, 'show'])->middleware(['auth', 'verified'])->name('task-list.show');
    Route::get('/task-list/{task_list_id}/edit', [TaskListController::class, 'edit'])->middleware(['auth', 'verified'])->name('task-list.edit');

    Route::post('/task-list/store', [TaskListController::class, 'store'])->middleware(['auth', 'verified'])->name('task-list.store');

    Route::put('/task-list/{task_list_id}/update', [TaskListController::class, 'update'])->middleware(['auth', 'verified'])->name('task-list.update');
    Route::patch('/task-list/{task_list_id}/share', [TaskListController::class, 'processShare'])->middleware(['auth', 'verified'])->name('task-list.share.process');

    Route::delete('/task-list/{id}/delete', [TaskListController::class, 'destroy'])->middleware(['auth', 'verified'])->name('task-list.destroy');
});

Route::middleware('auth')->group(function () {

    Route::get('/task/create', [TaskController::class, 'create'])->middleware(['auth', 'verified'])->name('task.create');
    Route::get('/task/{task_id}/show', [TaskController::class, 'show'])->middleware(['auth', 'verified'])->name('task.show');
    Route::get('/task/{task_id}/edit', [TaskController::class, 'edit'])->middleware(['auth', 'verified'])->name('task.edit');
    Route::get('/tasks', [TaskController::class, 'index'])->middleware(['auth', 'verified'])->name('tasks');

    Route::post('/task/store', [TaskController::class, 'store'])->middleware(['auth', 'verified'])->name('task.store');

    Route::put('/task/{task_id}/update', [TaskController::class, 'update'])->middleware(['auth', 'verified'])->name('task.update');

    Route::delete('/task/{task_id}/delete', [TaskController::class, 'destroy'])->middleware(['auth', 'verified'])->name('task.destroy');
});

Route::get('/users', [RegisteredUserController::class, 'index'])->middleware(['auth', 'verified'])->name('users');


require __DIR__.'/auth.php';
