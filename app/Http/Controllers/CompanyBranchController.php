<?php

namespace App\Http\Controllers;

use App\Address;
use App\CompanyBranch;
use App\Company;
use App\Locality;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Validator;

class CompanyBranchController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  Request $request
     * @return Response
     */
    public function searchByAddress(Request $request)
    {
        $limit = $request->limit ? $request->limit : 10;
        $q = $request->q ? $request->q : '';
        $companyId = $request->companyId;
        $localityId = $request->localityId;
        return new Response([
            'error' => '',
            'companyBranches' =>
                CompanyBranch
                    ::with('address', 'company')
                    ->whereHas('company', function ($company) use ($companyId) {
                        $company->where('id', '=', $companyId);
                    })
                    ->whereHas('address', function ($address) use ($q, $localityId) {
                        $address
                            ->with('locality')
                            ->where('exact_address', 'like', "%" . strtolower($q) . "%")
                            ->whereHas('locality', function ($locality) use ($localityId) {
                                $locality->where('id', '=', $localityId);
                            });
                    })
                    ->take($limit)->get()
        ]);
    }
}