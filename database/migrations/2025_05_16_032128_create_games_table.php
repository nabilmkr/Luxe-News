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
        Schema::create('games', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Nama game
            $table->string('slug')->unique(); // Slug untuk URL
            $table->text('description')->nullable(); // Deskripsi game
            $table->string('publisher')->nullable(); // Penerbit game
            $table->string('developer')->nullable(); // Pengembang game
            $table->foreignId('category_id')->constrained()->onDelete('cascade'); // Relasi ke Category
            $table->string('logo')->nullable(); // Path logo game
            $table->date('release_date')->nullable(); // Tanggal rilis
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('games');
    }
};
