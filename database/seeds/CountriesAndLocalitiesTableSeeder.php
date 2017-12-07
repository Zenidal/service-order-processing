<?php

use App\Country;
use App\Locality;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CountriesAndLocalitiesTableSeeder extends Seeder
{
    const CITY_LOCALITY_TYPE = 'city';
    const TOWN_LOCALITY_TYPE = 'town';
    const URBAN_VILLAGE_LOCALITY_TYPE = 'urban-village';
    const VILLAGE_LOCALITY_TYPE = 'village';

    private $countries;

    public function __construct()
    {
        $this->countries = [
            [
                'name' => 'Belarus',
                'iso_code' => 'BY',
                'localities' => [
                    ['name' => 'Hrodno', 'type' => self::CITY_LOCALITY_TYPE],
                    ['name' => 'Brest', 'type' => self::CITY_LOCALITY_TYPE],
                    ['name' => 'Mogilev', 'type' => self::CITY_LOCALITY_TYPE],
                    ['name' => 'Vitebsk', 'type' => self::CITY_LOCALITY_TYPE],
                    ['name' => 'Gomel', 'type' => self::CITY_LOCALITY_TYPE],
                    ['name' => 'Minsk', 'type' => self::CITY_LOCALITY_TYPE],
                    ['name' => 'Skidel', 'type' => self::TOWN_LOCALITY_TYPE],
                    ['name' => 'Putrishki', 'type' => self::URBAN_VILLAGE_LOCALITY_TYPE],
                    ['name' => 'Partizanskaya', 'type' => self::VILLAGE_LOCALITY_TYPE],
                ]
            ],
            [
                'name' => 'Russia',
                'iso_code' => 'RU',
                'localities' => [
                    ['name' => 'Moscow', 'type' => self::CITY_LOCALITY_TYPE],
                    ['name' => 'Saint Petersburg', 'type' => self::CITY_LOCALITY_TYPE],
                ]
            ],
        ];
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('company_branches')->delete();
        DB::table('addresses')->delete();
        DB::table('localities')->delete();
        DB::table('countries')->delete();

        foreach ($this->countries as $countryData) {
            $country = Country::create([
                'name' => $countryData['name'],
                'iso_code' => $countryData['iso_code']
            ]);
            foreach ($countryData['localities'] as $locality) {
                Locality::create([
                    'name' => $locality['name'],
                    'type' => $locality['type'],
                    'country_id' => $country['id'],
                ]);
            }
        }
    }
}