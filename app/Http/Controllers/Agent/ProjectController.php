<?php

namespace App\Http\Controllers\Agent;
use App\Http\Controllers\Controller;
use App\Http\Requests\Agent\ProjectRequest;
use App\Models\Amenity;
use App\Models\Developer;
use App\Models\Location;
use Auth;
use Illuminate\Http\Request;
use App\Services\Agent\ProjectService;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    protected $service;
    public function __construct(ProjectService $ProjectService)
    {
        $this->service = $ProjectService;
    }

    public function index(Request $request): Response
    {
        $result = $this->service->list();
        return Inertia::render('Agent/Project/Index', $result);
    }

    public function view(Request $request): Response
    {
        $id = ($request->id) ? $request->id : 0;
        $data['row'] = $this->service->show($id);
        $data['units'] = $this->service->getUnitsByProjectId($id);
        $data['documents'] = $this->service->getDocumentsByProjectId($id);
        return Inertia::render('Agent/Project/View', $data);
    }

    public function addEdit(Request $request): Response
    {
        $id = ($request->id) ? $request->id : 0;
        $data['title'] = ($id == 0) ? "Add Project" : "Edit Project";
        $data['row'] = $this->service->show($id);
        $data['developers'] = Developer::where('user_id', Auth::user()->id)->whereNull('deleted_at')->get();
        $data['locations'] = Location::where('user_id', Auth::user()->id)->whereNull('deleted_at')->get();
        $data['amenities'] = Amenity::get();
        return Inertia::render('Agent/Project/AddEdit', $data);
    }

    public function addAction(ProjectRequest $request)
    {
        return $this->service->store($request->validated());
    }

    public function delete(Request $request)
    {
        return $this->service->delete($request);
    }
}
