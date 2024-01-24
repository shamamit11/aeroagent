<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (User::where('email', 'aeracapital001@gmail.com')->doesntExist()) {
            $user = new User;
            $user->user_code = 'AS1001';
            $user->role = 'admin';
            $user->first_name = 'Aero';
            $user->last_name = 'Admin';
            $user->mobile = '+971503458335';
            $user->email = 'aeracapital001@gmail.com';
            $user->email_verified_at = now();
            $user->password = Hash::make('12345678');
            $user->image = '';
            $user->status = 1;
            $user->save();
        }
    }
}