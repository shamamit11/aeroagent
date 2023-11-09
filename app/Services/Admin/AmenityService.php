<?php
namespace App\Services\Admin;
use App\Models\Amenity;

class AmenityService
{
    function list() {
        try {
            $amenities = Amenity::get();
            return [
                "results" => $amenities
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
                $amenity = Amenity::findOrFail($id);
            } else {
                $id = 0;
                $amenity = new Amenity;
            }
            $amenity->name = $request['name'];
            $amenity->save();
        } 
        catch (\Exception$e) {
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }

    public function delete($request)
    {
        try {
            $id = $request->id;
            $amenity = Amenity::findOrFail($id);
            $amenity->delete();
        } 
        catch (\Exception$e) {
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }
}
