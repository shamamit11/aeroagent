<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserSubscription;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Carbon;

class AdminDashboardController extends Controller
{
    public function index(): Response
    {
        $data['agents'] = User::where('role', 'agent')->count();
        $data['affiliate'] = User::where('role', 'affiliate')->count();

        $endDate = Carbon::today();
        $data['payout'] = UserSubscription::whereDate('next_payout_date', $endDate)->count();

        return Inertia::render('Admin/Dashboard/Index', $data);
    }
}
