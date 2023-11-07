<?php

namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;

class ProjectDocRequest extends FormRequest

{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'id' => ['nullable', 'integer'],
            'project_id' => 'required',
            'doc_type' => 'required',
            'link' => 'required'
        ];
    }
}
