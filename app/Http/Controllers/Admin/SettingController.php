<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ChangePasswordRequest;
use App\Http\Requests\Admin\ProfileRequest;
use App\Services\Admin\SettingService;
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
        return Inertia::render('Admin/Setting/Index', $data);
    }

    public function updateProfile(ProfileRequest $request)
    {
        return $this->service->updateProfile($request->validated());
    }

    public function updatePassword(ChangePasswordRequest $request)
    {
        $res = $this->service->updatePassword($request->validated());

        if($res == 'success'){
            return Inertia::render('Admin/Setting/Index')->with('success','Password changed successfully!');
        }
        else {
            return Inertia::render('Admin/Setting/Index')->with('error','Old Password does not match!');
        }
    }
}
