<?php

namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;

class LeaserImportRequest extends FormRequest

{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'property_id' => 'required',
            'location_id' => 'required',
            'upload_file' => 'required',
        ];
    }
}
