<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\CompanyBranch
 *
 * @property int $id
 * @property int $company_id
 * @property int $address_id
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \App\Address $address
 * @property-read \App\Company $company
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Order[] $orders
 * @method static \Illuminate\Database\Eloquent\Builder|\App\CompanyBranch whereAddressId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\CompanyBranch whereCompanyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\CompanyBranch whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\CompanyBranch whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\CompanyBranch whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class CompanyBranch extends Model
{
    /**
     * Get exact address of company branch.
     */
    public function address()
    {
        return $this->belongsTo('App\Address');
    }

    /**
     * Get company.
     */
    public function company()
    {
        return $this->belongsTo('App\Company');
    }

    /**
     * Get all related to company branch orders.
     */
    public function orders()
    {
        return $this->hasMany('App\Order');
    }
}
