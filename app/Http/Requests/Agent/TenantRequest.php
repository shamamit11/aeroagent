<?php

namespace App\Http\Requests\Agent;
use Illuminate\Foundation\Http\FormRequest;

class TenantRequest extends FormRequest

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
            'customer_id' => 'required',
            'property_id' => 'required',
            'property_type_id' => '',
            'property_amenities' => '',
            'property_size' => '',
            'budget' => '',
            'time_to_close' => 'nullable',
            'note' => '',
            'status' => '',
        ];
    }
}
