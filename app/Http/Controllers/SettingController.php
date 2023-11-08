<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\BankRequest;
use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\ProfileRequest;
use App\Services\SettingService;
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
        return Inertia::render('Setting/Index', $data);
    }

    public function updateProfile(ProfileRequest $request)
    {
        return $this->service->updateProfile($request->validated());
    }

    public function updatePassword(ChangePasswordRequest $request)
    {
        $res = $this->service->updatePassword($request->validated());
        if($res == 'success'){
            return Inertia::render('Setting/Index')->with('success','Password changed successfully!');
        }
        else {
            return Inertia::render('Setting/Index')->with('error','Old Password does not match!');
        }
    }

    public function updateBank(BankRequest $request)
    {
        return $this->service->updateBank($request->validated());
    }
}
