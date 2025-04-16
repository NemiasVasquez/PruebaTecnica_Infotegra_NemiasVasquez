<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class origin extends Model
{
    protected $table = 'origins';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'name',
        'url',
    ];

}
