<?php
namespace App\Services;

use Auth;
use Illuminate\Support\Str;
use Spatie\Activitylog\Models\Activity;
class ActivityLogService
{
    function index() {
        $user_id = Auth::user()->id;
        $data['results'] = Activity::where('causer_id', $user_id)->orderBy('updated_at', 'desc')->get()
            ->transform(fn ($item) => [
                'id'=> $item->id,
                'created_at'=> date('D, d M, Y, h:i A', strtotime($item->created_at)),
                'updated_at'=> date('D, d M, Y, h:i A', strtotime($item->updated_at)),
                'event'=> ucfirst($item->event),
                'properties' => Str::limit($item->properties, 110),
                'all_properties' => json_encode(json_decode($item->properties), JSON_PRETTY_PRINT)
            ]);

        return $data;
    }
}