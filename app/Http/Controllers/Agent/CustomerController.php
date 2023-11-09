<?php

namespace App\Http\Controllers\Agent;
use App\Http\Controllers\Controller;
use App\Http\Requests\Agent\CustomerRequest;
use Illuminate\Http\Request;
use App\Services\Agent\CustomerService;
use Inertia\Inertia;
use Inertia\Response;

class CustomerController extends Controller
{
    protected $service;

    public function __construct(CustomerService $CustomerService)
    {
        $this->service = $CustomerService;
    }
    public function index(): Response
    {
        $result = $this->service->list();
        return Inertia::render('Agent/Customer/List/Index', $result);
    }

    public function addEdit(Request $request): Response
    {
        $id = ($request->id) ? $request->id : 0;
        $data['title'] = ($id == 0) ? "Add Customer" : "Edit Customer";
        $data['row'] = $this->service->show($id);
        return Inertia::render('Agent/Customer/List/AddEdit', $data);
    }

    public function addAction(CustomerRequest $request)
    {
        return $this->service->store($request->validated());
    }

    public function delete(Request $request)
    {
        return $this->service->delete($request);
    }
}
