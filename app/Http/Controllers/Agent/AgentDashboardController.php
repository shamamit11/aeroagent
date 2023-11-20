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
        
        $data['buyer_request'] = $service->getRequestData("buyer");
        $data['seller_request'] = $service->getRequestData("seller");
        $data['tenant_request'] = $service->getRequestData("tenant");
        $data['leaser_request'] = $service->getRequestData("leaser");

        $data['seller_deal'] = $service->getTotalDealData("seller");
        $data['buyer_deal'] = $service->getTotalDealData("buyer");
        $data['leaser_deal'] = $service->getTotalDealData("leaser");
        $data['tenant_deal'] = $service->getTotalDealData("tenant");

        $data['stock_apartment'] = $service->getTotalProperty(1);
        $data['stock_villa'] = $service->getTotalProperty(2);
        $data['stock_townhouse'] = $service->getTotalProperty(3);
        $data['stock_penthouse'] = $service->getTotalProperty(4);
        $data['stock_office'] = $service->getTotalProperty(5);
        $data['stock_land'] = $service->getTotalProperty(6);
        $data['stock_retail'] = $service->getTotalProperty(7);
        $data['stock_factory'] = $service->getTotalProperty(8);
        $data['stock_hotel'] = $service->getTotalProperty(9);
        
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
