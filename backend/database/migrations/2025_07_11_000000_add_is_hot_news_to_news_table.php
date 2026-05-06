<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('news', function (Blueprint $table) {
            // Menambahkan kolom is_hot_news jika belum ada
            if (!Schema::hasColumn('news', 'is_hot_news')) {
                $table->boolean('is_hot_news')->default(false)->after('is_featured');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('news', function (Blueprint $table) {
            // Menghapus kolom is_hot_news jika ada
            if (Schema::hasColumn('news', 'is_hot_news')) {
                $table->dropColumn('is_hot_news');
            }
        });
    }
}; 