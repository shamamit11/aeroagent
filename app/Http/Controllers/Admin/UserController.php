<?php

namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use App\Services\Admin\UserService;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    protected $service;
    public function __construct(UserService $UserService)
    {
        $this->service = $UserService;
    }

    public function index(Request $request): Response
    {
        $result = $this->service->list();
        return Inertia::render('Admin/User/Index', $result);
    }

    public function addEdit(Request $request): Response
    {
        $id = ($request->id) ? $request->id : 0;
        $data['title'] = ($id == 0) ? "Add User" : "Edit User";
        $data['row'] = User::where('id', $id)->first();
        return Inertia::render('Admin/User/AddEdit', $data);
    }

    public function addAction(UserRequest $request)
    {
        return $this->service->store($request->validated());
    }

    public function delete(Request $request)
    {
        return $this->service->delete($request);
    }
}
