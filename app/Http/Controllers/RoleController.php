<?php

namespace App\Http\Controllers;

use App\Role;
use Illuminate\Http\Response;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return new Response(['error' => '', 'roles' => Role::all()]);
    }
}
