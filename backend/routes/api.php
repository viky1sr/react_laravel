<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::prefix('/v1/user')->group(function () {
    Route::post('register', 'Api\UserApiController@register');
    Route::post('login', 'Api\AuthController@login');
    Route::post('logout', 'Api\AuthController@logout');
});

Route::group([
    'middleware' => 'jwt.verify',
    'prefix' => '/v1'
], function () {
    Route::get('/users', 'Api\UserApiController@users');
    Route::get('/user/{id}','Api\UserApiController@user');
    Route::delete('/user/{id}','Api\UserApiController@destroy');
    Route::post('/user/update/{id}', 'Api\UserApiController@update');
});
