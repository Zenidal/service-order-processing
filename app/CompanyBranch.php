<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

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
