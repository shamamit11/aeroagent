<?php
namespace App\Services\Agent;
use App\Models\Location;
use App\Models\Feed;
use Auth;

class FeedService
{
    function index() {
        try {
            $user_id = Auth::user()->id;
            $feeds = Feed::where([['user_id',$user_id]])->whereNull('deleted_at')->get();
 
            foreach($feeds as $feed) {
                $current_arr_value = isset($feed->location) ? $feed->location : [];
                if (!empty($current_arr_value)) {
                    $current_arr_value = explode(', ', $current_arr_value);
                }
                $locations = [];
                foreach ($current_arr_value as $key) {
                    $res = Location::where('id', $key)->first();
                    array_push($locations, $res->name);
                }
                $location_array = implode(", ", $locations);
                $feed->location = $location_array;
            }

            $locale = app()->getLocale();

            $feeds->transform(fn ($res) => [
                'id'=> $res->id,
                'user_name' => $res->user->first_name . ' ' . $res->user->last_name,
                'user_mobile' => $res->user->mobile,
                'looking_for' => $res->looking_for,
                'property' => $locale == 'ar' ? $res->property->ar_name : $res->property->name,
                'property_type' => ($res->property_type_id) ? ($locale == 'ar' ? $res->propertyType->ar_name : $res->propertyType->name) : "-",
                'market'=> $res->market,
                'project_name' => ($res->project_id) ? $res->project->name : "-",
                'location' => $res->location,
                'property_size' => $res->property_size,
                'budget' => $res->budget,
                'time_to_close'=> $res->time_to_close,
                'note'=> $res->note
            ]);

            return [
                "results" => $feeds
            ];
        } 
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }

    function list() {
        try {
            $user_id = Auth::user()->id;
            $feeds = Feed::where([['user_id', '<>' ,$user_id]])->whereNull('deleted_at')->get();
 
            foreach($feeds as $feed) {
                $current_arr_value = isset($feed->location) ? $feed->location : [];
                if (!empty($current_arr_value)) {
                    $current_arr_value = explode(', ', $current_arr_value);
                }
                $locations = [];
                foreach ($current_arr_value as $key) {
                    $res = Location::where('id', $key)->first();
                    array_push($locations, $res->name);
                }
                $location_array = implode(", ", $locations);
                $feed->location = $location_array;
            }

            $locale = app()->getLocale();

            $feeds->transform(fn ($res) => [
                'id'=> $res->id,
                'user_name' => $res->user->first_name . ' ' . $res->user->last_name,
                'user_mobile' => $res->user->mobile,
                'looking_for' => $res->looking_for,
                'property' => $locale == 'ar' ? $res->property->ar_name : $res->property->name,
                'property_type' => ($res->property_type_id) ? ($locale == 'ar' ? $res->propertyType->ar_name : $res->propertyType->name) : "-",
                'market'=> $res->market,
                'project_name' => ($res->project_id) ? $res->project->name : "-",
                'location' => $res->location,
                'property_size' => $res->property_size,
                'budget' => $res->budget,
                'time_to_close'=> $res->time_to_close,
                'note'=> $res->note
            ]);

            return [
                "results" => $feeds
            ];
        } 
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }

    function show($id) {
        try {
            $user_id = Auth::user()->id;
            $exists = Feed::where([["id", $id], ["user_id", $user_id]])->exists();
            if ($exists) {
                $feed = Feed::where([["id", $id], ["user_id", $user_id]])->with('property', 'propertyType', 'project')->first();

                $feed->market_label = $feed->market;
                $feed->project_name = $feed->project_id ? $feed->project->name : "N/A";

                if($feed->location) {
                    $current_arr_value = isset($feed->location) ? $feed->location : [];
                    if (!empty($current_arr_value)) {
                        $current_arr_value = explode(', ', $current_arr_value);
                    }
                    $locations = [];
                    foreach ($current_arr_value as $key) {
                        $res = Location::where('id', $key)->first();
                        array_push($locations, $res->name);
                    }
                    $locations_array = implode(", ", $locations);
                    $feed->locationArr = $locations_array;
                }

                return $feed;
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
                $feed = Feed::findOrFail($id);
            } 
            else {
                $id = 0;
                $feed = new Feed;
                $feed->user_id = Auth::user()->id;
            }
            $feed->looking_for = $request['looking_for'];
            $feed->property_id = $request['property_id'];
            $feed->property_type_id = isset($request['property_type_id']) ? $request['property_type_id'] : null;

            $feed->market = isset($request['market']) ? $request['market'] : null;

            if($request['market'] == "offplan") {
                $feed->project_id = isset($request['project_id']) ? $request['project_id'] : null;
            }

            if(isset($request['location'])) {
                $locations = $request['location'];
                $implode_locations = implode(", ", $locations);
                $feed->location = $implode_locations;
            }
            
            $feed->property_size = isset($request['property_size']) ? $request['property_size'] : null;
            $feed->budget = isset($request['budget']) ? $request['budget'] : null;
            $feed->time_to_close = isset($request['time_to_close']) ? $request['time_to_close'] : null;
            $feed->note = isset($request['note']) ? $request['note'] : null;
        
            $feed->save();
        } 
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }

    public function delete($request)
    {
        try {
            $id = $request->id;
            $buyer = Feed::findOrFail($id);
            $buyer->delete();
        } 
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }
}
