<?php

namespace App\Http\Controllers\Agent;
use App\Http\Controllers\Controller;
use App\Http\Requests\Agent\LocationRequest;
use App\Models\Location;
use Illuminate\Http\Request;
use App\Services\Agent\LocationService;
use Inertia\Inertia;
use Inertia\Response;

class LocationController extends Controller
{
    protected $service;
    public function __construct(LocationService $LocationService)
    {
        $this->service = $LocationService;
    }

    public function index(Request $request): Response
    {
        $result = $this->service->list();
        return Inertia::render('Agent/Location/Index', $result);
    }

    public function addEdit(Request $request): Response
    {
        $id = ($request->id) ? $request->id : 0;
        $data['title'] = ($id == 0) ? "Add Location" : "Edit Location";
        $data['row'] = Location::where('id', $id)->first();
        return Inertia::render('Agent/Location/AddEdit', $data);
    }

    public function addAction(LocationRequest $request)
    {
        return $this->service->store($request->validated());
    }

    public function delete(Request $request)
    {
        return $this->service->delete($request);
    }
}
