<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Order
 *
 * @property int $id
 * @property string $status
 * @property string $description
 * @property int $company_branch_id
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \App\CompanyBranch $companyBranch
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereCompanyBranchId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property int|null $engineer_id
 * @property int $owner_id
 * @property-read \App\User|null $engineer
 * @property-read mixed $status_name
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\OrderStatusHistory[] $orderStatusHistories
 * @property-read \App\User $owner
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereEngineerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Order whereOwnerId($value)
 */
class Order extends Model
{
    protected $with = ['companyBranch', 'engineer', 'owner'];

    protected $appends = ['statusName'];

    /**
     * Get branch of the company, where equipment where broken
     */
    public function companyBranch()
    {
        return $this->belongsTo('App\CompanyBranch');
    }

    /**
     * Get assigned to order engineer.
     */
    public function engineer()
    {
        return $this->belongsTo('App\User');
    }

    /**
     * Get assigned to order owner.
     */
    public function owner()
    {
        return $this->belongsTo('App\User');
    }

    /**
     * Get order status change histories.
     */
    public function orderStatusHistories()
    {
        return $this->hasMany('App\OrderStatusHistory');
    }

    public function getStatusNameAttribute()
    {
        switch ($this->attributes['status']) {
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
