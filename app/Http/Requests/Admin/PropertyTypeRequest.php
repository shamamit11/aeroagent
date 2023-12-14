<?php

namespace App\Http\Requests\Admin;
use Illuminate\Foundation\Http\FormRequest;

class PropertyTypeRequest extends FormRequest

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
            'property_id' => ['nullable', 'integer'],
            'name' => ['required', 'string', 'max:255'],
            'ar_name' => ['required', 'string', 'max:255']
        ];
    }
}
