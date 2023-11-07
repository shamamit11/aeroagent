<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Http\Requests\ActivityTypeRequest;
use App\Models\ActivityType;
use Illuminate\Http\Request;
use App\Services\ActivityTypeService;
use Inertia\Inertia;
use Inertia\Response;

class ActivityTypeController extends Controller
{
    protected $service;
    public function __construct(ActivityTypeService $ActivityTypeService)
    {
        $this->service = $ActivityTypeService;
    }

    public function index(Request $request): Response
    {
        $result = $this->service->list();
        return Inertia::render('ActivityType/Index', $result);
    }

    public function addEdit(Request $request): Response
    {
        $id = ($request->id) ? $request->id : 0;
        $data['title'] = ($id == 0) ? "Add Acitvity Type" : "Edit Acitvity Type";
        $data['row'] = ActivityType::where('id', $id)->first();
        return Inertia::render('ActivityType/AddEdit', $data);
    }

    public function addAction(ActivityTypeRequest $request)
    {
        return $this->service->store($request->validated());
    }

    public function delete(Request $request)
    {
        return $this->service->delete($request);
    }
}
