<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTaskListRequest extends FormRequest
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
            'taskName' => 'required|unique:task_lists,name|max:70',
            'description' => 'required|max:255',
            'startDate' => 'required|date:after:yesterday',
            'endDate' => 'required|date|after:startDate',
            'status' => 'string|required'
        ];
    }
}
