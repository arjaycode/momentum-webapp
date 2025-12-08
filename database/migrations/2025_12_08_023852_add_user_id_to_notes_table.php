<?php

// database/migrations/YYYY_MM_DD_HHMMSS_add_user_id_to_notes_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('notes', function (Blueprint $table) {
            // Add the user_id foreign key column
            $table->foreignId('user_id')->constrained()->after('id'); 
            
            // If your notes table is very old and doesn't use BigInts, use this instead:
            // $table->unsignedBigInteger('user_id')->after('id');
            // $table->foreign('user_id')->references('id')->on('users');
        });
    }

    public function down(): void
    {
        Schema::table('notes', function (Blueprint $table) {
            // Drop the foreign key constraint first
            $table->dropForeign(['user_id']);
            // Drop the column itself
            $table->dropColumn('user_id');
        });
    }
};