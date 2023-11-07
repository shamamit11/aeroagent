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
use App\Models\Seller;
use Auth;
use DB;
use Maatwebsite\Excel\Facades\Excel;

class SellerService
{
    function index() { 
        try {
            $locations = Location::where([["user_id", Auth::user()->id]])->whereNull('deleted_at')->get();
            foreach ($locations as $location) {
                $sellers = Seller::where([["location_id", $location->id], ["user_id", Auth::user()->id]])->whereNull('deleted_at')->get();
                $location->count = count($sellers);
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
            $sellers = Seller::where([['user_id', $user_id], ['location_id', $location_id]])->whereNull('deleted_at')->get();

            foreach($sellers as $seller) {
                $customer_status = DB::table('customer_statuses')->where([
                    ['customer_id', $seller->customer_id], 
                    ['customer_type', 'seller'],
                    ['source_id', $seller->id]
                ])->first();
                $status_obj = DB::table('statuses')->where('name', $customer_status->status)->first();
                $seller->status = $status_obj->name;
                $seller->status_color = $status_obj->color;
            }

            $sellers->transform(fn ($res) => [
                'id'=> $res->id,
                'customer_id' => $res->customer_id,
                'customer_name'=> $res->customer->name,
                'customer_mobile'=> $res->customer->mobile,
                'market'=> ucwords($res->market),
                'location_id' => $res->location_id,
                'location' => $res->location->name,
                'property' => $res->property->name,
                'property_type' => $res->propertyType->name,
                'building_name' => $res->building_name,
                'status' => $res->status,
                'status_color' => $res->status_color,
            ]);

            return [
                "results" => $sellers
            ];
        } 
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }

    function show($id) {
        try {
            $user_id = Auth::user()->id;
            $exists = Seller::where([["id", $id], ["user_id", $user_id]])->exists();
            if ($exists) {
                $seller = Seller::where([["id", $id], ["user_id", $user_id]])->with('property', 'customer', 'location', 'propertyType', 'project')->first();

                $seller->market_label = ucwords($seller->market);
                $seller->view_label = ucwords(str_replace('_', '  ', strtolower($seller->view_style)));
                $seller->commission_label = ucwords($seller->commission_type);
                $seller->noc_label = $seller->noc_status ? "Yes" : "No";
                $seller->project_name = $seller->project_id ? $seller->project->name : "N/A";

                $current_arr_value = isset($seller->property_amenities) ? $seller->property_amenities : [];
                if (!empty($current_arr_value)) {
                    $current_arr_value = explode(', ', $current_arr_value);
                }
                $amenities = [];
                foreach ($current_arr_value as $key) {
                    $res = Amenity::where('id', $key)->first();
                    array_push($amenities, $res->name);
                }
                $amenities_array = implode(", ", $amenities);
                $seller->amenities = $amenities_array;

                $customer_status = DB::table('customer_statuses')->where([
                    ['customer_id', $seller->customer_id], 
                    ['customer_type', 'seller'],
                    ['source_id', $seller->id]
                ])->first();

                $status_obj = DB::table('statuses')->where('name', $customer_status->status)->first();
                $seller->status = $customer_status->status;
                $seller->status_color = $status_obj->color;

                return $seller;
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
                $seller = Seller::findOrFail($id);
            } 
            else {
                $id = 0;
                $seller = new Seller;
                $seller->user_id = Auth::user()->id;
                $seller->customer_id = $request['customer_id'];
            }
            $seller->market = $request['market'];
            $seller->project_id = $request['project_id'];
            $seller->location_id = $request['location_id'];
            $seller->property_id = $request['property_id'];
            $seller->property_type_id = $request['property_type_id'];
            $seller->building_name = $request['building_name'];
            $seller->view_style = $request['view_style'];

            $amenities = $request['property_amenities'];
            $implode_amenities = implode(", ", $amenities);
            $seller->property_amenities = $implode_amenities;

            $seller->property_size = $request['property_size'];
            $seller->unit_price = $request['unit_price'];
            $seller->market_price = $request['market_price'];
            $seller->noc_status = $request['noc_status'];
            $seller->is_furnished = $request['is_furnished'];
            $seller->commission_type = $request['commission_type'];
            $seller->commission = $request['commission'];
            $seller->ad_link = $request['ad_link'];
            $seller->note = $request['note'];
            $seller->save();

            if(!$request['id']) {
                $customerStatus = new CustomerStatus;
                $customerStatus->user_id = Auth::user()->id;
                $customerStatus->customer_id = $request['customer_id'];
                $customerStatus->customer_type = "seller";
                $customerStatus->source_id = $seller->id;
                $customerStatus->status = "Prospect";
                $customerStatus->save();

                $customerActivity = new CustomerActivity;
                $customerActivity->user_id = Auth::user()->id;
                $customerActivity->customer_id = $request['customer_id'];
                $customerActivity->customer_type = "seller";
                $customerActivity->source_id = $seller->id;
                $customerActivity->note = "New Seller Data has been Added.";
                $customerActivity->save();
            }

            if(!empty($request["status"])) {
                $customerStatus = CustomerStatus::where([
                    ['user_id', Auth::user()->id],
                    ['customer_id', $request['customer_id']],
                    ['customer_type', "seller"],
                    ['source_id', $seller->id]
                ])->first();
                $customerStatus->status = $request['status'];
                $customerStatus->save();

                $customerActivity = new CustomerActivity;
                $customerActivity->user_id = Auth::user()->id;
                $customerActivity->customer_id = $request['customer_id'];
                $customerActivity->customer_type = "seller";
                $customerActivity->source_id = $seller->id;
                $customerActivity->note = "Seller status is updated to - " . $request['status'];
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
            $seller = Seller::findOrFail($id);
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
    
                    $seller = new Seller;
                    $seller->user_id = Auth::user()->id;
                    $seller->customer_id = $customerObj->id;
                    $seller->location_id = $request->location_id;
                    $seller->property_id = $request->property_id;
    
                    $propertyType = PropertyType::where([['property_id', $request->property_id], ['name', $data[$i][4]]])->first();
                    $seller->property_type_id = $propertyType ? $propertyType->id : null;
    
                    $seller->building_name = $data[$i][5];
                    $seller->save();
    
                    $customerStatus = new CustomerStatus;
                    $customerStatus->user_id = Auth::user()->id;
                    $customerStatus->customer_id = $customerObj->id;
                    $customerStatus->customer_type = "seller";
                    $customerStatus->source_id = $seller->id;
                    $customerStatus->status = "Prospect";
                    $customerStatus->save();
    
                    $customerActivity = new CustomerActivity;
                    $customerActivity->user_id = Auth::user()->id;
                    $customerActivity->customer_id = $customerObj->id;
                    $customerActivity->customer_type = "seller";
                    $customerActivity->source_id = $seller->id;
                    $customerActivity->note = "New Seller Data has been Added.";
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
                ['customer_type', "seller"],
                ['source_id', $request['source_id']]
            ])->first();

            $customerStatus->status = $request['status'];
            $customerStatus->save();

            $customerActivity = new CustomerActivity;
            $customerActivity->user_id = Auth::user()->id;
            $customerActivity->customer_id = $request['customer_id'];
            $customerActivity->customer_type = "seller";
            $customerActivity->source_id = $request['source_id'];
            $customerActivity->note = "Seller status is updated to - " . $request['status'];
            $customerActivity->save();
        }
        catch (\Exception $e) {
            return $e->getMessage();
        }
    }
}
