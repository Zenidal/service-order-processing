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
 */
class Order extends Model
{
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

    /**
     * @return string
     */
    public function getStatus()
    {
        return $this->attributes['status'];
    }

    /**
     * @param string $status
     */
    public function setStatus($status)
    {
        $this->attributes['status'] = $status;
    }

    /**
     * @return string
     */
    public function getDescription()
    {
        return $this->attributes['description'];
    }

    /**
     * @param string $description
     */
    public function setDescription($description)
    {
        $this->attributes['description'] = $description;
    }
}
