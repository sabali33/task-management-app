<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use App\Models\TaskList;
use App\Models\User;
use App\Services\TaskListService;
use Inertia\Inertia;
use Inertia\Response;

class TaskController extends Controller
{
    public function __construct(private TaskListService $taskListService)
    {
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('Tasks/CreateTaskForm', [
            'task_list' => TaskList::all()->map(function(TaskList $taskList){
                return $taskList->only(['id', 'name']);
            } ),
            'users' => User::all()->map(function(User $user){
                return $user->only(['id', 'name']);
            })
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $validData = $request->validated();

        /**
         * @var TaskList $taskList
         */
        $taskList = TaskList::find($validData['task_list_id']);
        $task = $taskList->tasks()->create($validData);

        return Inertia::render('Tasks/CreateTaskForm', [
            'task' => $task,
            'task_list' => TaskList::all()->map(function(TaskList $taskList){
                return $taskList->only(['id', 'name']);
            } ),
            'users' => User::all()->map(function(User $user){
                return $user->only(['id', 'name']);
            })
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $task_id)
    {
        return Inertia::render("Tasks/TaskItem", [
            'task' => Task::find($task_id)->only('title', 'description', 'task_list_id')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $task_id)
    {
        $task = Task::find($task_id);
        return Inertia::render('Tasks/CreateTaskForm', [
            'task' => $task,
            'task_list' => TaskList::all()->map(function(TaskList $taskList){
                return $taskList->only(['id', 'name']);
            } ),
            'users' => User::all()->map(function(User $user){
                return $user->only(['id', 'name']);
            })
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, int $task_id)
    {
        $validData = $request->validated();
        $validData['id'] = $task_id;
        $task = Task::find($task_id);
        $task->update($validData);

        $task_list = $this->taskListService->getOne($validData['task_list_id']);

        return Inertia::render('Tasks/Show', [
            'task_list' => $task_list,
            'sub_tasks' => $this->taskListService->
                model($validData['task_list_id'])->
                tasks()->
                getResults()->map(function(Task $task){
                    return $task->only([
                        "id",
                        "title",
                        "description",
                        "due_date",
                        "status",
                        "assignee_id",
                        "user_id",
                    ]);
                })->all()
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        dd($task);
    }
}
