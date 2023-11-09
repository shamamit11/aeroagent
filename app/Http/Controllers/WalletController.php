<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\WalletService;
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
        return Inertia::render('Wallet/Index', $result);
    }

    public function payout(Request $request): Response
    {
        $result = $this->service->payout();
        return Inertia::render('Wallet/Payout', $result);
    }

    public function renewal(Request $request): Response
    {
        $result = $this->service->renewal();
        return Inertia::render('Wallet/Renewal', $result);
    }
}