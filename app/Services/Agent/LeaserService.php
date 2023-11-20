<?php
namespace App\Services\Agent;
use App\Models\Amenity;
use App\Models\Customer;
use App\Models\CustomerActivity;
use App\Models\CustomerFollowup;
use App\Models\CustomerMeeting;
use App\Models\CustomerStatus;
use App\Models\CustomerViewing;
use App\Models\Leaser;
use App\Models\Location;
use App\Models\PropertyType;
use Auth;
use DB;
use Maatwebsite\Excel\Facades\Excel;

class LeaserService
{
    function index() { 
        try {
            $locations = Location::where([["user_id", Auth::user()->id]])->whereNull('deleted_at')->get();
            foreach ($locations as $location) {
                $leasers = Leaser::where([["location_id", $location->id], ["user_id", Auth::user()->id]])->whereNull('deleted_at')->get();
                $location->count = count($leasers);
            }

            return [
                "results" => $locations
            ];
        }
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }
    function list($location_id) {
        try {
            $user_id = Auth::user()->id;
            $leasers = Leaser::where([['user_id', $user_id], ['location_id', $location_id]])->whereNull('request_type')->whereNull('deleted_at')->get();

            foreach($leasers as $leaser) {
                $customer_status = DB::table('customer_statuses')->where([
                    ['customer_id', $leaser->customer_id], 
                    ['customer_type', 'leaser'],
                    ['source_id', $leaser->id]
                ])->first();
                $status_obj = DB::table('statuses')->where('name', $customer_status->status)->first();
                $leaser->status = $status_obj->name;
                $leaser->status_color = $status_obj->color;
            }

            $leasers->transform(fn ($res) => [
                'id'=> $res->id,
                'customer_id' => $res->customer_id,
                'customer_name'=> $res->customer->name,
                'customer_mobile'=> $res->customer->mobile,
                'location_id' => $res->location_id,
                'location' => $res->location->name,
                'property' => $res->property->name,
                'property_type' => ($res->property_type_id) ? $res->propertyType->name : "-",
                'building_name' => $res->building_name,
                'status' => $res->status,
                'status_color' => $res->status_color,
                'request_type'=> $res->request_type ? ucwords($res->request_type) : "",
                'source_id'=> $res->source_id ? $res->source_id : "",
            ]);

            return [
                "results" => $leasers
            ];
        } 
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }

    function requestList() {
        try {
            $user_id = Auth::user()->id;
            $leasers = Leaser::where([['user_id', $user_id]])->whereNotNull('request_type')->whereNull('deleted_at')->get();

            foreach($leasers as $leaser) {
                $customer_status = DB::table('customer_statuses')->where([
                    ['customer_id', $leaser->customer_id], 
                    ['customer_type', 'leaser'],
                    ['source_id', $leaser->id]
                ])->first();
                $status_obj = DB::table('statuses')->where('name', $customer_status->status)->first();
                $leaser->status = $status_obj->name;
                $leaser->status_color = $status_obj->color;
            }

            $leasers->transform(fn ($res) => [
                'id'=> $res->id,
                'customer_id' => $res->customer_id,
                'customer_name'=> $res->customer->name,
                'customer_mobile'=> $res->customer->mobile,
                'location_id' => $res->location_id,
                'location' => $res->location->name,
                'property' => $res->property->name,
                'property_type' => ($res->property_type_id) ? $res->propertyType->name : "-",
                'building_name' => $res->building_name,
                'status' => $res->status,
                'status_color' => $res->status_color,
                'request_type'=> $res->request_type ? ucwords($res->request_type) : "",
                'source_id'=> $res->source_id ? $res->source_id : "",
            ]);

            return [
                "results" => $leasers
            ];
        } 
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }

