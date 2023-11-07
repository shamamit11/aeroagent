<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProjectDocRequest;
use App\Models\Project;
use Illuminate\Http\Request;
use App\Services\ProjectDocService;
use Inertia\Inertia;
use Inertia\Response;

class ProjectDocController extends Controller
{
    protected $service;
    public function __construct(ProjectDocService $ProjectDocService)
    {
        $this->service = $ProjectDocService;
    }

    public function index(Request $request): Response
    {
        $data['project'] = Project::where('id', $request->pid)->first();
        $data['results'] = $this->service->list($request->pid);
        return Inertia::render('ProjectDoc/Index', $data);
    }

    public function addEdit(Request $request): Response
    {
        $id = ($request->id) ? $request->id : 0;
        $data['pid'] =  $request->pid;
        $data['title'] = ($id == 0) ? "Add Project Document" : "Edit Project Document";
        $data['row'] = $this->service->show($id);
        return Inertia::render('ProjectDoc/AddEdit', $data);
    }

    public function addAction(ProjectDocRequest $request)
    {
        return $this->service->store($request->validated());
    }

    public function delete(Request $request)
    {
        return $this->service->delete($request);
    }
}
