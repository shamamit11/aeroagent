<?php

namespace App\Http\Controllers\Agent;

use App\Http\Controllers\Controller;
use App\Http\Requests\Agent\BankRequest;
use App\Http\Requests\Agent\ChangePasswordRequest;
use App\Http\Requests\Agent\ProfileRequest;
use App\Services\Agent\SettingService;
use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    protected $service;
    public function __construct(SettingService $SettingService)
    {
        $this->service = $SettingService;
    }
    public function index(Request $request): Response
    {
        $data["profile"] = $this->service->profile();
        $data["bank"] = $this->service->bank();

        $user = Auth::user();
        if($user->role == "affiliate") {
            return Inertia::render('Affiliate/Setting/Index', $data);
        }
        else {
            return Inertia::render('Agent/Setting/Index', $data);
        }
    }

    public function updateProfile(ProfileRequest $request)
    {
        return $this->service->updateProfile($request->validated());
    }

    public function updatePassword(ChangePasswordRequest $request)
    {
        $res = $this->service->updatePassword($request->validated());

        $user = Auth::user();
        

        if($res == 'success'){
            if($user->role == "affiliate") {
                return Inertia::render('Affiliate/Setting/Index')->with('success','Password changed successfully!');
            }
            else {
                return Inertia::render('Agent/Setting/Index')->with('success','Password changed successfully!');
            }
        }
        else {
            if($user->role == "affiliate") {
                return Inertia::render('Affiliate/Setting/Index')->with('error','Old Password does not match!');
            }
            else {
                return Inertia::render('Agent/Setting/Index')->with('error','Old Password does not match!');
            }
        }
    }

    public function updateBank(BankRequest $request)
    {
        return $this->service->updateBank($request->validated());
    }
}
