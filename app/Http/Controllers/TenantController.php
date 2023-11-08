<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Http\Requests\TenantRequest;
use App\Models\Amenity;
use App\Models\Customer;
use App\Models\CustomerActivity;
use App\Models\CustomerStatus;
use App\Models\Property;
use App\Models\PropertyType;
use App\Models\Status;
use Auth;
use Illuminate\Http\Request;
use App\Services\TenantService;
use Inertia\Inertia;
use Inertia\Response;

class TenantController extends Controller
{
    protected $service;

    public function __construct(TenantService $TenantService)
    {
        $this->service = $TenantService;
    }

    public function index(Request $request): Response
    {
        $result = $this->service->index();
        return Inertia::render('Tenant/Index', $result);
    }

    public function addEdit(Request $request): Response
    {
        $id = ($request->id) ? $request->id : 0;
        $data['title'] = ($id == 0) ? "Add Tenant Data" : "Edit Tenant Data";
        $data['row'] = $this->service->show($id);
        $data['customers'] = Customer::where('user_id', Auth::user()->id)->whereNull('deleted_at')->get();
        $data['properties'] = Property::get();
        $data['propertyTypes'] = PropertyType::get();
        $data['amenities'] = Amenity::get();
        return Inertia::render('Tenant/AddEdit', $data);
    }

    public function addAction(TenantRequest $request)
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
        $data['title'] = "Tenant Details";

        $data['row'] = $tenant = $this->service->show($id);

        $data['activities'] = CustomerActivity::where([
                ['user_id', Auth::user()->id], 
                ['customer_type', 'tenant'],
                ['source_id', $id]
            ])->orderBy('created_at', 'desc')->get()
            ->transform(fn ($item) => [
                'id'=> $item->id,
                'note'=> $item->note,
                'time_elapsed' => time_elapsed_string($item->created_at)
            ]);

        $data['status'] = CustomerStatus::where([
            ['user_id', Auth::user()->id], 
            ['customer_type', 'tenant'],
            ['source_id', $id]
        ])->first();

        $customer_status = $data['status']->status;
        $data['statuses'] = get_active_statuses($tenant->customer_id, "tenant", $id, $customer_status);

        $data['activityTypes'] = get_active_activities($tenant->customer_id, "tenant", $id);

        return Inertia::render('Tenant/Detail', $data);
    }

    public function import(Request $request): Response
    {
        $data['title'] = "Import Data";
        $data['properties'] = Property::get();
        $data['propertyTypes'] = PropertyType::get();
        return Inertia::render('Tenant/Import', $data);
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
            $data['title'] = "Update Tenant Data";
            $data['row'] = $this->service->show($id);
            $data['customers'] = Customer::where('user_id', Auth::user()->id)->whereNull('deleted_at')->get();
            $data['properties'] = Property::get();
            $data['propertyTypes'] = PropertyType::get();
            $data['amenities'] = Amenity::get();
            return Inertia::render('Tenant/AddEdit', $data);
        } 
        else {
            return Inertia::location('/tenant');
        }
       
    }
    public function updateStatus(Request $request)
    {
        return $this->service->updateStatus($request);
    }
}