    function show($id) {
        try {
            $user_id = Auth::user()->id;
            $exists = Leaser::where([["id", $id], ["user_id", $user_id]])->exists();
            if ($exists) {
                $leaser = Leaser::where([["id", $id], ["user_id", $user_id]])->with('property', 'customer', 'location', 'propertyType')->first();

                $leaser->view_label = ucwords(str_replace('_', '  ', strtolower($leaser->view_style)));
                $leaser->commission_label = ucwords($leaser->commission_type);
                $leaser->noc_label = $leaser->noc_status ? "Yes" : "No";
                $leaser->furnished_label = $leaser->is_furnished ? "Yes" : "No";

                if($leaser->property_amenities) {
                    $current_arr_value = isset($leaser->property_amenities) ? $leaser->property_amenities : [];
                    if (!empty($current_arr_value)) {
                        $current_arr_value = explode(', ', $current_arr_value);
                    }
                    $amenities = [];
                    foreach ($current_arr_value as $key) {
                        $res = Amenity::where('id', $key)->first();
                        array_push($amenities, $res->name);
                    }
                    $amenities_array = implode(", ", $amenities);
                    $leaser->amenities = $amenities_array;
                }

                $customer_status = DB::table('customer_statuses')->where([
                    ['customer_id', $leaser->customer_id], 
                    ['customer_type', 'leaser'],
                    ['source_id', $leaser->id]
                ])->first();

                $status_obj = DB::table('statuses')->where('name', $customer_status->status)->first();
                $leaser->status = $customer_status->status;
                $leaser->status_color = $status_obj->color;

                return $leaser;
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
                $leaser = Leaser::findOrFail($id);
            } 
            else {
                $id = 0;
                $leaser = new Leaser;
                $leaser->user_id = Auth::user()->id;
                $leaser->customer_id = $request['customer_id'];
            }
            $leaser->location_id = $request['location_id'];
            $leaser->property_id = $request['property_id'];
            $leaser->property_type_id = isset($request['property_type_id']) ? $request['property_type_id'] : null;
            $leaser->building_name = isset($request['building_name']) ? $request['building_name'] : null;
            $leaser->view_style = isset($request['view_style']) ? $request['view_style'] : null;

            if(isset($request['property_amenities'])) {
                $amenities = $request['property_amenities'];
                $implode_amenities = implode(", ", $amenities);
                $leaser->property_amenities = $implode_amenities;
            }

            $leaser->property_size = isset($request['property_size']) ? $request['property_size'] : null;
            $leaser->rent_price = isset($request['rent_price']) ? $request['rent_price'] : null;
            $leaser->rent_index = isset($request['rent_index']) ? $request['rent_index'] : null;
            $leaser->noc_status = isset($request['noc_status']) ? $request['noc_status'] : null;
            $leaser->is_furnished = isset($request['is_furnished']) ? $request['is_furnished'] : null;
            $leaser->commission_type = isset($request['commission_type']) ? $request['commission_type'] : null;
            $leaser->commission = isset($request['commission']) ? $request['commission'] : null;
            $leaser->ad_link = isset($request['ad_link']) ? $request['ad_link'] : null;
            $leaser->note = isset($request['note']) ? $request['note'] : null;
            $leaser->request_type = isset($request['request_type']) ? $request['request_type'] : null;
            $leaser->source_id = isset($request['source_id']) ? $request['source_id'] : 0;
            $leaser->save();

            if(!$request['id']) {
                $customerStatus = new CustomerStatus;
                $customerStatus->user_id = Auth::user()->id;
                $customerStatus->customer_id = $request['customer_id'];
                $customerStatus->customer_type = "leaser";
                $customerStatus->source_id = $leaser->id;
                $customerStatus->status = "Prospect";
                $customerStatus->save();

                $customerActivity = new CustomerActivity;
                $customerActivity->user_id = Auth::user()->id;
                $customerActivity->customer_id = $request['customer_id'];
                $customerActivity->customer_type = "leaser";
                $customerActivity->source_id = $leaser->id;
                $customerActivity->note = "New Leaser Data has been Added.";
                $customerActivity->save();
            }

            if(!empty($request["status"])) {
                $customerStatus = CustomerStatus::where([
                    ['user_id', Auth::user()->id],
                    ['customer_id', $request['customer_id']],
                    ['customer_type', "leaser"],
                    ['source_id', $leaser->id]
                ])->first();
                $customerStatus->status = $request['status'];
                $customerStatus->save();

                $customerActivity = new CustomerActivity;
                $customerActivity->user_id = Auth::user()->id;
                $customerActivity->customer_id = $request['customer_id'];
                $customerActivity->customer_type = "leaser";
                $customerActivity->source_id = $leaser->id;
                $customerActivity->note = "Leaser status is updated to - " . $request['status'];
                $customerActivity->save();
            }
        } 
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }

