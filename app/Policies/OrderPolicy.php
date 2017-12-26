<?php

namespace App\Policies;

use App\Order;
use App\Resolvers\OrderStateMachine;
use App\User;

class OrderPolicy
{
    /**
     * Determine whether the order can view the model.
     *
     * @param  User $user
     * @param  Order $model
     * @return mixed
     */
    public function view(User $user, Order $model)
    {
        return
            $user->role->isManager() ||
            ($user->role->isEngineer() && $model->engineer_id === $user->id) ||
            ($user->role->isCustomer() && $model->owner_id === $user->id);
    }

    /**
     * Determine whether the order can create models.
     *
     * @param  User $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->role->isCustomer();
    }

    /**
     * Determine whether the order can update the model.
     *
     * @param  User $user
     * @param  Order $model
     * @return mixed
     */
    public function update(User $user, Order $model)
    {
        return
            $user->role->isManager() ||
            ($user->role->isCustomer() && $model->owner_id === $user->id && ($model->status === OrderStateMachine::OPEN_STATUS || $model->status === OrderStateMachine::REOPENED_STATUS));
    }

    /**
     * Determine whether the order can delete the model.
     *
     * @param  User $user
     * @param  Order $model
     * @return mixed
     */
    public function delete(User $user, Order $model)
    {
        return false;
    }

    /**
     * @param User $user
     * @param Order $model
     * @return bool
     */
    public function showStatusHistories(User $user, Order $model)
    {
        return
            $user->role->isManager() ||
            ($user->role->isEngineer() && $model->engineer_id === $user->id) ||
            ($user->role->isCustomer() && $model->owner_id === $user->id);
    }

    /**
     * @param User $user
     * @param Order $model
     * @return mixed
     */
    public function assign(User $user, Order $model)
    {
        return $user->role->isManager();
    }

    /**
     * @param User $user
     * @param Order $model
     * @return mixed
     */
    public function startProgress(User $user, Order $model)
    {
        return $user->role->isEngineer() && $user->id === $model->engineer_id;
    }

    /**
     * @param User $user
     * @param Order $model
     * @return mixed
     */
    public function resolve(User $user, Order $model)
    {
        return $user->role->isEngineer() && $user->id === $model->engineer_id;
    }

    /**
     * @param User $user
     * @param Order $model
     * @return mixed
     */
    public function close(User $user, Order $model)
    {
        return $user->role->isManager() || ($user->role->isCustomer() && $model->owner_id === $user->id);
    }

    /**
     * @param User $user
     * @param Order $model
     * @return mixed
     */
    public function reopen(User $user, Order $model)
    {
        return $user->role->isManager() || ($user->role->isCustomer() && $model->owner_id === $user->id);
    }
}
