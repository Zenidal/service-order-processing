<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Country
 *
 * @property int $id
 * @property string $name
 * @property string|null $iso_code
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Locality[] $localities
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Country whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Country whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Country whereIsoCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Country whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Country whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Country extends Model
{
    /**
     * Get all country localities.
     */
    public function localities()
    {
        return $this->hasMany('App\Locality');
    }
}
