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

Route::group([
    'middleware' => 'api',
], function ($router) {

    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::get('me', 'AuthController@me');
	Route::resource('containers', 'ContainerController', 
		array('only' => array('index', 'store', 'destroy', 'update', 'show')));	
	Route::resource('items', 'ItemController', 
		array('only' => array('index', 'store', 'destroy', 'update', 'show')));			    

});