    public function delete($request)
    {
        try {
            $id = $request->id;
            $seller = Leaser::findOrFail($id);
            $seller->delete();
        } 
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }

    public function import($request) {
        try { 
            $extension = $request->file('upload_file')->extension();
            if (in_array($extension, ['csv', 'xls', 'xlsx'])) { 
                $temp_path = $request->file('upload_file')->store('temp');
                $real_path = storage_path('app') . '/' . $temp_path;
                $data = Excel::toArray(null, $real_path);

                if (count($data) != 1 || !empty($data)) { 
                    $data = $data[0];
                }

                for ($i = 1; $i < count($data); $i++) {

                    $customer = Customer::where([['user_id', Auth::user()->id], ['email', $data[$i][1]]])
                        ->orWhere([['user_id', Auth::user()->id], ['mobile', $data[$i][2]]])
                        ->first();
                    
                    if($customer) {
                        $customerObj = Customer::where('id', $customer->id)->first();
                    } 
                    else {
                        $customerObj = new Customer;
                    }

                    $customerObj->user_id = Auth::user()->id;
                    $customerObj->name = $data[$i][0];
                    $customerObj->email = $data[$i][1];
                    $customerObj->mobile = $data[$i][2];
                    $customerObj->nationality = $data[$i][3];
                    $customerObj->save();
    
                    $leaser = new Leaser;
                    $leaser->user_id = Auth::user()->id;
                    $leaser->customer_id = $customerObj->id;
                    $leaser->location_id = $request->location_id;
                    $leaser->property_id = $request->property_id;
    
                    $propertyType = PropertyType::where([['property_id', $request->property_id], ['name', $data[$i][4]]])->first();
                    $leaser->property_type_id = $propertyType ? $propertyType->id : null;
    
                    $leaser->building_name = $data[$i][5];
                    $leaser->save();
    
                    $customerStatus = new CustomerStatus;
                    $customerStatus->user_id = Auth::user()->id;
                    $customerStatus->customer_id = $customerObj->id;
                    $customerStatus->customer_type = "leaser";
                    $customerStatus->source_id = $leaser->id;
                    $customerStatus->status = "Prospect";
                    $customerStatus->save();
    
                    $customerActivity = new CustomerActivity;
                    $customerActivity->user_id = Auth::user()->id;
                    $customerActivity->customer_id = $customerObj->id;
                    $customerActivity->customer_type = "leaser";
                    $customerActivity->source_id = $leaser->id;
                    $customerActivity->note = "New Leaser Data has been Added.";
                    $customerActivity->save();
                }
            }
            
        }
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }

