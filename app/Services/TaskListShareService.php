<?php

namespace App\Services;

use App\Models\TaskList;
use http\Exception\RuntimeException;
use Illuminate\Http\Request;

class TaskListShareService
{

    public function share(int $task_list_id, Request $request, TaskListService $taskListService): TaskList
    {
        $requestData = $request->toArray();

        $eligible_users = $this->eligibleUsers($task_list_id, $request);

        if(empty($eligible_users)){

            throw new RuntimeException("No eligible user to share task with");
        }

        /**
         * @var TaskList $task_list
         */
        $task_list = TaskList::find($task_list_id);

        $permission = $requestData['can_edit'] ? 'edit' : 'view';

        $alreadyShare = $task_list->sharedUsers()->where('user_id', $eligible_users)->exists();

        if($alreadyShare){
            $existingPermission = $requestData['can_edit'];

            if(isset($requestData['toggle'])){
                $existingPermission = !$existingPermission;
            }

            $permission = $existingPermission ? 'edit' : 'view';

            foreach($eligible_users as $user_id){
                $task_list->sharedUsers()->updateExistingPivot($user_id, ['permission' => $permission]);
            }

            return $task_list;
        }
        $task_list->sharedUsers()->attach($requestData['users'], ['permission' => $permission]);

        return $task_list;
    }

    private function eligibleUsers(int $task_list_id, Request $request): array
    {
        $requestData = $request->toArray();
        $users = collect($requestData['users']);

        /**
         * @var TaskList $task_list
         */
        $task_list = TaskList::find($task_list_id);
        $task_list_creator_id = $task_list->getAttributeValue('user_id');

        return $users->filter(function($user_id) use($task_list_creator_id) {

            return $user_id !== $task_list_creator_id;
        })->toArray();

    }
}
