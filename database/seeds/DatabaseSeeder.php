<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(RolesAndUsersTableSeeder::class);
        $this->call(CountriesAndLocalitiesTableSeeder::class);
        $this->call(CompaniesAndCompanyBranchesAndAddressesTableSeeder::class);
    }
}
