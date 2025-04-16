<?php

use App\Http\Controllers\PersonajeController;
use Illuminate\Support\Facades\Route;

Route::get('/obtenerPersonajes', [PersonajeController::class, 'index']);
Route::post('/guardarListaPersonajes', [PersonajeController::class, 'guardarListaPersonajes']);
Route::post('/actualizarPersonaje/{id}', [PersonajeController::class, 'update']);

Route::view('/{doc}', 'welcome')->where('doc', 'documentacion');

Route::view('/{any}', 'welcome')->where('any', '.*');

Route::view('/', 'welcome');
