<?php

namespace App\Http\Controllers;

use App\Models\UserSubscription;
use App\Services\ReferralService;
use App\Services\WalletService;
use Auth;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $walletService = new WalletService;
        $result['balance'] = $walletService->walletBalance();
        $result['totalPayout'] = $walletService->totalPayout();
        $referralService = new ReferralService;
        $result['totalReferral'] = $referralService->totalReferrals();

        $user_id = Auth::user()->id;
        $subscriptionObj = UserSubscription::where('user_id', $user_id)->first();

        $result['nextRenewalDate'] = time_remaining_string($subscriptionObj->next_renewal_date);
        
        return Inertia::render('Dashboard/Index', $result);
    }
}
