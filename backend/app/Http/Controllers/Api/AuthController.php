<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use App\Services\UserService;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        $credential = $request->only('email','password');
        try {
            if (! $token = JWTAuth::attempt($credential)) {
                return response()->json([
                    'status' => false,
                    'messages' => 'Password dan email tidak sama.',
                ],422);
            }
        } catch (JWTException $e) {
            return response()->json([
                'status' => 'false',
                'messages' => 'could_not_create_token'
            ], 500);
        }

        if($token) {
            $user = \Auth::user();
            $exp = JWTAuth::setToken($token)->getPayload()->get('exp');
        }

        return response()->json(compact('user','token','exp'));
    }

    public function logout( Request $request ) {
        $token = $request->header( 'Authorization' );
        try {
            JWTAuth::parseToken()->invalidate( $token );

            return response()->json( [
                'status'   => false,
                'message' => trans( 'auth.logged_out' )
            ] );
        } catch ( TokenExpiredException $exception ) {
            return response()->json( [
                'error'   => true,
                'message' => trans( 'auth.token.expired' )

            ], 401 );
        } catch ( TokenInvalidException $exception ) {
            return response()->json( [
                'error'   => true,
                'message' => trans( 'auth.token.invalid' )
            ], 401 );

        } catch ( JWTException $exception ) {
            return response()->json( [
                'error'   => true,
                'message' => trans( 'auth.token.missing' )
            ], 500 );
        }
    }

    public function getAuthenticatedUser()
    {
        try {

            if (! $user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }
        } catch (TokenExpiredException $e) {

            return response()->json(['token_expired'], $e->getStatusCode());

        } catch (TokenInvalidException $e) {

            return response()->json(['token_invalid'], $e->getStatusCode());

        } catch (JWTException $e) {

            return response()->json(['token_absent'], $e->getStatusCode());

        }
        return response()->json(compact('user'));
    }
}
