<?php

namespace App\Http\Controllers\Agent;
use App\Http\Controllers\Controller;
use App\Models\UserSubscription;
use App\Services\Agent\ReferralService;
use App\Services\Agent\WalletService;
use Auth;
use Inertia\Inertia;
use Inertia\Response;

class AgentDashboardController extends Controller
{
    public function index(): Response
    {
        try {
            $user = Auth::user();

            $walletService = new WalletService;
            $result['balance'] = $walletService->walletBalance();
            $result['totalPayout'] = $walletService->totalPayout();
            $referralService = new ReferralService;
            $result['totalReferral'] = $referralService->totalReferrals();
    
            $subscriptionObj = UserSubscription::where('user_id', $user->id)->first();
            $result['nextRenewalDate'] = time_remaining_string($subscriptionObj->next_renewal_date);
    
            if($user->role == "affiliate") {
                return Inertia::render('Affiliate/Dashboard/Index', $result);
            }
            else {
                return Inertia::render('Agent/Dashboard/Index', $result);
            }
        }
        catch (\Exception $e) {
            return response()->json(['errors' => $e->getMessage()], 400);
        }
        
    }
}
