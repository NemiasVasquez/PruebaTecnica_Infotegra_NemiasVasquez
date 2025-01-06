<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;

Route::view('/{admin}', 'welcome')->where('admin', 'login|administrable');
Route::view('/', 'welcome');

Route::group(['prefix' => 'auth'], function ($router) {
    Route::post('login', [AuthController::class, 'login']);
});

Route::middleware(['auth:api'])->group(function () {
    Route::post('me', [AuthController::class, 'me']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);

});