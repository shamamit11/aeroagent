<?php
namespace App\Services\Agent;
use App\Models\UserReferral;
use App\Models\Wallet;
use Auth;
use Illuminate\Support\Carbon;

class ReferralService
{
    function index() {
        try {
            $user = Auth::user();
            $data['results'] = UserReferral::where('referral_code', $user->user_code)->orderBy('created_at', 'desc')->with('user')->get()
                ->transform(fn ($item) => [
                    'id'=> $item->id,
                    'date'=> date('D, d M, Y, h:i A', strtotime($item->created_at)),
                    'name' => $item->user->first_name . " " . $item->user->last_name,
                ]);
            return $data;
        } 
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }

    function totalReferrals() {
        $user = Auth::user();
        $count = UserReferral::where('referral_code', $user->user_code)->count();
        return $count;
    }

    function lastThirtyDaysReferrals() {
        $user = Auth::user();
        $date = Carbon::today()->subDays(30);
        $count = UserReferral::where([['referral_code', $user->user_code], ['created_at', '>=', $date]])->count();
        return $count;
    }

    function totalReferralEarning() {
        try {
            $user_id = Auth::user()->id;
            $trans = Wallet::where([['user_id', $user_id], ['type', 'referral']])->get();
            $balance = $trans->sum('amount');
            return $balance;
        }
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }

    function lastThirtyDaysEarning() {
        try {
            $user_id = Auth::user()->id;
            $date = Carbon::today()->subDays(30);
            $trans = Wallet::where([['user_id', $user_id], ['type', 'referral'], ['date', '>=', $date]])->get();
            $balance = $trans->sum('amount');
            return $balance;
        }
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }
}
