<?php
namespace App\Http\Middleware;
use Closure;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
class VerifyJWTToken
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
        try{
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }
        } catch (JWTException $e) {
            if($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {
                // return response()->json(['token_expired'], $e->getStatusCode());
                // If the token is expired, then it will be refreshed and added to the headers
                $refreshed = null;
                try {
                    $refreshed = JWTAuth::refresh(JWTAuth::getToken());
                    $response->header('Authorization', $refreshed);
                } catch (JWTException $e) {
                    // return ApiHelpers::ApiResponse(103, null);
                    return response()->json(['token_refresh_fail'], $e->getStatusCode());
                }
                $user = JWTAuth::setToken($refreshed)->toUser();
            } else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {
                return response()->json(['token_invalid'], $e->getStatusCode());
            } else{
                return response()->json(['error'=>'Token is required']);
            }
        }
       return $next($request);
    }
}