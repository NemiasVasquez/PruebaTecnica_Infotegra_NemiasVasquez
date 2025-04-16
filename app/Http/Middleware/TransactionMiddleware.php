<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class TransactionMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        if ($request->isMethod('post') || $request->isMethod('put') || $request->isMethod('delete')) {
            return DB::transaction(function () use ($next, $request) {
                return $next($request);
            });
        }

        return $next($request);
    }
}
