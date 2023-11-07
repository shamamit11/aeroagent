<?php

namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;

class ProjectRequest extends FormRequest

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
            'developer_id' => 'required',
            'name' => ['required', 'string', 'max:255'],
            'image' => '',
            'location_id' => 'required',
            'view_style' => 'required',
            'handover_date' => 'required',
            'commission' => 'required',
            'amenities_id' => 'required',
            'project_status' => 'required',
        ];
    }
}
