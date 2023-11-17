<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UserRequest;
use App\Models\User;
use App\Services\Admin\WalletService;
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

    public function view(Request $request): Response
    {
        $id = ($request->id) ? $request->id : 0;
    
        $walletService = new WalletService;
        $data = $walletService->wallet($id);
        $data['balance'] = $walletService->walletBalance($id);
        $data['totalReferral'] = $walletService->totalReferral($id);
        $data['totalPayout'] = $walletService->totalPayout($id);
        $data['totalRenewal'] = $walletService->totalRenewal($id);

        $data['row'] = $row = User::where('id', $id)->first();
        $data['title'] = $row->first_name . ' ' . $row->last_name;
        
        return Inertia::render('Admin/User/View', $data);
    }
}
