<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\ViewingService;
use Inertia\Inertia;
use Inertia\Response;

class ViewingController extends Controller
{
    protected $service;
    public function __construct(ViewingService $ViewingService)
    {
        $this->service = $ViewingService;
    }

    public function index(Request $request): Response
    {
        $result = $this->service->index();
        return Inertia::render('Viewing/Index', $result);
    }

    public function delete(Request $request)
    {
        return $this->service->delete($request);
    }
}
