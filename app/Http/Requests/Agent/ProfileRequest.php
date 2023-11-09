<?php

namespace App\Http\Requests\Agent;
use Illuminate\Foundation\Http\FormRequest;

class ProfileRequest extends FormRequest

{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'upload_image' => 'nullable|image|mimes:png,jpg,jpeg|max:300'
        ];
    }
}
