<?php

namespace App\Http\Requests\Agent;
use Illuminate\Foundation\Http\FormRequest;

class ProjectDetailRequest extends FormRequest

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
            'property_id' => 'required',
            'property_type_id' => 'required',
            'total_units' => 'required|numeric',
            'size_from' => 'required',
            'size_to' => 'required',
            'price_from' => 'required|numeric',
            'price_to' => 'required|numeric'
        ];
    }
}