    public function storeActivity($request) {
        try {

            if($request->activity_type == 1) {
                $activity = new CustomerActivity;
                $activity->user_id = Auth::user()->id;
                $activity->customer_id = $request->customer_id;
                $activity->customer_type = $request->customer_type;
                $activity->source_id = $request->source_id;
                $activity->activity_id = $request->activity_type;
                $activity->note = 'Initial Call was made with a note: ' . $request->note;
                $activity->save();
            }

            if($request->activity_type == 2) {
                $activity = new CustomerActivity;
                $activity->user_id = Auth::user()->id;
                $activity->customer_id = $request->customer_id;
                $activity->customer_type = $request->customer_type;
                $activity->source_id = $request->source_id;
                $activity->activity_id = $request->activity_type;
                $activity->note = 'Follow up call was scheduled on : ' . date('Y-m-d', strtotime($request->date)) . ' at ' . $request->time . '. with a note: ' . $request->note;
                $activity->save();

                $followup = new CustomerFollowup;
                $followup->user_id = Auth::user()->id;
                $followup->customer_id = $request->customer_id;
                $followup->customer_type = $request->customer_type;
                $followup->source_id = $request->source_id;
                $followup->date = $request->date;
                $followup->time = $request->time;
                $followup->note = $request->note;
                $followup->save();
            }

            if($request->activity_type == 3) {
                $activity = new CustomerActivity;
                $activity->user_id = Auth::user()->id;
                $activity->customer_id = $request->customer_id;
                $activity->customer_type = $request->customer_type;
                $activity->source_id = $request->source_id;
                $activity->activity_id = $request->activity_type;
                $activity->note = 'Meeting was scheduled on : ' . date('Y-m-d', strtotime($request->date)) . ' at ' . $request->time . '. with a note: ' . $request->note;
                $activity->save();

                $meeting = new CustomerMeeting;
                $meeting->user_id = Auth::user()->id;
                $meeting->customer_id = $request->customer_id;
                $meeting->customer_type = $request->customer_type;
                $meeting->source_id = $request->source_id;
                $meeting->date = $request->date;
                $meeting->time = $request->time;
                $meeting->note = $request->note;
                $meeting->save();
            }

            if($request->activity_type == 4) {
                $activity = new CustomerActivity;
                $activity->user_id = Auth::user()->id;
                $activity->customer_id = $request->customer_id;
                $activity->customer_type = $request->customer_type;
                $activity->source_id = $request->source_id;
                $activity->activity_id = $request->activity_type;
                $activity->note = 'Viewing was scheduled on : ' . date('Y-m-d', strtotime($request->date)) . ' at ' . $request->time . '. with a note: ' . $request->note;
                $activity->save();

                $viewing = new CustomerViewing;
                $viewing->user_id = Auth::user()->id;
                $viewing->customer_id = $request->customer_id;
                $viewing->customer_type = $request->customer_type;
                $viewing->source_id = $request->source_id;
                $viewing->date = $request->date;
                $viewing->time = $request->time;
                $viewing->note = $request->note;
                $viewing->save();
            }
        }
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }

    public function updateStatus($request) {
        try {
            $customerStatus = CustomerStatus::where([
                ['user_id', Auth::user()->id],
                ['customer_id', $request['customer_id']],
                ['customer_type', "leaser"],
                ['source_id', $request['source_id']]
            ])->first();

            $customerStatus->status = $request['status'];
            $customerStatus->save();

            $customerActivity = new CustomerActivity;
            $customerActivity->user_id = Auth::user()->id;
            $customerActivity->customer_id = $request['customer_id'];
            $customerActivity->customer_type = "leaser";
            $customerActivity->source_id = $request['source_id'];
            $customerActivity->note = "Leaser status is updated to - " . $request['status'];
            $customerActivity->save();
        }
        catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function deals() {
        try {
            $user_id = Auth::user()->id;

            $dealsArray = [];

            $leasers = Leaser::where([['user_id', $user_id]])->whereNull('deleted_at')->get();
            foreach($leasers as $leaser) {
                $customer_status = DB::table('customer_statuses')->where([
                    ['customer_type', 'leaser'],
                    ['source_id', $leaser->id],
                    ['status', 'Deal']
                ])->first();

                if($customer_status) {
                    $status_obj = DB::table('statuses')->where('name', $customer_status->status)->first();
                    
                    $leaser->customer_name = $leaser->customer->name;
                    $leaser->mobile = $leaser->customer->mobile;
                    $leaser->property_name = $leaser->property->name;
                    $leaser->property_type_name = ($leaser->property_type_id) ? $leaser->propertyType->name : "-";
                    $leaser->status = $status_obj->name;
                    $leaser->status_color = $status_obj->color;

                    array_push($dealsArray, $leaser);
                }
            }
            
            return [
                "results" => $dealsArray
            ];
        } 
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }
}
