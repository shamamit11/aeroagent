<?php
namespace App\Services\Admin;
use App\Models\Wallet;
use Auth;

class WalletService
{
    function walletBalance($user_id) {
        try {
            $balance = Wallet::where('user_id', $user_id)->sum('amount');
            return $balance;
        }
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }

    function totalReferral($user_id) {
        try {
            $trans = Wallet::where([['user_id', $user_id], ['type', 'referral']])->get();
            $balance = $trans->sum('amount');
            return $balance;
        }
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }

    function totalPayout($user_id) {
        try {
            $trans = Wallet::where([['user_id', $user_id], ['type', 'payout']])->get();
            $balance = abs($trans->sum('amount'));
            return $balance;
        }
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }

    function totalRenewal($user_id) {
        try {
            $trans = Wallet::where([['user_id', $user_id], ['type', 'renewal']])->get();
            $balance = abs($trans->sum('amount'));
            return $balance;
        }
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }

    function wallet($user_id) {
        try {
            $data['results'] = Wallet::where('user_id', $user_id)->orderBy('created_at', 'desc')->get()
                ->transform(fn ($item) => [
                    'id'=> $item->id,
                    'date'=> $item->date,
                    'transaction_id'=> $item->transaction_id,
                    'type' => ucwords($item->type),
                    'amount' => $item->amount,
                    'note' => $item->note,
                ]);
            return $data;
        } 
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }

    function payout() {
        try {
            $user_id = Auth::user()->id;
            $data['results'] = Wallet::where([['user_id', $user_id], ['type', 'payout']])->orderBy('created_at', 'desc')->get()
                ->transform(fn ($item) => [
                    'id'=> $item->id,
                    'date'=> $item->date,
                    'transaction_id'=> $item->transaction_id,
                    'amount' => abs($item->amount),
                    'note' => $item->note,
                ]);
            return $data;
        } 
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }

    function renewal() {
        try {
            $user_id = Auth::user()->id;
            $data['results'] = Wallet::where([['user_id', $user_id], ['type', 'renewal']])->orderBy('created_at', 'desc')->get()
                ->transform(fn ($item) => [
                    'id'=> $item->id,
                    'date'=> $item->date,
                    'transaction_id'=> $item->transaction_id,
                    'amount' => abs($item->amount),
                    'note' => $item->note,
                ]);
            return $data;
        } 
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }
}
