<?php

namespace App\Http\Controllers;

use App\Models\UserSubscription;
use App\Services\Agent\ReferralService;
use App\Services\Agent\WalletService;
use Auth;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $user = Auth::user();

        if($user->role == "admin") {
            return Inertia::render('Admin/Dashboard/Index');
        } 
        else {
            $walletService = new WalletService;
            $result['balance'] = $walletService->walletBalance();
            $result['totalPayout'] = $walletService->totalPayout();
            $referralService = new ReferralService;
            $result['totalReferral'] = $referralService->totalReferrals();

            $subscriptionObj = UserSubscription::where('user_id', $user->id)->first();
            $result['nextRenewalDate'] = time_remaining_string($subscriptionObj->next_renewal_date);
            return Inertia::render('Agent/Dashboard/Index', $result);
        }
    }
}
