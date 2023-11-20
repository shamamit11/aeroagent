<?php

namespace App\Http\Controllers\Agent;
use App\Http\Controllers\Controller;
use App\Http\Requests\Agent\SellerRequest;
use App\Models\Amenity;
use App\Models\Customer;
use App\Models\CustomerActivity;
use App\Models\CustomerStatus;
use App\Models\Location;
use App\Models\Project;
use App\Models\Property;
use App\Models\PropertyType;
use App\Models\Status;
use Auth;
use Illuminate\Http\Request;
use App\Services\Agent\SellerService;
use Inertia\Inertia;
use Inertia\Response;

class SellerController extends Controller
{
    protected $service;

    public function __construct(SellerService $SellerService)
    {
        $this->service = $SellerService;
    }

    public function index(Request $request): Response
    {
        $result = $this->service->index();
        return Inertia::render('Agent/Seller/Index', $result);
    }
    public function list(Request $request): Response
    {
        $location_id = $request->lid;
        $result = $this->service->list($location_id);
        $locationObj = Location::where('id', $location_id)->first();
        $result['location_name'] = $locationObj->name;
        return Inertia::render('Agent/Seller/List', $result);
    }

    public function requestList(Request $request): Response
    {
        $result = $this->service->requestList();
        return Inertia::render('Agent/Seller/Request', $result);
    }

    public function addEdit(Request $request): Response
    {
        $id = ($request->id) ? $request->id : 0;
        $data['row'] = $res = $this->service->show($id);

        if ($request->has('request_type')){ 
            $data['title'] =  "Add Seller Request";
            $data['request_type'] = $request->request_type;
            $data['source_id'] = (int)$request->source_id;
            $data['customer_id'] = (int)$request->customer_id;
        } 
        else {
            $data['title'] = ($id == 0) ? "Add Seller Data" : "Edit Seller Data";
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
        $data['projects'] = Project::where('user_id', Auth::user()->id)->whereNull('deleted_at')->get();
        return Inertia::render('Agent/Seller/AddEdit', $data);
    }

    public function addAction(SellerRequest $request)
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
        $data['title'] = "Seller Details";

        $data['row'] = $seller = $this->service->show($id);

        $data['activities'] = CustomerActivity::where([
                ['user_id', Auth::user()->id], 
                ['customer_type', 'seller'],
                ['source_id', $id]
            ])->orderBy('created_at', 'desc')->get()
            ->transform(fn ($item) => [
                'id'=> $item->id,
                'note'=> $item->note,
                'time_elapsed' => time_elapsed_string($item->created_at)
            ]);

        $data['status'] = CustomerStatus::where([
            ['user_id', Auth::user()->id], 
            ['customer_type', 'seller'],
            ['source_id', $id]
        ])->first();

        $customer_status = $data['status']->status;
        $data['statuses'] = get_active_statuses($seller->customer_id, "seller", $id, $customer_status);

        $data['activityTypes'] = get_active_activities($seller->customer_id, "seller", $id);

        return Inertia::render('Agent/Seller/Detail', $data);
    }

    public function import(Request $request): Response
    {
        $data['title'] = "Import Data";
        $data['locations'] = Location::where('user_id', Auth::user()->id)->whereNull('deleted_at')->get();
        $data['properties'] = Property::get();
        $data['propertyTypes'] = PropertyType::get();
        $data['projects'] = Project::where('user_id', Auth::user()->id)->whereNull('deleted_at')->get();
        return Inertia::render('Agent/Seller/Import', $data);
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
            $data['title'] = "Update Seller Data";

            $data['row'] = $res = $this->service->show($id);
            $data['request_type'] = @$res->request_type ? @$res->request_type : null;
            $data['source_id'] = @$res->source_id ? @$res->source_id : 0;
            $data['customer_id'] = @$res->customer_id ? @$res->customer_id : null;

            $data['customers'] = Customer::where('user_id', Auth::user()->id)->whereNull('deleted_at')->get();
            $data['locations'] = Location::where('user_id', Auth::user()->id)->whereNull('deleted_at')->get();
            $data['properties'] = Property::get();
            $data['propertyTypes'] = PropertyType::get();
            $data['amenities'] = Amenity::get();
            $data['projects'] = Project::where('user_id', Auth::user()->id)->whereNull('deleted_at')->get();
            return Inertia::render('Agent/Seller/AddEdit', $data);
        } 
        else {
            return Inertia::location('/seller');
        }
       
    }
    public function updateStatus(Request $request)
    {
        return $this->service->updateStatus($request);
    }

    public function deals(Request $request): Response
    {
        $result = $this->service->deals();
        return Inertia::render('Agent/Seller/Deal', $result);
    }

    public function stock(Request $request): Response
    {   
        $property_id = $request->property_id;
        $result = $this->service->stock($property_id);
        $result['property_id'] = $property_id;
        return Inertia::render('Agent/Seller/Stock', $result);
    }

    public function stockList(Request $request): Response
    {
        $property_id = $request->property_id;
        $location_id = $request->lid;
        $locationObj = Location::where('id', $location_id)->first();
        $propertyObj = Property::where('id', $property_id)->first();
        $result = $this->service->stockList($location_id, $property_id);
        $result['location_name'] = $locationObj->name;
        $result['property_name'] = $propertyObj->name;
        return Inertia::render('Agent/Seller/StockList', $result);
    }
}
