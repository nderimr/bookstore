<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        $faker = Faker::create(); 
        for($i=1;$i<3;$i++)
        {
            DB::table('books')->insert([
                'name' => $faker->realText(30,3),
                'author' => $faker->name(),
                'publish_year_end' =>$faker->date($format = 'Y-m-d', $max = 'now'),
                'created_at' => $faker->date($format = 'Y-m-d', $max = 'now'),
                'bestseller' => $faker->numberBetween(0,1)
            ]);
       } 
    }
}
