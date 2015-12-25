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

Route::get('/', 'WelcomeController@index');

Route::get('home', 'HomeController@index');

Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);


Route::group(['middleware' => ['auth']], function() {
	// =============================================
	// API ROUTES ==================================
	// =============================================
	Route::group(['prefix' => 'api'], function() {
		Route::resource('containers', 'ContainerController', 
			array('only' => array('index', 'store', 'destroy', 'update')));		
		// since we will be using this just for CRUD, we won't need create and edit
		// Angular will handle both of those forms
		// this ensures that a user can't access api/create or api/edit when there's nothing there
	// 	Route::resource('items', 'ItemController', 
	// 		array('only' => array('index', 'store', 'destroy', 'update')));
	// 	Route::resource('categories', 'CategoryController', 
	// 		array('only' => array('index')));
	});
	// Route::get('preferences', 'AuthController@showPreferences');
	// Route::post('preferences', 'AuthController@postPreferences');
	// Route::get('logout', 'AuthController@getLogout');
});