<?php

namespace App\Http\Controllers;

use App\Role;
use Illuminate\Validation\Rule;
use Validator;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return new Response(['error' => '', User::all()]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        /** @var Validator $validator */
        $validator = Validator::make($request->all(), [
            'name' => 'min:4|max:255|required',
            'password' => 'min:4|max:255|required',
            'email' => 'email|required|unique',
            'role_id' => 'numeric|required'
        ]);
        if ($validator->fails()) {
            return new Response(['error' => $validator->errors()->all(), 'user' => $request->all()], Response::HTTP_BAD_REQUEST);
        }
        $role = Role::find($request->role_id);
        if (!$role) {
            return new Response(['error' => "Role with id {$request->role_id} not found.", 'user' => $request], Response::HTTP_BAD_REQUEST);
        }
        $user = new User([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);
        $role->users()->save($user);
        return new Response(['error' => '', 'user' => $user]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::find($id);
        if (!$user) {
            return new Response(['error' => "User with id {$id} not found."], Response::HTTP_NOT_FOUND);
        }
        return new Response(['error' => '', 'user' => $user]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        /** @var Validator $validator */
        $validator = Validator::make($request->all(), [
            'name' => 'min:4|max:255|required',
            'password' => 'min:4|max:255|required',
            'email' => [
                'email',
                'required',
                Rule::unique('users')->ignore($id),
            ],
            'role_id' => 'numeric|required'
        ]);
        if ($validator->fails()) {
            return new Response(['error' => $validator->errors()->all(), 'user' => $request->all()], Response::HTTP_BAD_REQUEST);
        }
        $user = User::find($id);
        if (!$user) {
            return new Response(['error' => "User with id {$id} wasn't deleted."], Response::HTTP_BAD_REQUEST);
        }
        $role = Role::find($request->role_id);
        if (!$role) {
            return new Response(['error' => "Role with id {$request->role_id} not found.", 'user' => $request], Response::HTTP_BAD_REQUEST);
        }
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $role->users()->save($user);
        return new Response(['error' => '', 'user' => $user]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        /** @var User $user */
        $user = User::find($id);
        if ($user) {
            if ($user->forceDelete()) {
                return new Response(['error' => '', 'user' => $user]);
            }
            return new Response(['error' => "User with id {$id} wasn't deleted."], Response::HTTP_BAD_REQUEST);
        }
        return new Response(['error' => "User with id {$id} not found."], Response::HTTP_NOT_FOUND);
    }
}
