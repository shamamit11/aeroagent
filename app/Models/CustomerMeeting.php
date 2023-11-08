<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class CustomerMeeting extends Model
{
    use HasFactory;
    use LogsActivity;

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function customer() {
        return $this->belongsTo(Customer::class);
    }

    public function status() {
        return $this->belongsTo(Status::class);
    }

    public function getActivityLogOptions(): LogOptions
    {
        return LogOptions::defaults()->logOnly(['*']);
    }
}
