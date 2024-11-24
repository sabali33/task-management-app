<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TaskList extends Model
{
    /** @use HasFactory<\Database\Factories\TaskListFactory> */
    use HasFactory;

    protected $fillable = [
        'name', 'description', 'start_date', 'end_date', 'user_id', 'status',
    ];

    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function sharedUsers()
    {
        return $this->belongsToMany(User::class)->using(TaskListUser::class);
    }
}
