<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Validation\ValidationException;
use Throwable;
use Symfony\Component\HttpFoundation\Response;
class HandleErrors
{
    public function handle(Request $request, Closure $next): Response
    {
        try {
            return $next($request);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'error' => 'No encontrado',
                'message' => 'El recurso solicitado no existe en la base de datos.'
            ], 404);
        } catch (NotFoundHttpException $e) {
            return response()->json([
                'error' => 'Ruta no encontrada',
                'message' => 'La página o endpoint solicitado no existe.'
            ], 404);
        } catch (ValidationException $e) {
            return response()->json([
                'error' => 'Error de validación',
                'message' => $e->validator->errors()
            ], 422);
        } catch (HttpException $e) {
            return response()->json([
                'error' => 'Error HTTP',
                'message' => $e->getMessage()
            ], $e->getStatusCode());
        } catch (Throwable $e) {
            return response()->json([
                'error' => 'Error del servidor',
                'message' => 'Ha ocurrido un error inesperado.',
                'exception' => get_class($e), // Opcional: para depuración
                'trace' => config('app.debug') ? $e->getTrace() : null // Mostrar detalles solo en modo debug
            ], 500);
        }
    }
}
