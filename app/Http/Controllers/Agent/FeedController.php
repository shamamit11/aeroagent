<?php

namespace App\Http\Controllers\Agent;
use App\Http\Controllers\Controller;
use App\Http\Requests\Agent\FeedRequest;
use App\Models\Location;
use App\Models\Project;
use App\Models\Property;
use App\Models\PropertyType;
use Auth;
use Illuminate\Http\Request;
use App\Services\Agent\FeedService;
use Inertia\Inertia;
use Inertia\Response;

class FeedController extends Controller
{
    protected $service;

    public function __construct(FeedService $FeedService)
    {
        $this->service = $FeedService;
    }

    public function index(Request $request): Response
    {
        $result = $this->service->index();
        return Inertia::render('Agent/Feed/Index', $result);
    }

    public function list(Request $request): Response
    {
        $result = $this->service->list();
        //dd($result);
        return Inertia::render('Agent/Feed/List', $result);
    }
    public function addEdit(Request $request): Response
    {
        $id = ($request->id) ? $request->id : 0;
        $data['row'] = $this->service->show($id);
        $data['title'] = ($id == 0) ? "Add Feed" : "Edit Feed";
        $data['properties'] = Property::get();
        $data['propertyTypes'] = PropertyType::get();
        $data['locations'] = Location::where('user_id', Auth::user()->id)->whereNull('deleted_at')->get();
        $data['projects'] = Project::where('user_id', Auth::user()->id)->whereNull('deleted_at')->get();
        return Inertia::render('Agent/Feed/AddEdit', $data);
    }

    public function addAction(FeedRequest $request)
    {
        return $this->service->store($request->validated());
    }

    public function delete(Request $request)
    {
        return $this->service->delete($request);
    }
}
