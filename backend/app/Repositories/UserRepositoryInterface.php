<?php

namespace App\Repositories;

interface UserRepositoryInterface {
    public function getAll();
    public function getById($id);
    public function create(array $inputs);
    public function update(array $inputs, $id);
    public function delete($id);
}
