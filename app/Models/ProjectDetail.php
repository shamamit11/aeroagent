<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class ProjectDetail extends Model
{
    use HasFactory;
    use LogsActivity;

    protected $fillable = [
        'project_id',
        'property_id',
        'property_type_id',
        'total_units',
        'size_from',
        'size_to',
        'price_from',
        'price_to'
    ];

    public function project() {
        return $this->belongsTo(Project::class, 'project_id', 'id');
    }

    public function property() {
        return $this->belongsTo(Property::class, 'property_id', 'id');
    }

    public function propertyType() {
        return $this->belongsTo(PropertyType::class, 'property_type_id', 'id');
    }

    public function getActivityLogOptions(): LogOptions
    {
        return LogOptions::defaults()->logOnly(['*']);
    }
}
