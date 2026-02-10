<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = ['Office', 'Electronics', 'Furniture', 'Stationary', 'Other'];
        foreach ($categories as $category) {
            \App\Models\Category::updateOrCreate(['name' => $category]);
        }
    }
}
