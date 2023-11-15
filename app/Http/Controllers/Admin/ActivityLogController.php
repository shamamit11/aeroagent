<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\Admin\ActivityLogService;
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
        return Inertia::render('Admin/ActivityLog/Index', $result);
    }
}
