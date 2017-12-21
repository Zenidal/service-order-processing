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
    public function __construct()
    {
        $this->authorizeResource(User::class);
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        $this->authorize('index', [\Auth::user()]);
        return new Response(['error' => '', 'users' => User::all()]);
    }

    /**
     * Display a listing of the engineers.
     *
     * @param Request $request
     * @return Response
     */
    public function engineers(Request $request)
    {
        $limit = $request->limit ? $request->limit : 10;
        $q = $request->q ? $request->q : '';
        $this->authorize('index', [\Auth::user()]);
        return new Response(['error' => '', 'users' => User
            ::with('role')
            ->where('name', 'LIKE', '%' . $q . '%')
            ->whereHas('role', function ($role) {
                $role->where('name', '=', Role::ENGINEER_ROLE);
            })
            ->take($limit)
            ->get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        /** @var Validator $validator */
        $validator = Validator::make($request->all(), [
            'name' => 'min:4|max:255|required',
            'password' => 'min:4|max:255|required',
            'email' => 'email|required|unique:users',
            'role_id' => 'numeric|required'
        ]);
        if ($validator->fails()) {
            return new Response(['error' => $validator->errors()->all(), 'user' => $request->all()], Response::HTTP_BAD_REQUEST);
        }
        if (!($role = Role::find($request->role_id))) {
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
     * @param User $user
     * @return Response
     */
    public function show(User $user)
    {
        return new Response(['error' => '', 'user' => $user]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param User $user
     * @param  \Illuminate\Http\Request $request
     * @return Response
     */
    public function update(User $user, Request $request)
    {
        /** @var Validator $validator */
        $validator = Validator::make($request->all(), [
            'name' => 'min:4|max:255|required',
            'password' => 'min:4|max:255|required',
            'email' => [
                'email',
                'required',
                Rule::unique('users')->ignore($user->id),
            ],
            'role_id' => 'numeric|required'
        ]);
        if ($validator->fails()) {
            return new Response(['error' => $validator->errors()->all(), 'user' => $request->all()], Response::HTTP_BAD_REQUEST);
        }
        if (!($role = Role::find($request->role_id))) {
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
     * @param User $user
     * @return Response
     */
    public function destroy(User $user)
    {
        if ($user->forceDelete()) {
            return new Response(['error' => '', 'user' => $user]);
        }
        return new Response(['error' => "User with id {$user->id} wasn't deleted."], Response::HTTP_BAD_REQUEST);
    }
}
