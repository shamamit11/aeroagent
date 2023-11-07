<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProjectDetailRequest;
use App\Models\Project;
use App\Models\Property;
use App\Models\PropertyType;
use Illuminate\Http\Request;
use App\Services\ProjectDetailService;
use Inertia\Inertia;
use Inertia\Response;

class ProjectDetailController extends Controller
{
    protected $service;
    public function __construct(ProjectDetailService $ProjectDetailService)
    {
        $this->service = $ProjectDetailService;
    }

    public function index(Request $request): Response
    {
        $data['project'] = Project::where('id', $request->pid)->first();
        $data['results'] = $this->service->list($request->pid);
        return Inertia::render('ProjectDetail/Index', $data);
    }

    public function addEdit(Request $request): Response
    {
        $id = ($request->id) ? $request->id : 0;
        $data['pid'] =  $request->pid;
        $data['title'] = ($id == 0) ? "Add Project Detail" : "Edit Project Detail";
        $data['row'] = $this->service->show($id);
        $data['properties'] = Property::get();
        $data['propertyTypes'] = PropertyType::get();
        return Inertia::render('ProjectDetail/AddEdit', $data);
    }

    public function addAction(ProjectDetailRequest $request)
    {
        return $this->service->store($request->validated());
    }

    public function delete(Request $request)
    {
        return $this->service->delete($request);
    }
}
