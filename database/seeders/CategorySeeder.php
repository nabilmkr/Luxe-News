<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'MOBA',
                'description' => 'Multiplayer Online Battle Arena games',
            ],
            [
                'name' => 'RPG',
                'description' => 'Role-Playing Games',
            ],
            [
                'name' => 'Battle Royale',
                'description' => 'Last player/team standing survival games',
            ],
            [
                'name' => 'FPS',
                'description' => 'First-Person Shooter games',
            ],
        ];

        foreach ($categories as $category) {
            Category::create([
                'name' => $category['name'],
                'slug' => Str::slug($category['name']),
                'description' => $category['description'],
            ]);
        }
    }
}
