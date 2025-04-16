<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class personaje extends Model
{
    protected $table = 'personajes';

    protected $primaryKey = 'id';

    public $timestamps = false;

    protected $fillable = [
        'name',
        'status',
        'species',
        'image',
        'type',
        'gender',
    ];

    public function origin()
    {
        return $this->hasOne(Origin::class, 'id', 'id');
    }
}
