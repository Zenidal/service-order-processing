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
    Route::post('/statistics', 'StatisticController@index');
    Route::get('users/engineers', 'UserController@engineers');
    Route::resource('users', 'UserController', ['except' => [
        'edit', 'create'
    ]]);

    Route::any('localities/search', 'LocalityController@search');

    Route::any('companies/search', 'CompanyController@search');

    Route::any('company-branches/search', 'CompanyBranchController@searchByAddress');
    Route::post('company-branches/create-by-address', 'CompanyBranchController@createByAddress');

    Route::resource('orders', 'OrderController', ['except' => [
        'edit', 'create'
    ]]);
    Route::post('orders/create-from-address-company', 'OrderController@createFromAddressAndCompany');
    Route::put('orders/{order}/edit-from-address-company', 'OrderController@editFromAddressAndCompany');
    Route::post('orders/{order}/assign', 'OrderController@assign')->middleware('can:assign,order');
    Route::post('orders/{order}/start-progress', 'OrderController@startProgress')->middleware('can:startProgress,order');
    Route::post('orders/{order}/resolve', 'OrderController@resolve')->middleware('can:resolve,order');
    Route::post('orders/{order}/close', 'OrderController@close')->middleware('can:close,order');
    Route::post('orders/{order}/reopen', 'OrderController@reopen')->middleware('can:reopen,order');
    Route::get('orders/{order}/order-status-histories', 'OrderController@showStatusHistories')->middleware('can:showStatusHistories,order');
});

Route::post('register', 'Auth\RegisterController@register');
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout');

Route::get('roles', 'RoleController@index');