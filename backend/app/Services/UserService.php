<?php

namespace App\Services;

use App\Http\Resources\UserResource;
use App\Models\User;
use App\Repositories\UserRepositoryInterface;
use Carbon\Carbon;

Class UserService {
    private $userRepo;

    public function __construct(
        UserRepositoryInterface $userRepo
    ){
        $this->userRepo = $userRepo;
    }

    /*
    * Get Data Users from Repository
    * */
    public function getAll(){
        $users = UserResource::collection($this->userRepo->getAll());
        return $users;
    }

    /*
    * Create Data User for Model User
    * */
    public function create(array $inputs){
        $inputs['password'] = \Hash::make($inputs['password']);
        $user = $this->userRepo->create($inputs);
        $user->assignRole('member');;
        if($user){
            $year_now = Carbon::now()->format('Y');
            $created_user = Carbon::parse($user->created_at)->format('Ymd');
            $updateUser = User::find($user->id);
            $updateUser->updateOrFail([
                'nim' => $created_user.$year_now.$user->id
            ]);
            $user = $updateUser;
        }
        return $user;
    }

    /*
    * Update Data User by {id} from Model User
    * */
    public function update(array $inputs, $id) {
        $user = $this->find($inputs['id']);
        $user['name'] = $inputs['name'];
        $user['email'] = $inputs['email'];
        $user['nim'] = $inputs['nim'];
//        $user['password'] = \Hash::make($inputs['password']);

        return $user->save();
    }


    /*
    * Delete Data User by {id} from Model User
    * */
    public function destroy($id){
        return $this->userRepo->delete($id);
    }

    public function find($id){
        return $this->userRepo->getById($id);
    }
}
