<?php

namespace App\Repositories\Eloquents;

use App\Models\User;
use App\Repositories\UserRepositoryInterface;

Class UserRepository implements UserRepositoryInterface {
    private $model;
    public function __construct(User $model){
        $this->model = $model;
    }

    /*
     * Get All data from Model User
     * */
    public function getAll(){
        return $this->model->all();
    }

    /*
    * Get data by {$id} user from Model User
    * */
    public function getById($id){
        return $this->model->find($id);
    }

    /*
    * Create new data for Model User
    * */
    public function create(array $inputs){
        return $this->model->create($inputs);
    }

    /*
    * Update data by {$id} from Model User
    * */
    public function update(array $inputs, $id){
        $user = $this->model->find($id);
        $user->update($inputs);

        return $user;
    }

    /*
    * Delete data by {$id} from Model User
    * */
    public function delete($id){
        return $this->model->destroy($id);
    }
}
