<?php

namespace App\Http\Controllers\Agent;

use App\Http\Controllers\Controller;
use Auth;
use Illuminate\Http\Request;
use App\Services\Agent\PaymentService;
use App\Services\Agent\WalletService;
use Inertia\Inertia;
use Inertia\Response;

class PaymentController extends Controller
{
    protected $service;
    public function __construct(PaymentService $PaymentService)
    {
        $this->service = $PaymentService;
    }

    public function index(Request $request): Response
    {
        $result = $this->service->index();
        $walletService = new WalletService;
        $result['balance'] = $walletService->walletBalance();

        $user = Auth::user();
        if ($user->role == "affiliate") {
            return Inertia::render('Affiliate/Payment/Index', $result);
        }
        else {
            return Inertia::render('Agent/Payment/Index', $result);
        }
    }

    public function generateStripeSession(Request $request)
    {
        \Stripe\Stripe::setApiKey(config('stripe.sk'));
        $stripe_session = \Stripe\Checkout\Session::create([
            'line_items' => [
                [
                    'price_data' => [
                        'currency' => 'aed',
                        'product_data' => [
                            'name' => 'AERO Agent CRM Monthly Subscription Charge',
                        ],
                        'unit_amount' => 100 * 200,
                    ],
                    'quantity' => 1,
                ],
            ],
            'mode' => 'payment',
            'success_url' => route('payment-confirmation'),
            'cancel_url' => route('renew-subscription'),
        ]);

        return Inertia::location($stripe_session->url);
    }

    public function paymentConfirmation(Request $request): Response
    {
        return $this->service->processPayment();
    }

    public function payThroughWallet()
    {
        return $this->service->payThroughWallet();
    }
}
