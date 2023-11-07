<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Http\Requests\DeveloperRequest;
use App\Models\Developer;
use Auth;
use Illuminate\Http\Request;
use App\Services\DeveloperService;
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
        $user_role = Auth::user()->role;

        $result = $this->service->list();

        if($user_role == "admin") {
            return Inertia::render('Developer/AdminIndex', $result);
        }
        else {
            return Inertia::render('Developer/Index', $result);
        }
    }

    public function addEdit(Request $request): Response
    {
        $id = ($request->id) ? $request->id : 0;
        $data['title'] = ($id == 0) ? "Add Developer" : "Edit Developer";
        $data['row'] = Developer::where('id', $id)->first();
        return Inertia::render('Developer/AddEdit', $data);
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
