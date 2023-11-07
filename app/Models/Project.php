<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use HasFactory;
    use LogsActivity;
    use SoftDeletes;

    protected $fillable = [
        'developer_id',
        'name',
        'image',
        'location_id',
        'view_style',
        'handover_date',
        'commission',
        'amenities_id',
        'project_status'
    ];

    public function developer() {
        return $this->belongsTo(Developer::class, 'developer_id', 'id');
    }

    public function location() {
        return $this->belongsTo(Location::class, 'location_id', 'id');
    }

    public function amenity() {
        return $this->belongsTo(Amenity::class, 'amenities_id', 'id');
    }

    public function detail() {
        return $this->hasMany(ProjectDetail::class, 'project_id', 'id');
    }

    public function docs() {
        return $this->hasMany(ProjectDoc::class, 'project_id', 'id');
    }

    public function getActivityLogOptions(): LogOptions
    {
        return LogOptions::defaults()->logOnly(['*']);
    }
}
