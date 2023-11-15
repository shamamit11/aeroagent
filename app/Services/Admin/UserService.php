<?php
namespace App\Services\Admin;

use App\Models\User;
use App\Models\UserSubscription;
use Hash;
use Illuminate\Support\Carbon;
use Illuminate\Auth\Events\Registered;

class UserService
{
    function list()
    {
        try {
            $amenities = User::where('role', '<>', 'admin')->get()
                ->transform(fn($item) => [
                    'id' => $item->id,
                    'name' => $item->first_name . " " . $item->last_name,
                    'mobile' => $item->mobile,
                    'email' => $item->email,
                    'status' => ($item->status == 1) ? "Active" : "Inactive",
                    'status_color' => ($item->status == 1) ? "#00ff4c" : "#fd4444",
                    'role' => ucwords($item->role),
                    'profession' => ucwords($item->profession),
                    'created_at' => $item->created_at->format('Y-m-d H:i:s'),
                ]);

            return [
                "results" => $amenities
            ];
        } catch (\Exception $e) {
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }

    public function store($request)
    {

        try {
            $full_name = $request["first_name"] . ' ' . $request["last_name"];
            $initial = generateInitial($full_name);
            $usercode = generateUserCode($initial);

            $profession = $request["profession"];

            if ($profession == 'Affiliate') {
                $role = 'affiliate';
            } 
            else {
                $role = 'agent';
            }

            $user = User::create([
                'user_code' => $usercode,
                'role' => $role,
                'profession' => $profession,
                'first_name' => $request["first_name"],
                'last_name' => $request["last_name"],
                'mobile' => $request["mobile"],
                'email' => $request["email"],
                'password' => Hash::make($request["password"]),
                'cc_transaction_id'  => null,
                'status' => 1
            ]);

            $subscription = new UserSubscription;
            $subscription->user_id = $user->id;
            $subscription->subscription_date = Carbon::now()->toDate();
            $subscription->next_renewal_date = Carbon::now()->addDays(30)->toDate();
            $subscription->next_payout_date = Carbon::now()->addDays(31)->toDate();
            $subscription->renewal_status = null;
            $subscription->save();

            event(new Registered($user));

        } 
        catch (\Exception $e) {
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }

    public function delete($request)
    {
        try {
            $id = $request->id;
            $amenity = User::findOrFail($id);
            $amenity->delete();
        } catch (\Exception $e) {
            return response()->json(['errors' => $e->getMessage()], 400);
        }
    }
}
