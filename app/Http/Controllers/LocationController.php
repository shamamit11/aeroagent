<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Http\Requests\LocationRequest;
use App\Models\Location;
use Auth;
use Illuminate\Http\Request;
use App\Services\LocationService;
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
        $user_role = Auth::user()->role;

        $result = $this->service->list();

        if($user_role == "admin") {
            return Inertia::render('Location/AdminIndex', $result);
        }
        else {
            return Inertia::render('Location/Index', $result);
        }
    }

    public function addEdit(Request $request): Response
    {
        $id = ($request->id) ? $request->id : 0;
        $data['title'] = ($id == 0) ? "Add Location" : "Edit Location";
        $data['row'] = Location::where('id', $id)->first();
        return Inertia::render('Location/AddEdit', $data);
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
