<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'HomeController@index');

Route::get('home', 'HomeController@index');

Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);

// =============================================
// API ROUTES ==================================
// =============================================
Route::group(['prefix' => 'api'], function() {
	Route::resource('currentUser', 'CurrentUserController', ['only' => ['index']]);	
	Route::group(['middleware' => ['auth']], function() {	
		Route::resource('containers', 'ContainerController', 
			array('only' => array('index', 'store', 'destroy', 'update', 'show')));	
		Route::resource('items', 'ItemController', 
			array('only' => array('index', 'store', 'destroy', 'update', 'show')));			
		
	});
	// Route::get('preferences', 'AuthController@showPreferences');
	// Route::post('preferences', 'AuthController@postPreferences');
	// Route::get('logout', 'AuthController@getLogout');
});