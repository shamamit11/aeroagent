<?php

namespace App\Http\Requests\Agent;
use Illuminate\Foundation\Http\FormRequest;

class SellerRequest extends FormRequest

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
            'market' => '',
            'project_id' => '',
            'location_id' => '',
            'property_id' => 'required',
            'property_type_id' => '',
            'building_name' => '',
            'view_style' => '',
            'property_amenities' => '',
            'property_size' => '',
            'unit_price' => '',
            'market_price' => '',
            'noc_status' => '',
            'is_furnished' => '',
            'commission_type' => '',
            'commission' => '',
            'ad_link' => '',
            'note' => '',
            'status' => '',
        ];
    }
}
