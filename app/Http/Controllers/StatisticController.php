<?php

namespace App\Http\Controllers;

use App\Company;
use App\CompanyBranch;
use App\Country;
use App\Locality;
use App\Order;
use App\User;
use Illuminate\Http\Response;
use Illuminate\Http\Request;

class StatisticController extends Controller
{
    /**
     * @param Request $request
     * @return Response
     */
    public function index(Request $request): Response
    {
        $fieldsStatistic = [];

        if (!$request->fields) return new Response(['error' => '', 'statistics' => '']);

        foreach ($request->fields as $field) {
            switch ($field) {
                case 'user': {
                    $fieldsStatistic['user'] = User::count();
                    break;
                }
                case 'order': {
                    $fieldsStatistic['order'] = Order::count();
                    break;
                }
                case 'company': {
                    $fieldsStatistic['company'] = Company::count();
                    break;
                }
                case 'country': {
                    $fieldsStatistic['country'] = Country::count();
                    break;
                }
                case 'locality': {
                    $fieldsStatistic['locality'] = Locality::count();
                    break;
                }
                case 'companyBranch': {
                    $fieldsStatistic['companyBranch'] = CompanyBranch::count();
                    break;
                }
            }
        }
        return new Response(['error' => '', 'statistic' => $fieldsStatistic]);
    }
}