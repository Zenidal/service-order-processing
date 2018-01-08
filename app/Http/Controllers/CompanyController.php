<?php

namespace App\Http\Controllers;

use App\Company;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Validator;

class CompanyController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Company::class);
    }

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

    /**
     * Display a listing of the resource.
     *
     * @param  Request $request
     * @return Response
     */
    public function index(Request $request)
    {
        $this->authorize('index', [\Auth::user()]);

        $limit = $request->limit ?? $request->limit;
        $pageNumber = $request->pageNumber ? $request->pageNumber : 0;
        return new Response(['error' => '', 'companies' => $limit ?
            Company::forPage($pageNumber, $limit)->get() :
            Company::all()
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  Company $company
     * @return \Illuminate\Http\Response
     */
    public function show(Company $company)
    {
        return new Response(['error' => '', 'company' => $company]);
    }

    /**
     * @param  Request $request
     * @return Response
     */
    public function store(Request $request)
    {
        /** @var Validator $validator */
        $validator = Validator::make($request->all(), [
            'name' => 'max:255|min:5|required'
        ]);
        if ($validator->fails()) {
            return new Response(['error' => $validator->errors()->all(), 'company' => $request->all()], Response::HTTP_BAD_REQUEST);
        }
        $company = new Company();
        $company->name = $request->name;
        $company->save();
        return new Response(['error' => '', 'company' => $company]);
    }

    /**
     * @param Company $company
     * @param  Request $request
     * @return Response
     */
    public function update(Company $company, Request $request)
    {
        /** @var Validator $validator */
        $validator = Validator::make($request->all(), [
            'name' => 'max:255|min:5|required'
        ]);
        if ($validator->fails()) {
            return new Response(['error' => $validator->errors()->all(), 'company' => $request->all()], Response::HTTP_BAD_REQUEST);
        }
        $company->name = $request->name;
        $company->save();
        return new Response(['error' => '', 'company' => $company]);
    }
}