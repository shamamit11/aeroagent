<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Http\Requests\AmenityRequest;
use App\Models\Amenity;
use Illuminate\Http\Request;
use App\Services\AmenityService;
use Inertia\Inertia;
use Inertia\Response;

class AmenityController extends Controller
{
    protected $service;
    public function __construct(AmenityService $AmenityService)
    {
        $this->service = $AmenityService;
    }

    public function index(Request $request): Response
    {
        $result = $this->service->list();
        return Inertia::render('Amenity/Index', $result);
    }

    public function addEdit(Request $request): Response
    {
        $id = ($request->id) ? $request->id : 0;
        $data['title'] = ($id == 0) ? "Add Amenity" : "Edit Amenity";
        $data['row'] = Amenity::where('id', $id)->first();
        return Inertia::render('Amenity/AddEdit', $data);
    }

    public function addAction(AmenityRequest $request)
    {
        return $this->service->store($request->validated());
    }

    public function delete(Request $request)
    {
        return $this->service->delete($request);
    }
}
