<?php
namespace App\Services;
use App\Models\PropertyType;

class PropertyTypeService
{
    function list() {
        try {
            $propertyTypes = PropertyType::get()
                ->transform(fn ($item) => [
                    'id'=> $item->id,
                    'name'=> $item->name,
                    'property_id' => $item->property_id,
                    'property_name' => $item->property->name,
                ]);

            return [
                "results" => $propertyTypes
            ];
        } 
        catch (\Exception$e) {
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }

    public function store($request)
    {
        try {
            if ($request['id']) {
                $id = $request['id'];
                $propertyType = PropertyType::findOrFail($id);
            } else {
                $id = 0;
                $propertyType = new PropertyType;
            }
            $propertyType->property_id = $request['property_id'];
            $propertyType->name = $request['name'];
            $propertyType->save();
        } 
        catch (\Exception$e) {
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }

    public function delete($request)
    {
        try {
            $id = $request->id;
            $propertyType = PropertyType::findOrFail($id);
            $propertyType->delete();
        } 
        catch (\Exception$e) {
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }
}
