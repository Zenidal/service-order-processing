<?php

namespace App\Policies;

use App\Company;
use App\User;

class CompanyPolicy
{
    /**
     * Determine whether the user can view all models.
     *
     * @param  \App\User $user
     * @return mixed
     */
    public function index(User $user)
    {
        return $user->role->isManager();
    }

    /**
     * Determine whether the company can view the model.
     *
     * @param  User $user
     * @param  Company $model
     * @return mixed
     */
    public function view(User $user, Company $model)
    {
        return $user->role->isManager();
    }

    /**
     * Determine whether the company can create models.
     *
     * @param  User $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->role->isManager();
    }

    /**
     * Determine whether the order can update the model.
     *
     * @param  User $user
     * @param  Company $model
     * @return mixed
     */
    public function update(User $user, Company $model)
    {
        return $user->role->isManager();
    }
}
