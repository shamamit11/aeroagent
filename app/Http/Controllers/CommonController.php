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
        else {
            return redirect()->route("dashboard");
        }
    }
}
