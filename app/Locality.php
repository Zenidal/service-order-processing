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
 */
class Locality extends Model
{
    public function country()
    {
        return $this->belongsTo('App\Country');
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->attributes['name'];
    }

    /**
     * @param string $name
     */
    public function setName($name)
    {
        $this->attributes['name'] = $name;
    }

    /**
     * @return string
     */
    public function getType()
    {
        return $this->attributes['type'];
    }

    /**
     * @param string $type
     */
    public function setType($type)
    {
        $this->attributes['type'] = $type;
    }
}
