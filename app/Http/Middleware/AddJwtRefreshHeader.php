<?php

namespace App\Http\Middleware;

use Log;
use Closure;
use JWTAuth;

class AddJwtRefreshHeader
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);
        $refreshed = null;
        try 
        {
            $refreshed = JWTAuth::refresh(JWTAuth::getToken());
            $response->header('Authorization', $refreshed);
        } catch (JWTException $e) 
        {
            Log::error($e);
            $response->json(['token_refresh_fail'], $e->getStatusCode());
        }        
        return $response;
    }
}
