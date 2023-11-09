<?php

namespace App\Http\Middleware;

use App\Models\User;
use App\Models\UserSubscription;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;


class CheckSubscription
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(Auth::check()){
            $user_id = Auth::user()->id;
            $user = User::where([["id", $user_id], ["role", "<>", "admin"]])->first();

            if($user){
                $subscription = UserSubscription::where([["user_id", $user->id], ])->first();
                $renewal_date = Carbon::parse($subscription->next_renewal_date);
                $now = Carbon::now()->toDate();
                $diff = $renewal_date->diffInDays($now);
    
                if($diff < 0){
                    return redirect()->route('payment.page');
                }
            }
        }
        return $next($request);
    }
}
