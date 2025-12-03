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
        Schema::create('habits_categories', function (Blueprint $table) {
            $table->id()->autoIncrement()->primary();
            $table->string('title', 30);
            $table->text('description');
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->string('color', 20);
            $table->string('icon', 20);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('habits_categories');
    }
};
