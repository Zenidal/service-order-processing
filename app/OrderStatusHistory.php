<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderStatusHistory extends Model
{
    protected $with = ['order', 'user'];

    protected $appends = ['fromStatusName', 'toStatusName'];

    public function order()
    {
        return $this->belongsTo('App\Order');
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function getFromStatusNameAttribute()
    {
        return $this->getStatusName($this->attributes['from_status']);
    }

    public function getToStatusNameAttribute()
    {
        return $this->getStatusName($this->attributes['to_status']);
    }

    private function getStatusName($status)
    {
        switch ($status) {
            case 1:
                return 'Opened';
            case 2:
                return 'Assigned';
            case 3:
                return 'In progress';
            case 4:
                return 'Resolved';
            case 5:
                return 'Closed';
            case 6:
                return 'Reopened';
            default:
                return '';
        }
    }
}
