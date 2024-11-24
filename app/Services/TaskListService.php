<?php

namespace App\Services;

use App\Models\TaskList;

class TaskListService
{
    public function getOne(int $task_list_id)
    {
        [$task_list] =  TaskList::where('id', $task_list_id)->get()->
        map(fn($item) => $item->
        only(['id', 'name', 'description', 'start_date', 'end_date', 'user_id', 'status']) )->
        toArray();
        return $task_list;

    }

    public function update(int $taskListId, mixed $validData): TaskList
    {
        $task_list =  $this->model($taskListId);

        $task_list->update($validData);

        return $task_list->refresh();

    }

    public function model (int $taskListId): TaskList
    {
        [$task_list] =  TaskList::where('id', $taskListId)->get();
        return $task_list;
    }

    public function format(array $data): array
    {
        return [
            'name' => $data['taskName'],
            'description' => $data['description'],
            'start_date' => $data['startDate'],
            'end_date' => $data['endDate'],
            'status' => $data['status'],
        ];
    }

    public function delete(int $taskListId): ?bool
    {
        return $this->model($taskListId)->delete();
    }

}
