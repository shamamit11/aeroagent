<?php

namespace App\Http\Controllers\Agent;
use App\Http\Controllers\Controller;
use App\Http\Requests\Agent\LeaserRequest;
use App\Models\Amenity;
use App\Models\Customer;
use App\Models\CustomerActivity;
use App\Models\CustomerStatus;
use App\Models\Location;
use App\Models\Property;
use App\Models\PropertyType;
use App\Models\Status;
use Auth;
use Illuminate\Http\Request;
use App\Services\Agent\LeaserService;
use Inertia\Inertia;
use Inertia\Response;

class LeaserController extends Controller
{
    protected $service;

    public function __construct(LeaserService $LeaserService)
    {
        $this->service = $LeaserService;
    }

    public function index(Request $request): Response
    {
        $result = $this->service->index();
        return Inertia::render('Agent/Leaser/Index', $result);
    }
    public function list(Request $request): Response
    {
        $location_id = $request->lid;
        $result = $this->service->list($location_id);
        $locationObj = Location::where('id', $location_id)->first();
        $result['location_name'] = $locationObj->name;
        return Inertia::render('Agent/Leaser/List', $result);
    }

    public function requestList(Request $request): Response
    {
        $result = $this->service->requestList();
        return Inertia::render('Agent/Leaser/Request', $result);
    }

    public function addEdit(Request $request): Response
    {
        $id = ($request->id) ? $request->id : 0;
        $data['row'] = $res = $this->service->show($id);

        if ($request->has('request_type')){ 
            $data['title'] =  "Add Leaser Request";
            $data['request_type'] = $request->request_type;
            $data['source_id'] = (int)$request->source_id;
            $data['customer_id'] = (int)$request->customer_id;
        } 
        else {
            $data['title'] = ($id == 0) ? "Add Leaser Data" : "Edit Leaser Data";
            $data['request_type'] = @$res->request_type ? @$res->request_type : null;
            $data['source_id'] = @$res->source_id ? @$res->source_id : 0;
            $data['customer_id'] = @$res->customer_id ? @$res->customer_id : null;
        }

        if ($request->has('customer_id')){ 
            $data['customers'] = Customer::where([['user_id', Auth::user()->id], ['id', $request->customer_id]])->whereNull('deleted_at')->get();
        } 
        else {
            $data['customers'] = Customer::where('user_id', Auth::user()->id)->whereNull('deleted_at')->get();
        }
        
        $data['locations'] = Location::where('user_id', Auth::user()->id)->whereNull('deleted_at')->get();
        $data['properties'] = Property::get();
        $data['propertyTypes'] = PropertyType::get();
        $data['amenities'] = Amenity::get();
        return Inertia::render('Agent/Leaser/AddEdit', $data);
    }

    public function addAction(LeaserRequest $request)
    {
        return $this->service->store($request->validated());
    }

    public function delete(Request $request)
    {
        return $this->service->delete($request);
    }

    public function detail(Request $request): Response
    {
        $id = ($request->id) ? $request->id : 0;
        $data['title'] = "Leaser Details";

        $data['row'] = $leaser = $this->service->show($id);

        $data['activities'] = CustomerActivity::where([
                ['user_id', Auth::user()->id], 
                ['customer_type', 'leaser'],
                ['source_id', $id]
            ])->orderBy('created_at', 'desc')->get()
            ->transform(fn ($item) => [
                'id'=> $item->id,
                'note'=> $item->note,
                'time_elapsed' => time_elapsed_string($item->created_at)
            ]);

        $data['status'] = CustomerStatus::where([
            ['user_id', Auth::user()->id], 
            ['customer_type', 'leaser'],
            ['source_id', $id]
        ])->first();

        $customer_status = $data['status']->status;
        $data['statuses'] = get_active_statuses($leaser->customer_id, "leaser", $id, $customer_status);

        $data['activityTypes'] = get_active_activities($leaser->customer_id, "leaser", $id);

        return Inertia::render('Agent/Leaser/Detail', $data);
    }

    public function import(Request $request): Response
    {
        $data['title'] = "Import Data";
        $data['locations'] = Location::where('user_id', Auth::user()->id)->whereNull('deleted_at')->get();
        $data['properties'] = Property::get();
        $data['propertyTypes'] = PropertyType::get();
        return Inertia::render('Agent/Leaser/Import', $data);
    }

    public function importAction(Request $request)
    {
        return $this->service->import($request);
    }

    public function activityAction(Request $request)
    {
        return $this->service->storeActivity($request);
    }

    public function editData(Request $request)
    {
        $id = ($request->id) ? $request->id : 0;
        $statusObj = Status::where('id', $request->status)->first();

        if($statusObj) {
            $data['status'] = $statusObj->name;
            $data['title'] = "Update Leaser Data";
            $data['row'] = $res = $this->service->show($id);
            $data['request_type'] = @$res->request_type ? @$res->request_type : null;
            $data['source_id'] = @$res->source_id ? @$res->source_id : 0;
            $data['customer_id'] = @$res->customer_id ? @$res->customer_id : null;
            $data['customers'] = Customer::where('user_id', Auth::user()->id)->whereNull('deleted_at')->get();
            $data['locations'] = Location::where('user_id', Auth::user()->id)->whereNull('deleted_at')->get();
            $data['properties'] = Property::get();
            $data['propertyTypes'] = PropertyType::get();
            $data['amenities'] = Amenity::get();
            return Inertia::render('Agent/Leaser/AddEdit', $data);
        } 
        else {
            return Inertia::location('/leaser');
        }
       
    }
    public function updateStatus(Request $request)
    {
        return $this->service->updateStatus($request);
    }

    public function deals(Request $request): Response
    {
        $result = $this->service->deals();
        return Inertia::render('Agent/Leaser/Deal', $result);
    }
}
