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

Route::get('/mailTest', function() {
	// dd(Config::get('mail'));
	Mail::raw('Text to e-mail', function ($message) {
	    $message->from('admin@wimf.space', 'WIMF');
	    $message->subject('email test');
	    $message->to('andy@andyhill.us');
	});

	return 'sent';
});

// Display all SQL executed in Eloquent
// Event::listen('illuminate.query', function($query)
// {
//     var_dump($query);
// });

Route::get('home', 'HomeController@index');
//// same page, but react will render the demo based on url
Route::get('/demo', 'DemoController@index');



Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);

Route::group(['middleware' => ['auth']], function() {	
	Route::get('export', 'ExportImportController@export');	
	Route::get('import', 'ExportImportController@importForm');
	Route::post('import', 'ExportImportController@import');
	// Route::resource('items', 'ItemController', 
	// 	array('only' => array('index', 'store', 'destroy', 'update', 'show')));			
	
});


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