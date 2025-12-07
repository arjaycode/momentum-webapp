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
        Schema::create('habits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('category_id')->nullable()->constrained('habits_categories')->nullOnDelete();

            $table->string('habit_name');
            $table->text('description')->nullable();
            $table->boolean('enable_push_notifications')->default(false);
            $table->integer('streak_days', false, true)->default(0);

            // Stores: ["Mon", "Wed", "Fri"]
            $table->json('target_days');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('habits');
    }
};
