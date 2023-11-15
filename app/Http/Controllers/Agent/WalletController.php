<?php

namespace App\Http\Controllers\Agent;
use App\Http\Controllers\Controller;
use Auth;
use Illuminate\Http\Request;
use App\Services\Agent\WalletService;
use Inertia\Inertia;
use Inertia\Response;

class WalletController extends Controller
{
    protected $service;
    public function __construct(WalletService $WalletService)
    {
        $this->service = $WalletService;
    }

    public function index(Request $request): Response
    {
        $result = $this->service->index();
        $result['balance'] = $this->service->walletBalance();
        $result['totalReferral'] = $this->service->totalReferral();
        $result['totalPayout'] = $this->service->totalPayout();
        $result['totalRenewal'] = $this->service->totalRenewal();

        $user = Auth::user();
        if($user->role == "affiliate") {
            return Inertia::render('Affiliate/Wallet/Index', $result);
        }
        else{
            return Inertia::render('Agent/Wallet/Index', $result);
        }
        
    }

    public function payout(Request $request): Response
    {
        $result = $this->service->payout();

        $user = Auth::user();
        if($user->role == "affiliate") {
            return Inertia::render('Affiliate/Wallet/Payout', $result);
        }
        else{
            return Inertia::render('Agent/Wallet/Payout', $result);
        }
        
    }

    public function renewal(Request $request): Response
    {
        $result = $this->service->renewal();

        $user = Auth::user();
        if($user->role == "affiliate") {
            return Inertia::render('Affiliate/Wallet/Renewal', $result);
        }
        else{
            return Inertia::render('Agent/Wallet/Renewal', $result);
        }
    }
}
