<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class UserRoleMiddleware
{
    public function handle($request, Closure $next, ...$roles)
    {
        // Check if the user's role matches any of the allowed roles
        if (in_array(Auth::user()->role, $roles)) {
            return $next($request);
        }
        
        // Return a forbidden response if the user does not have the required role
        return abort(403, 'Unauthorized action.');
    }
}