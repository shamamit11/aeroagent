<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\ActivityLogService;
use Illuminate\View\View;
use Illuminate\Http\Request;
use Spatie\Activitylog\Models\Activity;
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

    public function view(Request $request): View
    {
        $id = ($request->id) ? $request->id : 0;
        $data['row'] = Activity::where('id', $id)->first();
        return view('activity-logs.modal.view', compact('page_title'), $data);
    }
}
