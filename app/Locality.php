<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Locality extends Model
{
    /**
     * @var string
     */
    protected $name;

    /**
     * @var string
     * type of administrative unit (town. city, village, ...)
     */
    protected $type;

    public function country()
    {
        return $this->belongsTo('App\Country');
    }

    /**
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * @param string $type
     */
    public function setType($type)
    {
        $this->type = $type;
    }
}
