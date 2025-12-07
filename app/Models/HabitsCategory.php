<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class HabitsCategory extends Model
{
    protected $fillable = [
        'title',
        'description',
        'status',
        'color',
        'icon'
    ];

    public function habits(): HasMany
    {
        return $this->hasMany(Habit::class, 'category_id');
    }
}
