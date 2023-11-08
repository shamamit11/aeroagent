<?php
namespace App\Services;
use App\Models\Amenity;
use App\Models\Customer;
use App\Models\CustomerActivity;
use App\Models\CustomerFollowup;
use App\Models\CustomerMeeting;
use App\Models\CustomerStatus;
use App\Models\CustomerViewing;
use App\Models\Location;
use App\Models\PropertyType;
use App\Models\Buyer;
use Auth;
use DB;
use Maatwebsite\Excel\Facades\Excel;

class BuyerService
{
    // function index() { 
    //     try {
    //         $locations = Location::where([["user_id", Auth::user()->id]])->whereNull('deleted_at')->get();
    //         foreach ($locations as $location) {
    //             $buyers = Buyer::where([["location_id", $location->id], ["user_id", Auth::user()->id]])->whereNull('deleted_at')->get();
    //             $location->count = count($buyers);
    //         }

    //         return [
    //             "results" => $locations
    //         ];
    //     }
    //     catch (\Exception$e) {
    //         return $e->getMessage();
    //     }
    // }
    function index() {
        try {
            $user_id = Auth::user()->id;
            $buyers = Buyer::where([['user_id', $user_id]])->whereNull('deleted_at')->get();

            foreach($buyers as $buyer) {
                $customer_status = DB::table('customer_statuses')->where([
                    ['customer_id', $buyer->customer_id], 
                    ['customer_type', 'buyer'],
                    ['source_id', $buyer->id]
                ])->first();
                $status_obj = DB::table('statuses')->where('name', $customer_status->status)->first();
                $buyer->status = $status_obj->name;
                $buyer->status_color = $status_obj->color;
            }

            $buyers->transform(fn ($res) => [
                'id'=> $res->id,
                'customer_id' => $res->customer_id,
                'customer_name'=> $res->customer->name,
                'customer_mobile'=> $res->customer->mobile,
                'interest'=> ucwords($res->interest),
                'market'=> ucwords($res->market),
                'project_name' => ($res->project_id) ? $res->project->name : "-",
                'property' => $res->property->name,
                'property_type' => ($res->property_type_id) ? $res->propertyType->name : "-",
                'status' => $res->status,
                'status_color' => $res->status_color,
            ]);

            return [
                "results" => $buyers
            ];
        } 
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }

