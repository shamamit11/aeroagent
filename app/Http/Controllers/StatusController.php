<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Http\Requests\StatusRequest;
use App\Models\Status;
use Illuminate\Http\Request;
use App\Services\StatusService;
use Inertia\Inertia;
use Inertia\Response;

class StatusController extends Controller
{
    protected $service;
    public function __construct(StatusService $StatusService)
    {
        $this->service = $StatusService;
    }

    public function index(Request $request): Response
    {
        $result = $this->service->list();
        return Inertia::render('Status/Index', $result);
    }

    public function addEdit(Request $request): Response
    {
        $id = ($request->id) ? $request->id : 0;
        $data['title'] = ($id == 0) ? "Add Status" : "Edit Status";
        $data['row'] = Status::where('id', $id)->first();
        return Inertia::render('Status/AddEdit', $data);
    }

    public function addAction(StatusRequest $request)
    {
        return $this->service->store($request->validated());
    }

    public function delete(Request $request)
    {
        return $this->service->delete($request);
    }
}
