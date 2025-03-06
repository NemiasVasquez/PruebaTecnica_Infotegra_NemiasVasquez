<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\JWTException;

class JwtMiddleware2
{
    public function handle(Request $request, Closure $next)
    {
        // Rutas públicas que NO necesitan token
        $rutasSinToken = ['auth/login', 'login', 'documentacion', 'welcome', ''];

        // Verifica si la ruta actual está en la lista de rutas públicas
        if (in_array(trim($request->path(), '/'), $rutasSinToken)) {
            return $next($request);
        }

        try {
            JWTAuth::parseToken()->authenticate();
        } catch (TokenExpiredException $e) {
            return response()->json(['error' => 'Token expirado', 'message' => 'Debe iniciar sesión nuevamente.'], 401);
        } catch (TokenInvalidException $e) {
            return response()->json(['error' => 'Token inválido', 'message' => 'El token proporcionado no es válido.'], 401);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Token no encontrado', 'message' => 'No se ha encontrado un token en la solicitud.'], 401);
        }

        return $next($request);
    }
}
