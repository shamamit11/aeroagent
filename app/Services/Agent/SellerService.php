<?php
namespace App\Services\Agent;
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
            $locale = app()->getLocale();
            $user_id = Auth::user()->id;
            $sellers = Seller::where([['user_id', $user_id], ['location_id', $location_id]])->whereNull('request_type')->whereNull('deleted_at')->get();

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
                'property' => $locale == 'ar' ? $res->property->ar_name : $res->property->name,
                'property_type' => ($res->property_type_id) ? ($locale == 'ar' ? $res->propertyType->ar_name : $res->propertyType->name) : "-",
                'building_name' => $res->building_name,
                'status' => $res->status,
                'status_color' => $res->status_color,
                'request_type'=> $res->request_type ? ucwords($res->request_type) : "",
                'source_id'=> $res->source_id ? $res->source_id : "",
            ]);

            return [
                "results" => $sellers
            ];
        } 
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }

    function requestList() {
        try {
            $locale = app()->getLocale();
            $user_id = Auth::user()->id;
            $sellers = Seller::where([['user_id', $user_id]])->whereNotNull('request_type')->whereNull('deleted_at')->get();

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
                'market'=> $res->market,
                'location_id' => $res->location_id,
                'location' => $res->location->name,
                'property' => $locale == 'ar' ? $res->property->ar_name : $res->property->name,
                'property_type' => ($res->property_type_id) ? ($locale == 'ar' ? $res->propertyType->ar_name : $res->propertyType->name) : "-",
                'building_name' => $res->building_name,
                'status' => $res->status,
                'status_color' => $res->status_color,
                'request_type'=> $res->request_type ? $res->request_type : "",
                'source_id'=> $res->source_id ? $res->source_id : "",
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
            $locale = app()->getLocale();

            $user_id = Auth::user()->id;
            $exists = Seller::where([["id", $id], ["user_id", $user_id]])->exists();
            if ($exists) {
                $seller = Seller::where([["id", $id], ["user_id", $user_id]])->with('property', 'customer', 'location', 'propertyType', 'project')->first();

                $seller->market_label = $seller->market;
                $seller->view_label = $seller->view_style;
                $seller->commission_label = $seller->commission_type;
                $seller->noc_label = $seller->noc_status ? "Yes" : "No";
                $seller->project_name = $seller->project_id ? $seller->project->name : ($locale == 'ar' ? "لا يوجد" : "N/A");

                if($seller->property_amenities) {
                    $current_arr_value = isset($seller->property_amenities) ? $seller->property_amenities : [];
                    if (!empty($current_arr_value)) {
                        $current_arr_value = explode(', ', $current_arr_value);
                    }
                    $amenities = [];
                    foreach ($current_arr_value as $key) {
                        $res = Amenity::where('id', $key)->first();
                        if($locale == 'ar') {
                            array_push($amenities, $res->ar_name);
                        }
                        else {
                            array_push($amenities, $res->name);
                        }
                    }
                    $amenities_array = implode(", ", $amenities);
                    $seller->amenities = $amenities_array;
                }
                
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
        $locale = app()->getLocale();
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
            $seller->market = isset($request['market']) ? $request['market'] : null;

            if($request['market'] == "offplan") {
                $seller->project_id = isset($request['project_id']) ? $request['project_id'] : null;
            }

            $seller->location_id = $request['location_id'];
            $seller->property_id = $request['property_id'];
            $seller->property_type_id = isset($request['property_type_id']) ? $request['property_type_id'] : null;
            $seller->building_name = isset($request['building_name']) ? $request['building_name'] : null;
            $seller->view_style = isset($request['view_style']) ? $request['view_style'] : null;

            if(isset($request['property_amenities'])) {
                $amenities = $request['property_amenities'];
                $implode_amenities = implode(", ", $amenities);
                $seller->property_amenities = $implode_amenities;
            }

            $seller->property_size = isset($request['property_size']) ? $request['property_size'] : null;
            $seller->unit_price = isset($request['unit_price']) ? $request['unit_price'] : null;
            $seller->market_price = isset($request['market_price']) ? $request['market_price'] : null;
            $seller->noc_status = isset($request['noc_status']) ? $request['noc_status'] : null;
            $seller->is_furnished = isset($request['is_furnished']) ? $request['is_furnished'] : null;
            $seller->commission_type = isset($request['commission_type']) ? $request['commission_type'] : null;
            $seller->commission = isset($request['commission']) ? $request['commission'] : null;
            $seller->ad_link = isset($request['ad_link']) ? $request['ad_link']: null;
            $seller->note = isset($request['note']) ? $request['note'] : null;

            $seller->request_type = isset($request['request_type']) ? $request['request_type'] : null;
            $seller->source_id = isset($request['source_id']) ? $request['source_id'] : 0;
            
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

                if($locale == 'ar') {
                    $customerActivity->note = "تمت إضافة بيانات البائع الجديدة.";
                }
                else {
                    $customerActivity->note = "New Seller Data has been Added.";
                }
                
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

                if($locale == 'ar') {
                    if($request['status'] == 'Prospect') {
                        $status = 'احتمال';
                    } 
                    else if($request['status'] == 'Potential') {
                        $status = 'محتمل';
                    }
                    else if($request['status'] == 'Interested') {
                        $status = 'مهتم';
                    }
                    else if($request['status'] == 'Not Interested') {
                        $status = 'غير مهتم';
                    }
                    else if($request['status'] == 'Deal') {
                        $status = 'اتفاق';
                    }
                    $customerActivity->note = "يتم تحديث حالة البائع إلى - " . $status;
                }
                else {
                    $customerActivity->note = "Seller status is updated to - " . $request['status'];
                }

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
            $locale = app()->getLocale();

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

                    if($locale == 'ar') {
                        $customerActivity->note = "تمت إضافة بيانات البائع الجديدة.";
                    }
                    else {
                        $customerActivity->note = "New Seller Data has been Added.";
                    }
                    
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
            $locale = app()->getLocale();

            if($request->activity_type == 1) {
                $activity = new CustomerActivity;
                $activity->user_id = Auth::user()->id;
                $activity->customer_id = $request->customer_id;
                $activity->customer_type = $request->customer_type;
                $activity->source_id = $request->source_id;
                $activity->activity_id = $request->activity_type;

                if($locale == 'ar') {
                    $activity->note = 'تم إجراء المكالمة الأولية مع ملاحظة:' . $request->note;
                }
                else {
                    $activity->note = 'Initial Call was made with a note : ' . $request->note;
                }
                
                $activity->save();
            }

            if($request->activity_type == 2) {
                $activity = new CustomerActivity;
                $activity->user_id = Auth::user()->id;
                $activity->customer_id = $request->customer_id;
                $activity->customer_type = $request->customer_type;
                $activity->source_id = $request->source_id;
                $activity->activity_id = $request->activity_type;

                if($locale == 'ar') {
                    $activity->note = 'تمت جدولة مكالمة المتابعة : ' . date('Y-m-d', strtotime($request->date)) . ' في ' . $request->time . '. مع ملاحظة : ' . $request->note;
                }
                else {
                    $activity->note = 'Follow up call was scheduled on : ' . date('Y-m-d', strtotime($request->date)) . ' at ' . $request->time . '. with a note: ' . $request->note;
                }
                
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

                if($locale == 'ar') {
                    $activity->note = 'كان من المقرر الاجتماع يوم : ' . date('Y-m-d', strtotime($request->date)) . ' في ' . $request->time . '. مع ملاحظة : ' . $request->note;
                }
                else {
                    $activity->note = 'Meeting was scheduled on : ' . date('Y-m-d', strtotime($request->date)) . ' at ' . $request->time . '. with a note: ' . $request->note;
                }
                
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

                if($locale == 'ar') {
                    $activity->note = 'تمت جدولة المشاهدة في : ' . date('Y-m-d', strtotime($request->date)) . ' في ' . $request->time . '. مع ملاحظة : ' . $request->note;
                }
                else{
                    $activity->note = 'Viewing was scheduled on : ' . date('Y-m-d', strtotime($request->date)) . ' at ' . $request->time . '. with a note: ' . $request->note;
                }
                
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
            $locale = app()->getLocale();

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

            if($locale == 'ar') {
                if($request['status'] == 'Prospect') {
                    $status = 'احتمال';
                } 
                else if($request['status'] == 'Potential') {
                    $status = 'محتمل';
                }
                else if($request['status'] == 'Interested') {
                    $status = 'مهتم';
                }
                else if($request['status'] == 'Not Interested') {
                    $status = 'غير مهتم';
                }
                else if($request['status'] == 'Deal') {
                    $status = 'اتفاق';
                }
                $customerActivity->note = "يتم تحديث حالة البائع إلى - " . $status;
            }
            else {
                $customerActivity->note = "Seller status is updated to - " . $request['status'];
            }

            $customerActivity->save();
        }
        catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function deals() {
        try {
            $locale = app()->getLocale();

            $user_id = Auth::user()->id;

            $dealsArray = [];

            $sellers = Seller::where([['user_id', $user_id]])->whereNull('deleted_at')->get();
            foreach($sellers as $seller) {
                $customer_status = DB::table('customer_statuses')->where([
                    ['customer_type', 'seller'],
                    ['source_id', $seller->id],
                    ['status', 'Deal']
                ])->first();

                if($customer_status) {
                    $status_obj = DB::table('statuses')->where('name', $customer_status->status)->first();
                    
                    $seller->customer_name = $seller->customer->name;
                    $seller->mobile = $seller->customer->mobile;
                    $seller->property_name = $locale == 'ar' ? $seller->property->ar_name : $seller->property->name;
                    $seller->property_type_name = ($seller->property_type_id) ? ($locale == 'ar' ? $seller->propertyType->ar_name : $seller->propertyType->name) : "-";
                    $seller->status = $status_obj->name;
                    $seller->status_color = $status_obj->color;

                    array_push($dealsArray, $seller);
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

    function stock($property_id) {
        try {
            $locations = Location::where("user_id", Auth::user()->id)->whereNull('deleted_at')->get();
    
            foreach ($locations as $location) {
                $sellers = Seller::select('sellers.*', DB::raw('COUNT(cs.id) as count'))
                    ->join('customer_statuses as cs', 'sellers.id', '=', 'cs.source_id')
                    ->where([
                        ["sellers.location_id", $location->id], 
                        ["sellers.user_id", Auth::user()->id], 
                        ["sellers.property_id", $property_id],
                        ['cs.customer_type', 'seller'],
                        ['cs.status', 'Interested']
                    ])
                    ->whereNull('sellers.deleted_at')
                    ->get();
    
                // Reset the array for each location
                $totalPropertyArray = [];
    
                foreach ($sellers as $seller) {
                    $totalPropertyArray[] = $seller;
                }
    
                // Set the count for the current location
                $location->count = count($totalPropertyArray);
            }
    
            return [
                "results" => $locations
            ];
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }
    

    public function stockList($location_id, $property_id) 
    {
        $locale = app()->getLocale();
        try {
            $user_id = Auth::user()->id;
            $stocks = [];
            $sellers = Seller::where([['user_id', $user_id], ['location_id', $location_id]])->whereNull('deleted_at')->get();

            foreach($sellers as $seller) {
                $customer_status = DB::table('customer_statuses')->where([
                    ['customer_id', $seller->customer_id], 
                    ['customer_type', 'seller'],
                    ['source_id', $seller->id],
                    ['status', 'Interested']
                ])->first();

                if($customer_status) {
                    $status_obj = DB::table('statuses')->where('name', $customer_status->status)->first();
                    $seller->status = $status_obj->name;
                    $seller->status_color = $status_obj->color;
                    $seller->customer_name = $seller->customer->name;
                    $seller->customer_mobile = $seller->customer->mobile;
                    $seller->property_name = $locale == 'ar' ? $seller->property->ar_name : $seller->property->name;
                    $seller->property_type_name = ($seller->property_type_id) ? ($locale == 'ar' ? $seller->propertyType->ar_name : $seller->propertyType->name) : "-";
                    array_push($stocks, $seller);
                }
            }

            return [
                "results" => $stocks
            ];
        }
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }
}
