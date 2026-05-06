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
        Schema::create('comments', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Nama guest commenter
            $table->text('content'); // Isi komentar
            $table->foreignId('news_id')->constrained()->onDelete('cascade'); // Relasi ke News
            $table->boolean('is_approved')->default(true); // Untuk moderasi jika perlu
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comments');
    }
};