    function show($id) {
        try {
            $user_id = Auth::user()->id;
            $exists = Buyer::where([["id", $id], ["user_id", $user_id]])->exists();
            if ($exists) {
                $buyer = Buyer::where([["id", $id], ["user_id", $user_id]])->with('property', 'customer', 'propertyType', 'project')->first();

                $buyer->market_label = ucwords($buyer->market);
                $buyer->project_name = $buyer->project_id ? $buyer->project->name : "N/A";
                $buyer->interest_label = ucwords($buyer->interest);

                $current_arr_value = isset($buyer->property_amenities) ? $buyer->property_amenities : [];
                if (!empty($current_arr_value)) {
                    $current_arr_value = explode(', ', $current_arr_value);
                }
                $amenities = [];
                foreach ($current_arr_value as $key) {
                    $res = Amenity::where('id', $key)->first();
                    array_push($amenities, $res->name);
                }
                $amenities_array = implode(", ", $amenities);
                $buyer->amenities = $amenities_array;

                $customer_status = DB::table('customer_statuses')->where([
                    ['customer_id', $buyer->customer_id], 
                    ['customer_type', 'buyer'],
                    ['source_id', $buyer->id]
                ])->first();

                $status_obj = DB::table('statuses')->where('name', $customer_status->status)->first();
                $buyer->status = $customer_status->status;
                $buyer->status_color = $status_obj->color;

                return $buyer;
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
                $buyer = Buyer::findOrFail($id);
            } 
            else {
                $id = 0;
                $buyer = new Buyer;
                $buyer->user_id = Auth::user()->id;
                $buyer->customer_id = $request['customer_id'];
            }
            $buyer->interest = $request['interest'];
            $buyer->market = $request['market'];
            $buyer->project_id = $request['project_id'];
            $buyer->property_id = $request['property_id'];
            $buyer->property_type_id = $request['property_type_id'];

            $amenities = $request['property_amenities'];
            $implode_amenities = implode(", ", $amenities);
            $buyer->property_amenities = $implode_amenities;

            $buyer->property_size = $request['property_size'];
            $buyer->budget = $request['budget'];
            $buyer->time_to_close = $request['time_to_close'];
            $buyer->note = $request['note'];
            $buyer->save();

            if(!$request['id']) {
                $customerStatus = new CustomerStatus;
                $customerStatus->user_id = Auth::user()->id;
                $customerStatus->customer_id = $request['customer_id'];
                $customerStatus->customer_type = "buyer";
                $customerStatus->source_id = $buyer->id;
                $customerStatus->status = "Prospect";
                $customerStatus->save();

                $customerActivity = new CustomerActivity;
                $customerActivity->user_id = Auth::user()->id;
                $customerActivity->customer_id = $request['customer_id'];
                $customerActivity->customer_type = "buyer";
                $customerActivity->source_id = $buyer->id;
                $customerActivity->note = "New Buyer Data has been Added.";
                $customerActivity->save();
            }

            if(!empty($request["status"])) {
                $customerStatus = CustomerStatus::where([
                    ['user_id', Auth::user()->id],
                    ['customer_id', $request['customer_id']],
                    ['customer_type', "buyer"],
                    ['source_id', $buyer->id]
                ])->first();
                $customerStatus->status = $request['status'];
                $customerStatus->save();

                $customerActivity = new CustomerActivity;
                $customerActivity->user_id = Auth::user()->id;
                $customerActivity->customer_id = $request['customer_id'];
                $customerActivity->customer_type = "buyer";
                $customerActivity->source_id = $buyer->id;
                $customerActivity->note = "Buyer status is updated to - " . $request['status'];
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
            $buyer = Buyer::findOrFail($id);
            $buyer->delete();
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
    
                    $buyer = new Buyer;
                    $buyer->user_id = Auth::user()->id;
                    $buyer->customer_id = $customerObj->id;
                    $buyer->project_id = $request->project_id;
                    $buyer->property_id = $request->property_id;
    
                    $propertyType = PropertyType::where([['property_id', $request->property_id], ['name', $data[$i][4]]])->first();
                    $buyer->property_type_id = $propertyType ? $propertyType->id : null;

                    $buyer->save();
    
                    $customerStatus = new CustomerStatus;
                    $customerStatus->user_id = Auth::user()->id;
                    $customerStatus->customer_id = $customerObj->id;
                    $customerStatus->customer_type = "buyer";
                    $customerStatus->source_id = $buyer->id;
                    $customerStatus->status = "Prospect";
                    $customerStatus->save();
    
                    $customerActivity = new CustomerActivity;
                    $customerActivity->user_id = Auth::user()->id;
                    $customerActivity->customer_id = $customerObj->id;
                    $customerActivity->customer_type = "buyer";
                    $customerActivity->source_id = $buyer->id;
                    $customerActivity->note = "New Buyer Data has been Added.";
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
                ['customer_type', "buyer"],
                ['source_id', $request['source_id']]
            ])->first();

            $customerStatus->status = $request['status'];
            $customerStatus->save();

            $customerActivity = new CustomerActivity;
            $customerActivity->user_id = Auth::user()->id;
            $customerActivity->customer_id = $request['customer_id'];
            $customerActivity->customer_type = "buyer";
            $customerActivity->source_id = $request['source_id'];
            $customerActivity->note = "Buyer status is updated to - " . $request['status'];
            $customerActivity->save();
        }
        catch (\Exception $e) {
            return $e->getMessage();
        }
    }
}
