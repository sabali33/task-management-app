<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskListRequest;
use App\Http\Requests\UpdateTaskListRequest;
use App\Models\Task;
use App\Models\TaskList;
use App\Models\User;
use App\Services\TaskListService;
use App\Services\TaskListShareService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TaskListController extends Controller
{
    public function __construct(
        private TaskListService $taskListService,
        private TaskListShareService $taskListShareService)
    {
    }

    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Tasks/TaskList', [
            'task_lists' =>  TaskList::all()->map(function (TaskList $taskListItem){
                return $taskListItem->only([ 'id', 'name', 'description', 'user_id']);
            })->toArray()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render("Tasks/CreateForm");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskListRequest $request): Response|RedirectResponse
    {

        $validateData = $request->validated();

        /**
         * @var User $user
         */
        $user = $request->user();
        $formattedDate = $this->taskListService->format($validateData);

        $taskList = $user->tasksListCreated()->create($formattedDate);
        return Inertia::render("Tasks/CreateForm", [
            'task' => $taskList->only([
                'id',
                'name',
                'start_date',
                'description',
                'end_date'
            ])
        ]);

    }

    /**
     * Display the specified resource.
     */
    public function show(int $task_list_id)
    {
        $task_list = $this->taskListService->getOne($task_list_id);

        return Inertia::render('Tasks/Show', [
            'task_list' => $task_list,
            'sub_tasks' => $this->taskListService->
            model($task_list_id)->
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
                    "task_list_id"
                    ]);
            })->all()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $task_list_id): Response
    {

        return Inertia::render('Tasks/CreateForm', [
            'task_list' => $this->taskListService->getOne($task_list_id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update( int $taskListId, UpdateTaskListRequest $request): Response
    {
        $validData = $request->validated();

        $formattedDate = $this->taskListService->format($validData);

        $taskList = $this->taskListService->update($taskListId, $formattedDate);
        return Inertia::render('Tasks/CreateForm', [
            'task_list' => $taskList
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $taskListId): ?bool
    {
        return $this->taskListService->delete($taskListId);
    }

    public function share(int $task_list_id)
    {
        return Inertia::render('Tasks/Share', [
            'task_list' => TaskList::find($task_list_id),
            'users' => User::all()->map(function(User $user){
                return $user->only(['id', 'name']);
            })
        ]);
    }

    public function processShare(int $task_list_id, Request $request): Response
    {
        try {
            $task_list = $this->taskListShareService->share($task_list_id, $request, $this->taskListService);
            return Inertia::render('Tasks/Share', [
                'task_list' => $task_list,
                'users' => User::all()->map(function(User $user){
                    return $user->only(['id', 'name']);
                })
            ]);
        }catch (\Throwable $throwable){

            return Inertia::render('ErrorPage',['status' => 403]);
        }

    }
}
