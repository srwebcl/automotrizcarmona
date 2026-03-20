<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VehicleVersion extends Model
{
    protected $fillable = [
        'vehicle_model_id', 'name', 'transmission', 'traction', 'fuel', 'list_price', 'bonus_price'
    ];

    protected $casts = [
        'list_price' => 'decimal:2',
        'bonus_price' => 'decimal:2',
    ];

    public function vehicleModel(): BelongsTo
    {
        return $this->belongsTo(VehicleModel::class);
    }
}
