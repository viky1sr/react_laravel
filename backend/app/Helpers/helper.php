<?php

use Illuminate\Support\Facades\Validator;

function userValidation($request) {
    $req = $request;
    $validated = Validator::make($req, [
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'password' => 'required|string|min:6|confirmed',
    ]);
    return $validated;
}

function userUpdateValidation($request) {
    $req = $request;
    $validated = Validator::make($req, [
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users',
        'nim' => 'required|max:255',
    ]);
    return $validated;
}
