<?php

use App\Address;
use App\Company;
use App\CompanyBranch;
use App\Locality;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CompaniesAndCompanyBranchesAndAddressesTableSeeder extends Seeder
{
    private $companies;

    public function __construct()
    {
        $this->companies = [
            [
                'name' => 'Company1',
                'companyBranches' => [
                    [
                        'address' => [
                            'exactAddress' => 'street 3, house 10',
                            'locality' => 'Hrodno'
                        ]
                    ],
                    [
                        'address' => [
                            'exactAddress' => 'street 6, house 2A',
                            'locality' => 'Minsk'
                        ]
                    ]
                ]
            ], [
                'name' => 'Company2',
                'companyBranches' => [
                    [
                        'address' => [
                            'exactAddress' => 'street 73, house 2',
                            'locality' => 'Hrodno'
                        ]
                    ],
                    [
                        'address' => [
                            'exactAddress' => 'street 2, house 2A',
                            'locality' => 'Mogilev'
                        ]
                    ],
                    [
                        'address' => [
                            'exactAddress' => 'street 12, house 53',
                            'locality' => 'Gomel'
                        ]
                    ],
                    [
                        'address' => [
                            'exactAddress' => 'street 53, house 62',
                            'locality' => 'Gomel'
                        ]
                    ]
                ]
            ], [
                'name' => 'Company3',
                'companyBranches' => [
                    [
                        'address' => [
                            'exactAddress' => 'street 3, house 6',
                            'locality' => 'Brest'
                        ]
                    ],
                    [
                        'address' => [
                            'exactAddress' => 'street 133, house 5',
                            'locality' => 'Moscow'
                        ]
                    ]
                ]
            ]
        ];
    }

    public function run()
    {
        DB::table('company_branches')->delete();
        DB::table('addresses')->delete();
        DB::table('companies')->delete();
        foreach ($this->companies as $companyData) {
            $company = Company::create([
                'name' => $companyData['name'],
            ]);
            foreach ($companyData['companyBranches'] as $companyBranch) {
                $addressData = $companyBranch['address'];
                $locality = Locality::where('name', $addressData['locality'])->first();
                if (!$locality) continue;
                $address = Address::create([
                    'exact_address' => $addressData['exactAddress'],
                    'locality_id' => $locality['id']
                ]);
                CompanyBranch::create([
                    'company_id' => $company['id'],
                    'address_id' => $address['id']
                ]);
            }
        }
    }
}