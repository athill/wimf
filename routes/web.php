<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/demo', 'DemoController@index');
Route::get('/demo/export', 'ExportImportController@exportDemoDownload');
Route::post('/demo/export', 'ExportImportController@exportDemo');


Route::get('auth/{driver}', ['as' => 'socialAuth', 'uses' => 'Auth\SocialController@redirectToProvider']);
Route::get('auth/{driver}/callback', ['as' => 'socialAuthCallback', 'uses' => 'Auth\SocialController@handleProviderCallback']);

// Route::get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('password.request');


//// special case -- needs a name so ./vendor/laravel/framework/src/Illuminate/Auth/Notifications/ResetPassword.php sends correct link
Route::get('password/reset', 'ApplicationController@index')->name('password.reset');


// Route::get('/{foo?}/{bar?}', function () {
//     return view('app');
// });

Route::get('/{foo?}/{bar?}', [
	'as' => 'app.index',
	'uses' => 'ApplicationController@index'
]);