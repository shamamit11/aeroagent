<?php
namespace App\Services\Agent;
use App\Models\Developer;
use Auth;

class DeveloperService
{
    function list() {
        try {
            $user_id = Auth::user()->id;
            $user_role = Auth::user()->role;

            if($user_role == 'admin') {
                $developers = Developer::get()
                    ->transform(fn ($location) => [
                        'id'=> $location->id,
                        'name'=> $location->name,
                        'city' => $location->city,
                        'country' => $location->country,
                        'user_name' => $location->user->first_name . ' ' . $location->user->last_name,
                    ]);
            } 
            else {
                $developers = Developer::where('user_id', $user_id)->whereNull('deleted_at')->get();
            }

            return [
                "results" => $developers
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
                $developer = Developer::findOrFail($id);
            } else {
                $id = 0;
                $developer = new Developer;
                $developer->user_id = Auth::user()->id;
            }
            $developer->name = $request['name'];
            $developer->city = $request['city'];
            $developer->country = $request['country'];
            $developer->save();
        } 
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }

    public function delete($request)
    {
        try {
            $id = $request->id;
            $developer = Developer::findOrFail($id);
            $developer->delete();
        } 
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }
}
