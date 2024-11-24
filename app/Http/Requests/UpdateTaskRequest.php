<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:70',
            'description' =>'max:255',
            'status' => 'required|string',
            'due_date' => 'required|date|after:yesterday',
            'user_id' => 'exists:App\Models\User,id|required|integer',
            'assignee_id' => 'exists:App\Models\User,id|integer',
            'task_list_id' => 'exists:App\Models\TaskList,id|integer'
        ];
    }
}
