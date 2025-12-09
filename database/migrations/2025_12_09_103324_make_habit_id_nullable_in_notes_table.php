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
        Schema::table('notes', function (Blueprint $table) {
            // Drop the existing foreign key constraint
            $table->dropForeign(['habit_id']);
            
            // Make habit_id nullable
            $table->unsignedBigInteger('habit_id')->nullable()->change();
            
            // Re-add the foreign key constraint with nullOnDelete to handle NULL values
            $table->foreign('habit_id')->references('id')->on('habits')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('notes', function (Blueprint $table) {
            // Drop the foreign key constraint
            $table->dropForeign(['habit_id']);
            
            // Make habit_id NOT NULL again
            $table->unsignedBigInteger('habit_id')->nullable(false)->change();
            
            // Re-add the foreign key constraint
            $table->foreign('habit_id')->references('id')->on('habits')->onDelete('cascade');
        });
    }
};
