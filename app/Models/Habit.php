<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Habit extends Model
{
    // Map 'name' attribute to 'habit_name' column
    protected $table = 'habits';
    
    // The $fillable array is correctly defined
    protected $fillable = [
        'user_id',
        'category_id',
        'habit_name',
        'description',
        'enable_push_notifications',

        'target_days',
    ];

    // Accessor and mutator for 'name' attribute
    public function getNameAttribute()
    {
        return $this->attributes['habit_name'] ?? null;
    }

    public function setNameAttribute($value)
    {
        $this->attributes['habit_name'] = $value;
    }

    // The $casts array is correctly defined
    protected $casts = [
        'enable_push_notifications' => 'boolean',
        'target_days' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(HabitsCategory::class, 'category_id');
    }

    public function logs(): HasMany
    {
        return $this->hasMany(HabitLog::class);
    }

    // *** The lines causing the error have been removed ***
}