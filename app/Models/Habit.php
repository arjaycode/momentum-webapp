<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Habit extends Model
{
<<<<<<< HEAD
=======
    //
>>>>>>> 7919d9eff6e3c7786d104ba820173a4c9e55a1b8
    protected $fillable = [
        'user_id',
        'category_id',
        'name',
        'description',
        'enable_push_notifications',
<<<<<<< HEAD
        'target_days',
    ];

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
=======
        'target_days'
    ];
>>>>>>> 7919d9eff6e3c7786d104ba820173a4c9e55a1b8
}
