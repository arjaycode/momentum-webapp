<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Note extends Model
{
    //
    protected $fillable = [
        'habit_id',
        'message',
        'color', // Added
        'icon',  // Added
    ];

    public function habit(): BelongsTo
    {
        return $this->belongsTo(Habit::class);
    }
}
