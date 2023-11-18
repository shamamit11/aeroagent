<?php

namespace App\Http\Controllers\Agent;
use App\Http\Controllers\Controller;
use App\Http\Requests\Agent\BuyerRequest;
use App\Models\Amenity;
use App\Models\Customer;
use App\Models\CustomerActivity;
use App\Models\CustomerStatus;
use App\Models\Project;
use App\Models\Property;
use App\Models\PropertyType;
use App\Models\Status;
use Auth;
use Illuminate\Http\Request;
use App\Services\Agent\BuyerService;
use Inertia\Inertia;
use Inertia\Response;

class BuyerController extends Controller
{
    protected $service;

    public function __construct(BuyerService $BuyerService)
    {
        $this->service = $BuyerService;
    }

    public function index(Request $request): Response
    {
        $result = $this->service->index();
        return Inertia::render('Agent/Buyer/Index', $result);
    }

    public function requestList(Request $request): Response
    {
        $result = $this->service->requestList();
        return Inertia::render('Agent/Buyer/Request', $result);
    }

    public function addEdit(Request $request): Response
    {
        $id = ($request->id) ? $request->id : 0;
        $data['row'] = $res = $this->service->show($id);

        if ($request->has('request_type')){ 
            $data['title'] =  "Add Buyer Request";
            $data['request_type'] = $request->request_type;
            $data['source_id'] = (int)$request->source_id;
            $data['customer_id'] = (int)$request->customer_id;
        } 
        else {
            $data['title'] = ($id == 0) ? "Add Buyer Data" : "Edit Buyer Data";
            $data['request_type'] = $res->request_type ? $res->request_type : null;
            $data['source_id'] = $res->source_id ? $res->source_id : 0;
            $data['customer_id'] = $res->customer_id ? $res->customer_id : null;
        }

        if ($request->has('customer_id')){ 
            $data['customers'] = Customer::where([['user_id', Auth::user()->id], ['id', $request->customer_id]])->whereNull('deleted_at')->get();
        } 
        else {
            $data['customers'] = Customer::where('user_id', Auth::user()->id)->whereNull('deleted_at')->get();
        }
        
        $data['properties'] = Property::get();
        $data['propertyTypes'] = PropertyType::get();
        $data['amenities'] = Amenity::get();
        $data['projects'] = Project::where('user_id', Auth::user()->id)->whereNull('deleted_at')->get();
        return Inertia::render('Agent/Buyer/AddEdit', $data);
    }

    public function addAction(BuyerRequest $request)
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
        $data['title'] = "Buyer Details";

        $data['row'] = $buyer = $this->service->show($id);

        $data['activities'] = CustomerActivity::where([
                ['user_id', Auth::user()->id], 
                ['customer_type', 'buyer'],
                ['source_id', $id]
            ])->orderBy('created_at', 'desc')->get()
            ->transform(fn ($item) => [
                'id'=> $item->id,
                'note'=> $item->note,
                'time_elapsed' => time_elapsed_string($item->created_at)
            ]);

        $data['status'] = CustomerStatus::where([
            ['user_id', Auth::user()->id], 
            ['customer_type', 'buyer'],
            ['source_id', $id]
        ])->first();

        $customer_status = $data['status']->status;
        $data['statuses'] = get_active_statuses($buyer->customer_id, "buyer", $id, $customer_status);

        $data['activityTypes'] = get_active_activities($buyer->customer_id, "buyer", $id);

        return Inertia::render('Agent/Buyer/Detail', $data);
    }

    public function import(Request $request): Response
    {
        $data['title'] = "Import Data";
        $data['properties'] = Property::get();
        $data['propertyTypes'] = PropertyType::get();
        $data['projects'] = Project::where('user_id', Auth::user()->id)->whereNull('deleted_at')->get();
        return Inertia::render('Agent/Buyer/Import', $data);
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
            $data['title'] = "Update Buyer Data";
            $data['row'] = $res = $this->service->show($id);
            $data['request_type'] = $res->request_type ? $res->request_type : null;
            $data['source_id'] = $res->source_id ? $res->source_id : 0;
            $data['customer_id'] = $res->customer_id ? $res->customer_id : null;
            $data['customers'] = Customer::where('user_id', Auth::user()->id)->whereNull('deleted_at')->get();
            $data['properties'] = Property::get();
            $data['propertyTypes'] = PropertyType::get();
            $data['amenities'] = Amenity::get();
            $data['projects'] = Project::where('user_id', Auth::user()->id)->whereNull('deleted_at')->get();
            return Inertia::render('Agent/Buyer/AddEdit', $data);
        } 
        else {
            return Inertia::location('/buyer');
        }
       
    }
    public function updateStatus(Request $request)
    {
        return $this->service->updateStatus($request);
    }
}
