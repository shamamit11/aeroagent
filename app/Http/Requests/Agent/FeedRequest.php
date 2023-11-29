<?php

namespace App\Http\Requests\Agent;
use Illuminate\Foundation\Http\FormRequest;

class FeedRequest extends FormRequest

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
            'looking_for' => 'required',
            'property_id' => 'required',
            'property_type_id' => '',
            'market' => '',
            'project_id' => '',
            'location' => '',
            'property_size' => '',
            'budget' => '',
            'time_to_close' => '',
            'note' => ''
        ];
    }
}
