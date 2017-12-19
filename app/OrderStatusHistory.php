<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderStatusHistory extends Model
{
    protected $with = ['order', 'user'];

    public function order()
    {
        return $this->belongsTo('App\Order');
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
