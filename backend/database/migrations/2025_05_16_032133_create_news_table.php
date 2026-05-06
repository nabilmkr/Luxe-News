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
        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Judul berita
            $table->string('slug')->unique(); // Slug untuk URL
            $table->text('content'); // Konten berita
            $table->string('thumbnail')->nullable(); // Path thumbnail
            $table->foreignId('game_id')->constrained()->onDelete('cascade'); // Relasi ke Game
            $table->foreignId('category_id')->constrained()->onDelete('cascade'); // Relasi ke Category
            $table->boolean('is_featured')->default(false); // Untuk menandai featured news di carousel
            $table->boolean('is_hot_news')->default(false); // Untuk menandai hot news di bagian Popular
            $table->timestamp('published_at')->nullable(); // Tanggal publikasi
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news');
    }
};
