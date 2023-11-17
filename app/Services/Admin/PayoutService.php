<?php
namespace App\Services\Admin;

use App\Models\UserBank;
use App\Models\UserPayout;
use App\Models\UserSubscription;
use App\Models\Wallet;
use Illuminate\Support\Carbon;

class PayoutService
{
    function index($startDate, $endDate)
    {
        try {
            $recordsForToday = UserSubscription::whereDate('next_payout_date', $endDate)->get();

            foreach($recordsForToday as $record) {
                $userBankObj = UserBank::where('user_id', $record->user_id)->first();
                if($userBankObj) {
                    $record->iban = $userBankObj->iban; 
                }

                $walletAmount = Wallet::where('user_id', $record->user_id)->whereBetween('date', [$startDate, $endDate])->sum('amount');
                $record->wallet_balance = $walletAmount; 

                $payoutObj = UserPayout::where('user_id', $record->user_id)->whereDate('payout_date', $endDate)->first();
                
                if($payoutObj) {
                    $record->payout_status = $payoutObj->payout_status;
                }
            }

            $recordsForToday->transform(fn($item) => [
                'id' => $item->id,
                'user_id' => $item->user_id,
                'name' => $item->user->first_name . " " . $item->user->last_name,
                'status' => $item->payout_status ? ucwords($item->payout_status) : "Not Paid",
                'status_color' => $item->payout_status ? "#00ff4c" : "#fd4444",
                'iban' => $item->iban ? $item->iban : 'NA',
                'wallet_balance' => $item->wallet_balance,
                'start_date' => $startDate->format('Y-m-d H:i:s'),
                'end_date' => $endDate->format('Y-m-d H:i:s'),
                'pay_date_from' => $startDate->format('Y/m/d'),
                'pay_date_to' => $endDate->format('Y/m/d'),
                'next_payout_date' => $item->next_payout_date
            ]);

            return [
                "results" => $recordsForToday
            ];
        } catch (\Exception $e) {
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }

    public function store($request)
    {
        try {
            $payout = new UserPayout;
            $payout->user_id = $request->user_id;
            $payout->payout_date = $request->next_payout_date;
            $payout->amount = $request->wallet_balance;
            $payout->payout_status = "paid";
            $payout->payout_date_from = $request->start_date;
            $payout->payout_date_to = $request->end_date;
            $payout->save();
        } 
        catch (\Exception $e) {
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }

    public function listPayouts() {
        try {
            $payouts = UserPayout::orderByDesc('created_at')->get();

            $payouts->transform(fn($item) => [
                'id' => $item->id,
                'user_id' => $item->user_id,
                'name' => $item->user->first_name . " " . $item->user->last_name,
                'payout_date' => $item->payout_date,
                'amount' => $item->amount,
                'status' => $item->payout_status ? ucwords($item->payout_status) : "Not Paid",
                'status_color' => $item->payout_status ? "#00ff4c" : "#fd4444",
                'payout_date_from' => $item->payout_date_from ? Carbon::parse($item->payout_date_from)->format('Y/m/d') : " ",
                'payout_date_to' => $item->payout_date_to ? Carbon::parse($item->payout_date_to)->format('Y/m/d') : " ",
            ]);

            $data['results'] = $payouts;
            return $data;
        }
        catch (\Exception $e) {
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }
}
