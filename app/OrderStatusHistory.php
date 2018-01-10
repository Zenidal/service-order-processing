<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\OrderStatusHistory
 *
 * @property int $id
 * @property int $order_id
 * @property int $user_id
 * @property string $from_status
 * @property string $to_status
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property string $company
 * @property-read \App\CompanyBranch $companyBranch
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereCompanyBranchId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property string|null $comment
 * @property-read mixed $from_status_name
 * @property-read mixed $to_status_name
 * @property-read \App\Order $order
 * @property-read \App\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\OrderStatusHistory whereComment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\OrderStatusHistory whereFromStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\OrderStatusHistory whereOrderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\OrderStatusHistory whereToStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\OrderStatusHistory whereUserId($value)
 */
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
