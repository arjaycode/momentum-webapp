<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('system_settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value')->nullable();
            $table->string('type')->default('string'); // string, integer, boolean, json
            $table->text('description')->nullable();
            $table->timestamps();
        });

        // Insert default settings
        DB::table('system_settings')->insert([
            // Password Policy
            ['key' => 'password_min_length', 'value' => '8', 'type' => 'integer', 'description' => 'Minimum password length', 'created_at' => now(), 'updated_at' => now()],
            ['key' => 'password_expiry_days', 'value' => '90', 'type' => 'integer', 'description' => 'Password expiry in days', 'created_at' => now(), 'updated_at' => now()],
            ['key' => 'password_require_uppercase', 'value' => '1', 'type' => 'boolean', 'description' => 'Require uppercase letters', 'created_at' => now(), 'updated_at' => now()],
            ['key' => 'password_require_special_chars', 'value' => '0', 'type' => 'boolean', 'description' => 'Require special characters', 'created_at' => now(), 'updated_at' => now()],
            ['key' => 'password_require_numbers', 'value' => '1', 'type' => 'boolean', 'description' => 'Require numbers', 'created_at' => now(), 'updated_at' => now()],
            ['key' => 'password_prevent_reuse', 'value' => '1', 'type' => 'boolean', 'description' => 'Prevent password reuse', 'created_at' => now(), 'updated_at' => now()],
            
            // Session Management
            ['key' => 'session_timeout_minutes', 'value' => '30', 'type' => 'integer', 'description' => 'Session timeout in minutes', 'created_at' => now(), 'updated_at' => now()],
            ['key' => 'session_max_concurrent', 'value' => '3', 'type' => 'integer', 'description' => 'Max concurrent sessions', 'created_at' => now(), 'updated_at' => now()],
            ['key' => 'session_remember_duration_days', 'value' => '30', 'type' => 'integer', 'description' => 'Remember me duration in days', 'created_at' => now(), 'updated_at' => now()],
            ['key' => 'session_force_logout_on_password_change', 'value' => '1', 'type' => 'boolean', 'description' => 'Force logout on password change', 'created_at' => now(), 'updated_at' => now()],
            ['key' => 'session_track_activity', 'value' => '1', 'type' => 'boolean', 'description' => 'Track user activity', 'created_at' => now(), 'updated_at' => now()],
            
            // User Registration
            ['key' => 'registration_default_role', 'value' => 'user', 'type' => 'string', 'description' => 'Default role for new users', 'created_at' => now(), 'updated_at' => now()],
            ['key' => 'registration_allow_self_registration', 'value' => '1', 'type' => 'boolean', 'description' => 'Allow self registration', 'created_at' => now(), 'updated_at' => now()],
            ['key' => 'registration_email_verification_required', 'value' => '1', 'type' => 'boolean', 'description' => 'Email verification required', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('system_settings');
    }
};
