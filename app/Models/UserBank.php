<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class UserBank extends Model
{
    use HasFactory;
    use LogsActivity;

    protected $fillable = [
        'bank_name',
        'account_name',
        'account_no',
        'iban'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function getActivityLogOptions(): LogOptions
    {
        return LogOptions::defaults()->logOnly(['*']);
    }
}
