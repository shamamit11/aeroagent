<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PropertyTypeRequest;
use App\Models\Property;
use App\Models\PropertyType;
use Illuminate\Http\Request;
use App\Services\Admin\PropertyTypeService;
use Inertia\Inertia;
use Inertia\Response;

class PropertyTypeController extends Controller
{
    protected $service;
    public function __construct(PropertyTypeService $PropertyTypeService)
    {
        $this->service = $PropertyTypeService;
    }

    public function index(Request $request): Response
    {
        $result = $this->service->list();
        return Inertia::render('Admin/PropertyType/Index', $result);
    }

    public function addEdit(Request $request): Response
    {
        $id = ($request->id) ? $request->id : 0;
        $data['title'] = ($id == 0) ? "Add Property Type" : "Edit Property Type";
        $data['row'] = PropertyType::where('id', $id)->first();
        $data['properties'] = Property::whereNull('deleted_at')->get();
        return Inertia::render('Admin/PropertyType/AddEdit', $data);
    }

    public function addAction(PropertyTypeRequest $request)
    {
        return $this->service->store($request->validated());
    }

    public function delete(Request $request)
    {
        return $this->service->delete($request);
    }
}
