<?php

namespace App\Http\Controllers\Agent;
use App\Http\Controllers\Controller;
use App\Models\Status;
use Illuminate\Http\Request;
use App\Services\Agent\MeetingService;
use Inertia\Inertia;
use Inertia\Response;

class MeetingController extends Controller
{
    protected $service;
    public function __construct(MeetingService $MeetingService)
    {
        $this->service = $MeetingService;
    }

    public function index(Request $request): Response
    {
        $result = $this->service->index();
        $result['statuses'] = Status::where('type', 'meeting')->whereNull('deleted_at')->get();
        return Inertia::render('Agent/Meeting/Index', $result);
    }

    public function updateStatus(Request $request)
    {
        return $this->service->updateStatus($request);
    }

    public function delete(Request $request)
    {
        return $this->service->delete($request);
    }
}
