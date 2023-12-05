<?php

namespace App\Http\Controllers;

use Auth;

class CommonController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if ($user->role == "admin") {
            return redirect()->route("admin.dashboard");
        }
        else if ($user->role == "agent") {
            return redirect()->route("dashboard");
        }
        else {
            return redirect()->route("wallet.dashboard");
        }
    }

    public function changeLocale($locale)
    {
        Session()->put('locale', $locale);
    }
}
