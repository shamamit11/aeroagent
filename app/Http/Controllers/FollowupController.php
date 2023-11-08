<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\FollowupService;
use Inertia\Inertia;
use Inertia\Response;

class FollowupController extends Controller
{
    protected $service;
    public function __construct(FollowupService $FollowupService)
    {
        $this->service = $FollowupService;
    }

    public function index(Request $request): Response
    {
        $result = $this->service->index();
        return Inertia::render('Followup/Index', $result);
    }

    public function delete(Request $request)
    {
        return $this->service->delete($request);
    }
}
