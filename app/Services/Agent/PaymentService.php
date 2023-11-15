<?php
namespace App\Services\Agent;

use App\Models\User;
use App\Models\UserReferral;
use App\Models\UserSubscription;
use App\Models\Wallet;
use Auth;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use Inertia\Inertia;

class PaymentService
{
    function index()
    {
        try {
            $user = Auth::user();
            $subscription = UserSubscription::where("user_id", $user->id)->first();
            return $subscription;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    function totalReferrals()
    {
        $user = Auth::user();
        $count = UserReferral::where('referral_code', $user->user_code)->count();
        return $count;
    }

    function lastThirtyDaysReferrals()
    {
        $user = Auth::user();
        $date = Carbon::today()->subDays(30);
        $count = UserReferral::where([['referral_code', $user->user_code], ['created_at', '>=', $date]])->count();
        return $count;
    }

    function totalReferralEarning()
    {
        try {
            $user_id = Auth::user()->id;
            $trans = Wallet::where([['user_id', $user_id], ['type', 'referral']])->get();
            $balance = $trans->sum('amount');
            return $balance;
        } 
        catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    function lastThirtyDaysEarning()
    {
        try {
            $user_id = Auth::user()->id;
            $date = Carbon::today()->subDays(30);
            $trans = Wallet::where([['user_id', $user_id], ['type', 'referral'], ['date', '>=', $date]])->get();
            $balance = $trans->sum('amount');
            return $balance;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    function processPayment()
    {
        try {
            $user = Auth::user();

            $subscription = UserSubscription::where('user_id', $user->id)->first();
            $subscription->next_renewal_date = Carbon::now()->addDays(30)->toDate();
            $subscription->next_payout_date = Carbon::now()->addDays(31)->toDate();
            $subscription->renewal_status = null;
            $subscription->save();

            //if user signed up with referral code
            $userReferral = UserReferral::where('user_id', $user->id)->first();
            if ($userReferral) {
                $refUser = User::where('user_code', $userReferral->referral_code)->first();
                $wallet = new Wallet;
                $wallet->user_id = $refUser->id;
                $wallet->transaction_id = Str::uuid();
                $wallet->date = date('Y-m-d');
                $wallet->type = 'referral';
                $wallet->amount = 100.00;
                $wallet->note = $user->first_name . " has renewed their subscription.";
                $wallet->save();
            }

            if ($user->role == "affiliate") {
                return Inertia::render('Affiliate/Payment/Confirmation');
            } 
            else {
                return Inertia::render('Agent/Payment/Confirmation');
            }
        } 
        catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    function payThroughWallet()
    {
        try {
            $user = Auth::user();

            $userReferral = UserReferral::where('user_id', $user->id)->first();
            if ($userReferral) {
                $refUser = User::where('user_code', $userReferral->referral_code)->first();
                $wallet = new Wallet;
                $wallet->user_id = $refUser->id;
                $wallet->transaction_id = Str::uuid();
                $wallet->date = date('Y-m-d');
                $wallet->type = 'referral';
                $wallet->amount = 100.00;
                $wallet->note = $user->first_name . " has renewed their subscription.";
                $wallet->save();
            }

            $subscription = UserSubscription::where('user_id', $user->id)->first();
            $subscription->next_renewal_date = Carbon::now()->addDays(30)->toDate();
            $subscription->next_payout_date = Carbon::now()->addDays(31)->toDate();
            $subscription->renewal_status = null;
            $subscription->save();

            $wallet = new Wallet;
            $wallet->user_id = $user->id;
            $wallet->transaction_id = Str::uuid();
            $wallet->date = date('Y-m-d');
            $wallet->type = 'renewal';
            $wallet->amount = -200.00;
            $wallet->note = "Paid for Renewal";
            $wallet->save();

            return redirect(route('/'));
        } 
        catch (\Exception $e) {
            return $e->getMessage();
        }
    }
}
