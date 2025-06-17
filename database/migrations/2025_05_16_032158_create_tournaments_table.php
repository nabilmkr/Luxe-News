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
        Schema::create('tournaments', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Nama turnamen
            $table->string('slug')->unique(); // Slug untuk URL
            $table->text('description')->nullable(); // Deskripsi turnamen
            $table->foreignId('game_id')->constrained()->onDelete('cascade'); // Relasi ke Game
            $table->date('start_date'); // Tanggal mulai
            $table->date('end_date'); // Tanggal selesai
            $table->enum('type', ['national', 'international']); // Jenis turnamen: nasional atau internasional
            $table->string('location'); // Lokasi turnamen
            $table->string('poster')->nullable(); // Path poster turnamen
            $table->string('organizer')->nullable(); // Penyelenggara
            $table->decimal('prize_pool', 12, 2)->nullable(); // Hadiah total
            $table->string('contact_wa')->nullable(); // Nomor WhatsApp penyelenggara
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tournaments');
    }
};
