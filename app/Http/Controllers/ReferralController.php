<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Models\UserSubscription;
use Auth;
use Illuminate\Http\Request;
use App\Services\ReferralService;
use Inertia\Inertia;
use Inertia\Response;

class ReferralController extends Controller
{
    protected $service;
    public function __construct(ReferralService $ReferralService)
    {
        $this->service = $ReferralService;
    }

    public function index(Request $request): Response
    {
        $result = $this->service->index();
        $result['totalReferral'] = $this->service->totalReferrals();
        $result['lastThirtyDaysReferrals'] = $this->service->lastThirtyDaysReferrals();
        $result['totalEarnings'] = $this->service->totalReferralEarning();
        $result['lastThirtyDaysEarning'] = $this->service->lastThirtyDaysEarning();
        return Inertia::render('Referral/Index', $result);
    }
}
