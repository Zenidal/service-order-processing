<?php

use App\Role;
use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class RolesAndUsersTableSeeder extends Seeder
{
    private $roles;

    public function __construct()
    {
        $this->roles = [
            [
                'name' => 'customer',
                'users' => [
                    ['name' => 'Customer', 'email' => 'customer@example.com', 'password' => Hash::make('customer')]
                ]
            ],
            [
                'name' => 'engineer',
                'users' => [
                    ['name' => 'Engineer', 'email' => 'engineer@example.com', 'password' => Hash::make('engineer')]
                ]
            ],
            [
                'name' => 'manager',
                'users' => [
                    ['name' => 'Manager', 'email' => 'manager@example.com', 'password' => Hash::make('manager')]
                ]
            ]
        ];
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->delete();
        DB::table('roles')->delete();

        foreach ($this->roles as $roleData) {
            $role = Role::create([
                'name' => $roleData['name']
            ]);
            foreach ($roleData['users'] as $user) {
                User::create([
                    'name' => $user['name'],
                    'email' => $user['email'],
                    'password' => $user['password'],
                    'role_id' => $role['id']
                ]);
            }
        }
    }
}