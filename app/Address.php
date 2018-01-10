<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Address
 *
 * @property int $id
 * @property string $exact_address
 * @property int $locality_id
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \App\CompanyBranch $companyBranch
 * @property-read \App\Locality $locality
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Address whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Address whereExactAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Address whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Address whereLocalityId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Address whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Address extends Model
{
    protected $with = ['locality'];

    /**
     * Get the branch located at this address.
     */
    public function companyBranch()
    {
        return $this->hasOne("App\CompanyBranch");
    }

    /**
     * Get locality.
     */
    public function locality()
    {
        return $this->belongsTo('App\Locality');
    }
}
