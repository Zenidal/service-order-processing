<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Role
 *
 * @property int $id
 * @property string $name
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\User[] $users
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Role whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Role whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Role whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Role whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Role extends Model
{
    const CUSTOMER_ROLE = 'customer';
    const ENGINEER_ROLE = 'engineer';
    const MANAGER_ROLE = 'manager';

    /**
     * Get the users for the role.
     */
    public function users()
    {
        return $this->hasMany('App\User');
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

    public function isCustomer()
    {
        return $this->getName() === Role::CUSTOMER_ROLE;
    }

    public function isEngineer()
    {
        return $this->getName() === Role::ENGINEER_ROLE;
    }

    public function isManager()
    {
        return $this->getName() === Role::MANAGER_ROLE;
    }
}
