<?php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = User::firstOrCreate(
            [
                'email' => 'admin@admin.com'
            ],
            [
                'name' => 'Admin',
                'nim' => '1997070720211',
                'password' => Hash::make('qweasd123'),
                'email_verified_at' => Carbon::now()
            ]);
        $admin->assignRole('admin');

        $member = User::firstOrCreate(
            [
                'email' => 'member@member.com'
            ],
            [
                'name' => 'Member',
                'nim' => '1999080920212',
                'password' => Hash::make('qweasd123'),
                'email_verified_at' => Carbon::now()
            ]);
        $member->assignRole('member');
    }
}
