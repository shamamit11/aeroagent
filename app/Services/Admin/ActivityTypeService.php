<?php
namespace App\Services\Admin;
use App\Models\ActivityType;

class ActivityTypeService
{
    function list() {
        try {
            $activities = ActivityType::get();
            return [
                "results" => $activities
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
                $activityType = ActivityType::findOrFail($id);
            } else {
                $id = 0;
                $activityType = new ActivityType;
            }
            $activityType->name = $request['name'];
            $activityType->save();
        } 
        catch (\Exception$e) {
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }

    public function delete($request)
    {
        try {
            $id = $request->id;
            $activityType = ActivityType::findOrFail($id);
            $activityType->delete();
        } 
        catch (\Exception$e) {
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }
}
