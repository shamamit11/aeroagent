<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Illuminate\Database\Eloquent\SoftDeletes;

class Feed extends Model
{
    use HasFactory;
    use LogsActivity;
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'looking_for',
        'property_id',
        'property_type_id',
        'market',
        'project_id',
        'location',
        'property_size',
        'budget',
        'time_to_close',
        'note'
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function property() {
        return $this->belongsTo(Property::class);
    }

    public function propertyType() {
        return $this->belongsTo(PropertyType::class);
    }

    public function project() {
        return $this->belongsTo(Project::class);
    }

    public function getActivityLogOptions(): LogOptions
    {
        return LogOptions::defaults()->logOnly(['*']);
    }
}
