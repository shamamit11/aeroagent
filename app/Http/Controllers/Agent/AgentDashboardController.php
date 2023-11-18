<?php

namespace App\Http\Controllers\Agent;
use App\Http\Controllers\Controller;
use App\Models\UserSubscription;
use App\Services\Agent\DashboardService;
use App\Services\Agent\ReferralService;
use App\Services\Agent\WalletService;
use Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class AgentDashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $service = new DashboardService;

        if($request->has('date_range')) {
            $date_filter = explode(',', $request->date_range);
            $data['date_from'] = $date_filter[0];
            $data['date_to'] = $date_filter[1];
        }
        else {
            $data['date_from'] = Carbon::today();
            $data['date_to'] = Carbon::today();
        }

        $data['followup'] = $service->getWidgetData($request, "followup");
        $data['viewing'] = $service->getWidgetData($request, "viewing");
        $data['meeting'] = $service->getWidgetData($request, "meeting");
        
        return Inertia::render('Agent/Dashboard/Index', $data);
    }

    public function wallet(): Response
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
                return Inertia::render('Affiliate/Wallet/Dashboard', $result);
            }
            else {
                return Inertia::render('Agent/Wallet/Dashboard', $result);
            }
        }
        catch (\Exception $e) {
            return response()->json(['errors' => $e->getMessage()], 400);
        }
        
    }
}
