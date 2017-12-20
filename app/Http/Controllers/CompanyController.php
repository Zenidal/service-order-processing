<?php

namespace App\Http\Controllers;

use App\Company;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  Request $request
     * @return Response
     */
    public function search(Request $request)
    {
        $limit = $request->limit ? $request->limit : 10;
        $q = $request->q ? $request->q : '';
        return new Response(['error' => '', 'companies' => Company::where('name', 'LIKE', "%$q%")->take($limit)->get()]);
    }
}