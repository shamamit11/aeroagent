<?php
namespace App\Services;
use App\Models\Property;

class PropertyService
{
    function list() {
        try {
            $properties = Property::get();

            return [
                "results" => $properties
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
                $property = Property::findOrFail($id);
            } else {
                $id = 0;
                $property = new Property;
            }
            $property->name = $request['name'];
            $property->save();
        } 
        catch (\Exception$e) {
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }

    public function delete($request)
    {
        try {
            $id = $request->id;
            $property = Property::findOrFail($id);
            $property->delete();
        } 
        catch (\Exception$e) {
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }
}
