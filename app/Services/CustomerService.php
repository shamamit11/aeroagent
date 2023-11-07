<?php
namespace App\Services;
use App\Models\Customer;
use Auth;

class CustomerService
{
    function list() {
        try {
            $user_id = Auth::user()->id;
            $customers = Customer::where('user_id', $user_id)->whereNull('deleted_at')->get();
            return [
                "results" => $customers
            ];
        } 
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }

    function show($id) {
        try {
            $exists = Customer::where("id", $id)->exists();
            if ($exists) {
                $customer = Customer::where('id', $id)->first();
                return $customer;
            }
            else {
                return null;
            }
        }
        catch (\Exception$e) {
            return $e->getMessage();
        }

    }

    public function store($request)
    {
        try {
            if ($request['id']) {
                $id = $request['id'];
                $customer = Customer::findOrFail($id);
            } 
            else {
                $id = 0;
                $customer = new Customer;
                $customer->user_id = Auth::user()->id;
            }
            $customer->name = $request['name'];
            $customer->email = $request['email'];
            $customer->mobile = $request['mobile'];
            $customer->nationality = $request['nationality'];
            $customer->save();
        } 
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }

    public function delete($request)
    {
        try {
            $id = $request->id;
            $customer = Customer::findOrFail($id);
            $customer->delete();
        } 
        catch (\Exception$e) {
            return $e->getMessage();
        }
    }
}
