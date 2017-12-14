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

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods:  POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Authorization, Content-Type');

Route::group(['middleware' => ['auth:api']], function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::resource('users', 'UserController', ['except' => [
        'edit', 'create'
    ]]);

    Route::resource('orders', 'OrderController', ['except' => [
        'edit', 'create'
    ]]);
    Route::post('orders/{order}/assign', 'OrderController@assign')->middleware('can:assign,order');
    Route::post('orders/{order}/start-progress', 'OrderController@startProgress')->middleware('can:startProgress,order');
    Route::post('orders/{order}/resolve', 'OrderController@resolve')->middleware('can:resolve,order');
    Route::post('orders/{order}/close', 'OrderController@close')->middleware('can:close,order');
    Route::post('orders/{order}/reopen', 'OrderController@reopen')->middleware('can:reopen,order');
});

Route::post('register', 'Auth\RegisterController@register');
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout');

Route::get('roles', 'RoleController@index');