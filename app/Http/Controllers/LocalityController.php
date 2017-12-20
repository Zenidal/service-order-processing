<?php

namespace App\Http\Controllers;

use App\Locality;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class LocalityController extends Controller
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
        return new Response(['error' => '', 'localities' => Locality::where('name', 'LIKE', "%$q%")->take($limit)->get()]);
    }
}