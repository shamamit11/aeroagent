<?php

namespace App\Http\Requests\Agent;
use Illuminate\Foundation\Http\FormRequest;

class CustomerRequest extends FormRequest

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
            'name' => 'required',
            'email' => 'required',
            'mobile' => 'required',
            'nationality' => 'required'
        ];
    }
}
