<?php
namespace App\Services;
use App\Models\ProjectDetail;
use Auth;

class ProjectDetailService
{

    function list($project_id) {
        try {
            $user_id = Auth::user()->id;

            $details = ProjectDetail::where([['user_id', $user_id], ['project_id', $project_id]])->get()
                ->transform(fn ($item) => [
                    'id'=> $item->id,
                    'property' => $item->property->name,
                    'property_type' => $item->propertyType->name,
                    'total_units'=> $item->total_units,
                    'size_from' => $item->size_from,
                    'size_to' => $item->size_to,
                    'price_from' => $item->price_from,
                    'price_to' => $item->price_to
                ]);

            return $details;
        } 
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }

    function show($id) {
        try {
            $exists = ProjectDetail::where("id", $id)->exists();

            if ($exists) {
                $details = ProjectDetail::where('id', $id)->first();
                return $details;
            }
            else {
                return null;
            }
        } 
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }
    

    public function store($request)
    {
        try {
            if ($request['id']) {
                $id = $request['id'];
                $detail = ProjectDetail::findOrFail($id);
            } else {
                $id = 0;
                $detail = new ProjectDetail;
                $detail->user_id = Auth::user()->id;
                $detail->project_id = $request['project_id'];
            }
            $detail->property_id = $request['property_id'];
            $detail->property_type_id = $request['property_type_id'];
            $detail->total_units = $request['total_units'];
            $detail->size_from = $request['size_from'];
            $detail->size_to = $request['size_to'];
            $detail->price_from = $request['price_from'];
            $detail->price_to = $request['price_to'];
            $detail->save();   
        } 
        catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function delete($request)
    {
        try {
            $id = $request->id;
            $detail = ProjectDetail::where('id', $id)->first();
            $detail->delete();
        } 
        catch (\Exception $e) {
            return $e->getMessage();
        }
    }
}