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
    'middleware' => ['api'],
], function ($router) {
	Route::post('login', 'AuthController@login');
	Route::post('register', 'AuthController@register');
	Route::post('refresh', 'AuthController@refresh');

	// Route::get('user/verify/{verification_code}', 'AuthController@verifyUser');
	// Route::get('password/reset/{token}', 'AuthController@showResetForm')->name('password.request');
	Route::post('password/reset', 'Auth\ForgotPasswordController@sendResetLinkEmail');
	Route::post('password/reset2', 'Auth\ResetPasswordController@reset');
});

Route::group([
    'middleware' => ['api', 'refresh', 'auth:api'],
], function ($router) {

    
    Route::post('logout', 'AuthController@logout');
    Route::get('export', 'ExportImportController@export');
    
    Route::get('me', 'AuthController@me');
	Route::post('containers/select/{id}', 'ContainerController@select');
	Route::resource('containers', 'ContainerController', 
		array('only' => array('index', 'store', 'destroy', 'update', 'show')));	
	Route::post('import', 'ExportImportController@import');	
	
	Route::resource('items', 'ItemController', 
		array('only' => array('index', 'store', 'destroy', 'update', 'show')));			    

});




