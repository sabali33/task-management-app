<?php

namespace App\Services;

use App\Models\TaskList;
use App\Models\User;
use http\Exception\RuntimeException;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
         * @var Collection $task_list_collection
         */
        $task_list_collection = TaskList::find($task_list_id);

        /**
         * @var TaskList $task_list
         */
        $task_list = $task_list_collection->first();

        $permission = $requestData['can_edit'] ? 'edit' : 'view';

        $alreadyShare = $task_list->sharedUsers()->where('user_id', $eligible_users)->exists();

        $permissionExists = $task_list->sharedUsers()->wherePivot('permission', '=', $permission)->get();

        if($alreadyShare){
            $permission = $permissionExists->isNotEmpty() ? 'edit' : 'view';

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
        $task_list = TaskList::find($task_list_id)->first();
        $task_list_creator_id = $task_list->getAttributeValue('user_id');

        return $users->filter(function($user_id) use($task_list_creator_id) {
            return $user_id !== $task_list_creator_id;
        })->toArray();

    }
}
