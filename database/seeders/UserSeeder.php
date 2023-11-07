<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (User::where('email', 'aksharma2041@gmail.com')->doesntExist()) {
            $user = new User;
            $user->user_code = 'AS1002';
            $user->role = 'agent';
            $user->first_name = 'Amit';
            $user->last_name = 'Sharma';
            $user->mobile = '+971503458335';
            $user->email = 'aksharma2041@gmail.com';
            $user->email_verified_at = now();
            $user->password = Hash::make('12345678');
            $user->image = '';
            $user->status = 1;
            $user->save();
        }
    }
}