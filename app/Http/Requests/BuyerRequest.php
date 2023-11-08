<?php

namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;

class BuyerRequest extends FormRequest

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
            'interest' => '',
            'market' => '',
            'project_id' => '',
            'property_id' => 'required',
            'property_type_id' => '',
            'property_amenities' => '',
            'property_size' => '',
            'budget' => '',
            'time_to_close' => '',
            'note' => '',
            'status' => '',
        ];
    }
}
