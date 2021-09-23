<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('jwt.verify');
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function users()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function user($id){
        $user = User::find($id);

        return response()->json($user);
    }

    public function update(Request $request ,$id){

    }

    public function destroy(){

    }
}
