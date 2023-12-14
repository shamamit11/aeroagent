<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserReferral;
use App\Models\UserSubscription;
use App\Models\Wallet;
use Illuminate\Support\Carbon;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    public function stripeSession(Request $request) {

        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'profession' => 'required',
            'mobile' => 'required',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'referral_code' =>'nullable|exists:users,user_code',
            'terms' => 'required'
        ]);

        session([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'profession' => $request->profession,
            'mobile' => $request->mobile,
            'email' => $request->email,
            'password' => $request->password,
            'referral_code' => $request->referral_code
        ]);

        \Stripe\Stripe::setApiKey(config('stripe.sk'));

        $stripe_session = \Stripe\Checkout\Session::create([
            'line_items'  => [
                [
                    'price_data' => [
                        'currency'     => 'aed',
                        'product_data' => [
                            'name' => 'AERO Agent CRM Monthly Subscription Charge',
                        ],
                        'unit_amount'  => 100 * 200,
                    ],
                    'quantity'   => 1,
                ],
            ],
            'mode'        => 'payment',
            'success_url' => route('register.payment-confirmation'),
            'cancel_url'  => route('register'),
        ]);

        $data['stripe_url'] = $stripe_session->url;
        return Inertia::render('Auth/Register', $data);
    }

    public function paymentConfirmation(Request $request): Response {

        $full_name = session('first_name') . ' ' . session('last_name');
        $initial = generateInitial($full_name);
        $usercode = generateUserCode($initial);

        $uuid = Str::uuid();

        $profession = session('profession');

        if($profession == 'Affiliate') {
            $role = 'affiliate';
        } else {
            $role = 'agent';
        }

        $user = User::create([
            'user_code' => $usercode,
            'role' => $role,
            'profession' => session('profession'),
            'first_name' => session('first_name'),
            'last_name' => session('last_name'),
            'mobile' => session('mobile'),
            'email' => session('email'),
            'password' => Hash::make(session('password')),
            'cc_transaction_id'  => $uuid,
            'status' => 1
        ]);

        $referral_code = session('referral_code');
        $date = date('Y-m-d');

        if($referral_code) {
            $referral = new UserReferral;
            $referral->user_id = $user->id;
            $referral->referral_code = $referral_code;
            $referral->save();

            $refUser = User::where('user_code', $referral_code)->first();
            $wallet = new Wallet;
            $wallet->user_id = $refUser->id;
            $wallet->transaction_id = Str::uuid();
            $wallet->date = $date;
            $wallet->type = 'referral';
            $wallet->amount = 100.00;
            $wallet->note = session('first_name') . " Subscribed with your Referral Code";
            $wallet->save();
        }

        $subscription = new UserSubscription;
        $subscription->user_id = $user->id;
        $subscription->subscription_date = Carbon::now()->toDate();
        $subscription->next_renewal_date = Carbon::now()->addDays(30)->toDate();
        $subscription->next_payout_date = Carbon::now()->addDays(31)->toDate();
        $subscription->renewal_status = null;
        $subscription->save();

        event(new Registered($user));

        $request->session()->flush();
        
        return Inertia::render('Auth/PaymentConfirmation');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $full_name = $request->first_name . ' ' . $request->last_name;
        $initial = generateInitial($full_name);
        $usercode = generateUserCode($initial);

        $uuid = Str::uuid();

        $profession = $request->profession;

        if($profession == 'Affiliate') {
            $role = 'affiliate';
        } else {
            $role = 'agent';
        }

        $user = User::create([
            'user_code' => $usercode,
            'role' => $role,
            'profession' => $request->profession,
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'mobile' => $request->mobile,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'cc_transaction_id'  => $uuid,
            'status' => 1
        ]);

        $referral_code = $request->referral_code;
        $date = date('Y-m-d');

        if($referral_code) {
            $referral = new UserReferral;
            $referral->user_id = $user->id;
            $referral->referral_code = $referral_code;
            $referral->save();

            $refUser = User::where('user_code', $referral_code)->first();
            $wallet = new Wallet;
            $wallet->user_id = $refUser->id;
            $wallet->transaction_id = Str::uuid();
            $wallet->date = $date;
            $wallet->type = 'referral';
            $wallet->amount = 100.00;
            $wallet->note = $request->first_name . " Subscribed with your Referral Code";
            $wallet->save();
        }

        $subscription = new UserSubscription;
        $subscription->user_id = $user->id;
        $subscription->subscription_date = Carbon::now()->toDate();
        $subscription->next_renewal_date = Carbon::now()->addDays(30)->toDate();
        $subscription->next_payout_date = Carbon::now()->addDays(31)->toDate();
        $subscription->renewal_status = null;
        $subscription->save();

        event(new Registered($user));
        return Inertia::render('Auth/Login');
    }
}
