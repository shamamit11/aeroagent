<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Http\Requests\BuyerRequest;
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
use App\Services\BuyerService;
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
        return Inertia::render('Buyer/Index', $result);
    }
    // public function list(Request $request): Response
    // {
    //     $location_id = $request->lid;
    //     $result = $this->service->list($location_id);
    //     $locationObj = Location::where('id', $location_id)->first();
    //     $result['location_name'] = $locationObj->name;
    //     return Inertia::render('Buyer/List', $result);
    // }

    public function addEdit(Request $request): Response
    {
        $id = ($request->id) ? $request->id : 0;
        $data['title'] = ($id == 0) ? "Add Buyer Data" : "Edit Buyer Data";
        $data['row'] = $this->service->show($id);
        $data['customers'] = Customer::where('user_id', Auth::user()->id)->whereNull('deleted_at')->get();
        $data['properties'] = Property::get();
        $data['propertyTypes'] = PropertyType::get();
        $data['amenities'] = Amenity::get();
        $data['projects'] = Project::where('user_id', Auth::user()->id)->whereNull('deleted_at')->get();
        return Inertia::render('Buyer/AddEdit', $data);
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

        return Inertia::render('Buyer/Detail', $data);
    }

    public function import(Request $request): Response
    {
        $data['title'] = "Import Data";
        $data['properties'] = Property::get();
        $data['propertyTypes'] = PropertyType::get();
        $data['projects'] = Project::where('user_id', Auth::user()->id)->whereNull('deleted_at')->get();
        return Inertia::render('Buyer/Import', $data);
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
            $data['row'] = $this->service->show($id);
            $data['customers'] = Customer::where('user_id', Auth::user()->id)->whereNull('deleted_at')->get();
            $data['properties'] = Property::get();
            $data['propertyTypes'] = PropertyType::get();
            $data['amenities'] = Amenity::get();
            $data['projects'] = Project::where('user_id', Auth::user()->id)->whereNull('deleted_at')->get();
            return Inertia::render('Buyer/AddEdit', $data);
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
