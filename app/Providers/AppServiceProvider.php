<?php

namespace App\Providers;

use App\Resolvers\OrderStateMachine;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->when('App\Http\Controllers\OrderController')
            ->needs('$orderStateMachine')
            ->give(new OrderStateMachine());
    }
}
