<?php
namespace App\Services;
use App\Models\Wallet;
use Auth;

class WalletService
{
    function index() {
        try {
            $user_id = Auth::user()->id;
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

    function walletBalance() {
        try {
            $user_id = Auth::user()->id;
            $balance = Wallet::where('user_id', $user_id)->sum('amount');
            return $balance;
        }
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }

    function totalReferral() {
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

    function totalPayout() {
        try {
            $user_id = Auth::user()->id;
            $trans = Wallet::where([['user_id', $user_id], ['type', 'payout']])->get();
            $balance = abs($trans->sum('amount'));
            return $balance;
        }
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }

    function totalRenewal() {
        try {
            $user_id = Auth::user()->id;
            $trans = Wallet::where([['user_id', $user_id], ['type', 'renewal']])->get();
            $balance = abs($trans->sum('amount'));
            return $balance;
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
