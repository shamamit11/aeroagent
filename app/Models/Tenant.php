<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tenant extends Model
{
    use HasFactory;
    use LogsActivity;
    use SoftDeletes;

    protected $fillable = [
        'customer_id',
        'property_id',
        'property_type_id',
        'property_amenities',
        'property_size',
        'budget',
        'time_to_close',
        'note',
        'request_type',
        'source_id'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function customer() {
        return $this->belongsTo(Customer::class);
    }

    public function property() {
        return $this->belongsTo(Property::class);
    }

    public function propertyType() {
        return $this->belongsTo(PropertyType::class);
    }

    public function getActivityLogOptions(): LogOptions
    {
        return LogOptions::defaults()->logOnly(['*']);
    }
}
