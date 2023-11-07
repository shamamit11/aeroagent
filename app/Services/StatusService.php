<?php
namespace App\Services;
use App\Models\Status;

class StatusService
{
    function list() {
        try {
            $statuses = Status::get()
                ->transform(fn ($status) => [
                    'id'=> $status->id,
                    'name'=> $status->name,
                    'color' => $status->color,
                    'type' => ucwords(str_replace('_', ' / ', strtolower($status->type)))
                ]);
            return [
                "results" => $statuses
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
                $status = Status::findOrFail($id);
            } else {
                $id = 0;
                $status = new Status;
            }
            $status->name = $request['name'];
            $status->color = $request['color'];
            $status->type = $request['type'];
            $status->save();
        } 
        catch (\Exception$e) {
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }

    public function delete($request)
    {
        try {
            $id = $request->id;
            $status = Status::findOrFail($id);
            $status->delete();
        } 
        catch (\Exception$e) {
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }
}
