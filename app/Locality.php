<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Locality
 *
 * @property int $id
 * @property string $name
 * @property string $type
 * @property int $country_id
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \App\Country $country
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Locality whereCountryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Locality whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Locality whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Locality whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Locality whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Locality whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Address[] $addresses
 */
class Locality extends Model
{
    protected $with = ['country'];

    public function country()
    {
        return $this->belongsTo('App\Country');
    }

    public function addresses()
    {
        return $this->hasMany('App\Address');
    }
}
