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
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('type'); // 'habit_added', 'habit_updated', 'habit_deleted', 'habit_completed', 'reminder'
            $table->string('title');
            $table->text('message');
            $table->string('icon')->default('fas fa-bell');
            $table->string('color')->default('#007bff');
            $table->string('link')->nullable();
            $table->boolean('read')->default(false);
            $table->timestamps();
            
            $table->index(['user_id', 'read']);
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
