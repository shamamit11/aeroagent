<?php
namespace App\Services\Admin;

use App\Models\User;
use Auth;
use Hash;
use Illuminate\Support\Facades\Storage;
use App\Traits\StoreImageTrait;

class SettingService
{
    use StoreImageTrait;
    function profile()
    {
        try {
            $user = Auth::user();

            if ($user->image) {
                $user->image_path = asset('/storage/' . $user->user_code . '/' . $user->image);
            }

            return $user;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    function updateProfile($request)
    {
        try {

            $user = Auth::user();
            $user->first_name = $request['first_name'];
            $user->last_name = $request['last_name'];

            if ($request['upload_image']) {
                if ($user->image) {
                    Storage::disk('public')->delete('/' . $user->user_code . '/' . $user->image);
                    $user->image = '';
                    $user->save();
                }
                $image = $this->StoreImage($request['upload_image'], '/' . $user->user_code . '/');
            } else {
                $image = ($user) ? $user->image : '';
            }

            $user->image = $image;
            $user->save();
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    public function updatePassword($request)
    {
        if (Hash::check($request['old_password'], Auth::user()->password)) {
            $id = Auth::user()->id;
            $user = User::findOrFail($id);
            $user->password = Hash::make($request['new_password']);
            $user->save();
            $message = "success";
            return $message;
        } else {
            $message = "error";
            return $message;
        }
    }
}