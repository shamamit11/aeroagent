<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\PropertyRequest;
use App\Models\Property;
use Illuminate\Http\Request;
use App\Services\Admin\PropertyService;
use Inertia\Inertia;
use Inertia\Response;

class PropertyController extends Controller
{
    protected $service;
    public function __construct(PropertyService $PropertyService)
    {
        $this->service = $PropertyService;
    }

    public function index(Request $request): Response
    {
        $result = $this->service->list();
        return Inertia::render('Admin/Property/Index', $result);
    }

    public function addEdit(Request $request): Response
    {
        $id = ($request->id) ? $request->id : 0;
        $data['title'] = ($id == 0) ? "Add Property" : "Edit Property";
        $data['row'] = Property::where('id', $id)->first();
        return Inertia::render('Admin/Property/AddEdit', $data);
    }

    public function addAction(PropertyRequest $request)
    {
        return $this->service->store($request->validated());
    }

    public function delete(Request $request)
    {
        return $this->service->delete($request);
    }
}
