<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\CategoryBanner;

class CategoryBannerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Hapus data yang ada terlebih dahulu
        CategoryBanner::truncate();
        
        // Ambil ID kategori MOBA
        $mobaCategory = Category::where('name', 'MOBA')->first();
        
        if (!$mobaCategory) {
            $this->command->info('Kategori MOBA tidak ditemukan');
            return;
        }
        
        // Buat data banner untuk kategori MOBA
        CategoryBanner::create([
            'category_id' => $mobaCategory->id,
            'title' => 'Update Jadwal IKL Spring Regular Season dan Cara Menontonnya',
            'image' => 'https://placehold.co/800x400?text=MOBA+Banner+1',
            'description' => 'Informasi terbaru tentang jadwal kompetisi IKL Spring Regular Season',
            'is_active' => true,
            'order' => 1,
        ]);
        
        CategoryBanner::create([
            'category_id' => $mobaCategory->id,
            'title' => 'Turnamen Mobile Legends M5 World Championship',
            'image' => 'https://placehold.co/800x400?text=MOBA+Banner+2',
            'description' => 'Liputan lengkap turnamen Mobile Legends M5 World Championship',
            'is_active' => true,
            'order' => 2,
        ]);
        
        CategoryBanner::create([
            'category_id' => $mobaCategory->id,
            'title' => 'Update Terbaru Dota 2: Patch 7.35',
            'image' => 'https://placehold.co/800x400?text=MOBA+Banner+3',
            'description' => 'Perubahan meta dan hero dalam patch terbaru Dota 2',
            'is_active' => true,
            'order' => 3,
        ]);
        
        $this->command->info('Data banner kategori berhasil dibuat');
    }
}
