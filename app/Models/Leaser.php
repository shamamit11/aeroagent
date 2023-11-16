<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Illuminate\Database\Eloquent\SoftDeletes;

class Leaser extends Model
{
    use HasFactory;
    use LogsActivity;
    use SoftDeletes;

    protected $fillable = [
        'customer_id',
        'location_id',
        'property_id',
        'property_type_id',
        'building_name',
        'view_style',
        'property_amenities',
        'property_size',
        'rent_price',
        'rent_index',
        'noc_status',
        'is_furnished',
        'commission_type',
        'commission',
        'ad_link',
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

    public function location() {
        return $this->belongsTo(Location::class);
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
