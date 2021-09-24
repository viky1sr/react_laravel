<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use JWTAuth;

class UserApiController extends Controller
{
    private $userService;

    public function __construct(
        UserService $userService
    ){
        $this->userService = $userService;
    }

    public function users(){
        $users = $this->userService->getAll();
//        dd($users);
        return UserResource::collection($users);
    }

    public function user($id){
        $user = $this->userService->find($id);
        return new UserResource($user);
    }

    public function destroy($id) {
        $this->userService->destroy($id);
        return response()->json([
            'status' => true,
            'messages' => 'Success delete data.'
        ], 200);
    }

    public function register(Request $request){
        $validated= userValidation($request->all());
        if($validated->fails()){
            return response()->json([
                'status' => false,
                'messages' => $validated->errors()->first()
            ], 422);
        } else {
            if($user = $this->userService->create($request->except('_token','submit'))){
                $token = JWTAuth::fromUser($user);
                return response()->json(compact('user','token'),201);
            }
        }
    }

    public function update(Request $request, $id){
        $validated= userValidation($request->all());
        if($validated->fails()){
            return response()->json([
                'status' => false,
                'messages' => $validated->errors()->first()
            ], 422);
        } else {
            if($user = $this->userService->update($request->except('_token','submit'), $id)){
                $token = JWTAuth::fromUser($user);
                return response()->json(compact('user','token'),201);
            }
        }
    }
}
