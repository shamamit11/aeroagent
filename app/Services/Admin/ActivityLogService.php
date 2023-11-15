<?php
namespace App\Services\Admin;

use Illuminate\Support\Str;
use Spatie\Activitylog\Models\Activity;
class ActivityLogService
{
    function index() {
        $data['results'] = Activity::orderBy('updated_at', 'desc')->get()
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