<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HabitsCategory extends Model
{
    protected $fillable = [
        'title',
        'description',
        'status',
        'color',
        'icon'
    ];
}
