<?php
namespace App\Services\Agent;
use App\Models\Location;
use Auth;

class LocationService
{
    function list() {
        try {
            $user_id = Auth::user()->id;
            $user_role = Auth::user()->role;

            if($user_role == 'admin') {
                $locations = Location::get()
                    ->transform(fn ($location) => [
                        'id'=> $location->id,
                        'name'=> $location->name,
                        'city' => $location->city,
                        'country' => $location->country,
                        'user_name' => $location->user->first_name . ' ' . $location->user->last_name,
                    ]);
            } 
            else {
                $locations = Location::where('user_id', $user_id)->whereNull('deleted_at')->get();
            }

            return [
                "results" => $locations
            ];
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
                $location = Location::findOrFail($id);
            } else {
                $id = 0;
                $location = new Location;
                $location->user_id = Auth::user()->id;
            }
            $location->name = $request['name'];
            $location->city = $request['city'];
            $location->country = $request['country'];
            $location->save();
        } 
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }

    public function delete($request)
    {
        try {
            $id = $request->id;
            $location = Location::findOrFail($id);
            $location->delete();
        } 
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }
}
