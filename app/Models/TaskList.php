<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskList extends Model
{
    /** @use HasFactory<\Database\Factories\TaskListFactory> */
    use HasFactory;

    protected $fillable = [
        'name', 'description', 'start_date', 'end_date',
    ];

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'project_user');
    }
    public function sharedWith()
    {
        return $this->belongsToMany(User::class, 'shared_task_user');
    }
}
