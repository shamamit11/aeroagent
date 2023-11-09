<?php

namespace App\Http\Controllers\Agent;
use App\Http\Controllers\Controller;
use App\Http\Requests\Agent\DeveloperRequest;
use App\Models\Developer;
use Illuminate\Http\Request;
use App\Services\Agent\DeveloperService;
use Inertia\Inertia;
use Inertia\Response;

class DeveloperController extends Controller
{
    protected $service;
    public function __construct(DeveloperService $DeveloperService)
    {
        $this->service = $DeveloperService;
    }

    public function index(Request $request): Response
    {
        $result = $this->service->list();
        return Inertia::render('Agent/Developer/Index', $result);
    }

    public function addEdit(Request $request): Response
    {
        $id = ($request->id) ? $request->id : 0;
        $data['title'] = ($id == 0) ? "Add Developer" : "Edit Developer";
        $data['row'] = Developer::where('id', $id)->first();
        return Inertia::render('Agent/Developer/AddEdit', $data);
    }

    public function addAction(DeveloperRequest $request)
    {
        return $this->service->store($request->validated());
    }

    public function delete(Request $request)
    {
        return $this->service->delete($request);
    }
}
