<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->validateCsrfTokens(except: [
            'http://127.0.0.1:8000/*',
            'https://colegiados.coespela.org.pe/*'

        ]);
    })

    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->render(function (UnauthorizedHttpException $e) {
       
            if (str_contains($e->getMessage(), 'Token has expired') || str_contains($e->getMessage(), 'Token invalid')) {
                return redirect('/login')->withErrors('Su sesión ha expirado, por favor inicie sesión nuevamente.');
            }
            throw $e;
        });
        $exceptions->render(function (\Symfony\Component\HttpKernel\Exception\NotFoundHttpException $e) {
            return response()->view('welcome', ['message' => 'Página no encontrada.']);
        });

    })->create();
