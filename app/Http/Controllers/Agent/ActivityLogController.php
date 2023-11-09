<?php

namespace App\Http\Controllers\Agent;

use App\Http\Controllers\Controller;
use App\Services\Agent\ActivityLogService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ActivityLogController extends Controller
{
    protected $service;
    public function __construct(ActivityLogService $ActivityLogService)
    {
        $this->service = $ActivityLogService;
    }
    public function index(Request $request): Response
    {
        $result = $this->service->index();
        return Inertia::render('ActivityLog/Index', $result);
    }
}
