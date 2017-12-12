<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group(['middleware' => 'auth:api'], function (){
    Route::resource('users', 'UserController', ['except' => [
        'edit', 'create'
    ]]);

    Route::resource('orders', 'OrderController', ['except' => [
        'edit', 'create'
    ]]);
    Route::post('orders/{order}/assign', 'OrderController@assign');
    Route::post('orders/{order}/start-progress', 'OrderController@startProgress');
    Route::post('orders/{order}/resolve', 'OrderController@resolve');
    Route::post('orders/{order}/close', 'OrderController@close');
    Route::post('orders/{order}/reopen', 'OrderController@reopen');
});

Route::post('register', 'Auth\RegisterController@register');
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout');