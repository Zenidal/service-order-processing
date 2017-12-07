<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    /**
     * @var string
     */
    protected $exactAddress;

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
