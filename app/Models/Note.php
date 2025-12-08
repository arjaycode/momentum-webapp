<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Note extends Model
{
    protected $fillable = [
        'user_id',
        'habit_id',
        'message',
    ];

    /**
     * Define the relationship to the User model.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    
    /**
     * Define the relationship to the Habit model.
     */
    public function habit(): BelongsTo
    {
        return $this->belongsTo(Habit::class);
    }
}