<?php
namespace App\Services\Agent;
use App\Models\Amenity;
use App\Models\Customer;
use App\Models\CustomerActivity;
use App\Models\CustomerFollowup;
use App\Models\CustomerMeeting;
use App\Models\CustomerStatus;
use App\Models\CustomerViewing;
use App\Models\Tenant;
use App\Models\PropertyType;
use Auth;
use DB;
use Maatwebsite\Excel\Facades\Excel;

class TenantService
{
    function index() {
        $locale = app()->getLocale();

        try {
            $user_id = Auth::user()->id;
            $tenants = Tenant::where([['user_id', $user_id]])->whereNull('request_type')->whereNull('deleted_at')->get();

            foreach($tenants as $tenant) {
                $customer_status = DB::table('customer_statuses')->where([
                    ['customer_id', $tenant->customer_id], 
                    ['customer_type', 'tenant'],
                    ['source_id', $tenant->id]
                ])->first();
                $status_obj = DB::table('statuses')->where('name', $customer_status->status)->first();
                $tenant->status = $status_obj->name;
                $tenant->status_color = $status_obj->color;
            }

            $tenants->transform(fn ($res) => [
                'id'=> $res->id,
                'customer_id' => $res->customer_id,
                'customer_name'=> $res->customer->name,
                'customer_mobile'=> $res->customer->mobile,
                'property' => $locale == 'ar' ? $res->property->ar_name : $res->property->name,
                'property_type' => ($res->property_type_id) ? ($locale == 'ar' ? $res->propertyType->ar_name : $res->propertyType->name) : "-",
                'status' => $res->status,
                'status_color' => $res->status_color,
                'request_type'=> $res->request_type ? $res->request_type : "",
                'source_id'=> $res->source_id ? $res->source_id : "",
            ]);

            return [
                "results" => $tenants
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
            $tenants = Tenant::where([['user_id', $user_id]])->whereNotNull('request_type')->whereNull('deleted_at')->get();

            foreach($tenants as $tenant) {
                $customer_status = DB::table('customer_statuses')->where([
                    ['customer_id', $tenant->customer_id], 
                    ['customer_type', 'tenant'],
                    ['source_id', $tenant->id]
                ])->first();
                $status_obj = DB::table('statuses')->where('name', $customer_status->status)->first();
                $tenant->status = $status_obj->name;
                $tenant->status_color = $status_obj->color;
            }

            $tenants->transform(fn ($res) => [
                'id'=> $res->id,
                'customer_id' => $res->customer_id,
                'customer_name'=> $res->customer->name,
                'customer_mobile'=> $res->customer->mobile,
                'property' => $locale == 'ar' ? $res->property->ar_name : $res->property->name,
                'property_type' => ($res->property_type_id) ? ($locale == 'ar' ? $res->propertyType->ar_name : $res->propertyType->name) : "-",
                'status' => $res->status,
                'status_color' => $res->status_color,
                'request_type'=> $res->request_type ? $res->request_type : "",
                'source_id'=> $res->source_id ? $res->source_id : "",
            ]);

            return [
                "results" => $tenants
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
            $exists = Tenant::where([["id", $id], ["user_id", $user_id]])->exists();
            if ($exists) {
                $tenant = Tenant::where([["id", $id], ["user_id", $user_id]])->with('property', 'customer', 'propertyType')->first();

                if($tenant->property_amenities) {
                    $current_arr_value = isset($tenant->property_amenities) ? $tenant->property_amenities : [];
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
                    $tenant->amenities = $amenities_array;
                }

                $customer_status = DB::table('customer_statuses')->where([
                    ['customer_id', $tenant->customer_id], 
                    ['customer_type', 'tenant'],
                    ['source_id', $tenant->id]
                ])->first();

                $status_obj = DB::table('statuses')->where('name', $customer_status->status)->first();
                $tenant->status = $customer_status->status;
                $tenant->status_color = $status_obj->color;

                return $tenant;
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
                $tenant = Tenant::findOrFail($id);
            } 
            else {
                $id = 0;
                $tenant = new Tenant;
                $tenant->user_id = Auth::user()->id;
                $tenant->customer_id = $request['customer_id'];
            }
            $tenant->property_id = $request['property_id'];
            $tenant->property_type_id = isset($request['property_type_id']) ? $request['property_type_id'] : null;

            if(isset($request['property_amenities'])) {
                $amenities = $request['property_amenities'];
                $implode_amenities = implode(", ", $amenities);
                $tenant->property_amenities = $implode_amenities;
            }

            $tenant->property_size = isset($request['property_size']) ? $request['property_size'] : null;
            $tenant->budget = isset($request['budget']) ? $request['budget'] : null;
            $tenant->time_to_close = isset($request['time_to_close']) ? $request['time_to_close'] : null;
            $tenant->note = isset($request['note']) ? $request['note'] : null;
            $tenant->request_type = isset($request['request_type']) ? $request['request_type'] : null;
            $tenant->source_id = isset($request['source_id']) ? $request['source_id'] : 0;
            $tenant->save();

            if(!$request['id']) {
                $customerStatus = new CustomerStatus;
                $customerStatus->user_id = Auth::user()->id;
                $customerStatus->customer_id = $request['customer_id'];
                $customerStatus->customer_type = "tenant";
                $customerStatus->source_id = $tenant->id;
                $customerStatus->status = "Prospect";
                $customerStatus->save();

                $customerActivity = new CustomerActivity;
                $customerActivity->user_id = Auth::user()->id;
                $customerActivity->customer_id = $request['customer_id'];
                $customerActivity->customer_type = "tenant";
                $customerActivity->source_id = $tenant->id;

                if($locale == 'ar') {
                    $customerActivity->note = "تمت إضافة بيانات المستأجر الجديد.";
                }
                else {
                    $customerActivity->note = "New Tenant Data has been Added.";
                }

                $customerActivity->save();
            }

            if(!empty($request["status"])) {
                $customerStatus = CustomerStatus::where([
                    ['user_id', Auth::user()->id],
                    ['customer_id', $request['customer_id']],
                    ['customer_type', "tenant"],
                    ['source_id', $tenant->id]
                ])->first();
                $customerStatus->status = $request['status'];
                $customerStatus->save();

                $customerActivity = new CustomerActivity;
                $customerActivity->user_id = Auth::user()->id;
                $customerActivity->customer_id = $request['customer_id'];
                $customerActivity->customer_type = "tenant";
                $customerActivity->source_id = $tenant->id;

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
                    $customerActivity->note = "يتم تحديث حالة المستأجر إلى - " . $status;
                }
                else {
                    $customerActivity->note = "Tenant status is updated to - " . $request['status'];
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
            $tenant = Tenant::findOrFail($id);
            $tenant->delete();
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
    
                    $tenant = new Tenant;
                    $tenant->user_id = Auth::user()->id;
                    $tenant->customer_id = $customerObj->id;
                    $tenant->property_id = $request->property_id;
    
                    $propertyType = PropertyType::where([['property_id', $request->property_id], ['name', $data[$i][4]]])->first();
                    $tenant->property_type_id = $propertyType ? $propertyType->id : null;

                    $tenant->save();
    
                    $customerStatus = new CustomerStatus;
                    $customerStatus->user_id = Auth::user()->id;
                    $customerStatus->customer_id = $customerObj->id;
                    $customerStatus->customer_type = "tenant";
                    $customerStatus->source_id = $tenant->id;
                    $customerStatus->status = "Prospect";
                    $customerStatus->save();
    
                    $customerActivity = new CustomerActivity;
                    $customerActivity->user_id = Auth::user()->id;
                    $customerActivity->customer_id = $customerObj->id;
                    $customerActivity->customer_type = "tenant";
                    $customerActivity->source_id = $tenant->id;

                    if($locale == 'ar') {
                        $customerActivity->note = "تمت إضافة بيانات المستأجر الجديد.";
                    }
                    else {
                        $customerActivity->note = "New Tenant Data has been Added.";
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
                ['customer_type', "tenant"],
                ['source_id', $request['source_id']]
            ])->first();

            $customerStatus->status = $request['status'];
            $customerStatus->save();

            $customerActivity = new CustomerActivity;
            $customerActivity->user_id = Auth::user()->id;
            $customerActivity->customer_id = $request['customer_id'];
            $customerActivity->customer_type = "tenant";
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
                $customerActivity->note = "يتم تحديث حالة المستأجر إلى - " . $status;
            }
            else {
                $customerActivity->note = "Tenant status is updated to - " . $request['status'];
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

            $tenants = Tenant::where([['user_id', $user_id]])->whereNull('deleted_at')->get();
            foreach($tenants as $tenant) {
                $customer_status = DB::table('customer_statuses')->where([
                    ['customer_type', 'tenant'],
                    ['source_id', $tenant->id],
                    ['status', 'Deal']
                ])->first();

                if($customer_status) {
                    $status_obj = DB::table('statuses')->where('name', $customer_status->status)->first();
                    
                    $tenant->customer_name = $tenant->customer->name;
                    $tenant->mobile = $tenant->customer->mobile;
                    $tenant->property_name = $locale == 'ar' ? $tenant->property->ar_name : $tenant->property->name;
                    $tenant->property_type_name = ($tenant->property_type_id) ? ($locale == 'ar' ? $tenant->propertyType->ar_name : $tenant->propertyType->name) : "-";
                    $tenant->status = $status_obj->name;
                    $tenant->status_color = $status_obj->color;

                    array_push($dealsArray, $tenant);
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
