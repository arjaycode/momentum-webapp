<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Habit extends Model
{
    //
    protected $fillable = [
        'user_id',
        'category_id',
        'name',
        'description',
        'enable_push_notifications',
        'target_days'
    ];
}
