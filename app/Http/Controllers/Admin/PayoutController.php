<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\Admin\PayoutService;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class PayoutController extends Controller
{
    protected $service;
    public function __construct(PayoutService $PayoutService)
    {
        $this->service = $PayoutService;
    }

    public function index(Request $request): Response
    {
        if($request->has('pay_date')) {
            $payDate = $request->pay_date;
            $startDate = Carbon::parse($payDate)->subDays(31);
            $endDate = Carbon::parse($payDate);
            $formattedDate = Carbon::parse($payDate);
            $displayDate = $formattedDate->format('Y-m-d');
        } 
        else {
            $startDate = Carbon::today()->subDays(31);
            $endDate = Carbon::today();
            $formattedDate = Carbon::parse($endDate);
            $displayDate = $formattedDate->format('Y-m-d');
        }
        $result = $this->service->index($startDate, $endDate);
        $result['paydate'] = $displayDate;
        return Inertia::render('Admin/Payout/Index', $result);
    }

    public function store(Request $request) {
        return $this->service->store($request);
    }

    public function listPayouts() {

        $result = $this->service->listPayouts();
        return Inertia::render('Admin/Payout/List', $result);
    }
}
