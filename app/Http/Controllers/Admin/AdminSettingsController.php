<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\SystemSetting;
use App\Models\Habit;
use App\Models\HabitLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\Password;

class AdminSettingsController extends Controller
{
    public function show()
    {
        $user = Auth::user();
        return view('admin.layouts.settings', compact('user'));
    }

    public function update(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'firstname' => 'required|string|max:50',
            'lastname' => 'required|string|max:50',
            'email' => 'required|email|unique:users,email,' . $user->id,
        ]);

        $user->update($validated);

        return redirect()->route('admin.settings')->with('success', 'Profile updated successfully!');
    }

    public function updateAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $user = Auth::user();

        // Delete old avatar if exists
        if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
            Storage::disk('public')->delete($user->avatar);
        }

        // Store new avatar
        $path = $request->file('avatar')->store('avatars', 'public');
        $user->update(['avatar' => $path]);

        return response()->json([
            'success' => true,
            'avatar_url' => asset('storage/' . $path),
            'message' => 'Avatar updated successfully!'
        ]);
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'password' => ['required', 'confirmed', Password::defaults()],
        ]);

        $user = Auth::user();

        if (!Hash::check($request->current_password, $user->password)) {
            return back()->withErrors(['current_password' => 'The current password is incorrect.']);
        }

        $user->update([
            'password' => Hash::make($request->password),
        ]);

        return redirect()->route('admin.settings')->with('success', 'Password changed successfully!');
    }

    /**
     * Get system settings (API)
     */
    public function getSystemSettings()
    {
        try {
            $settings = SystemSetting::getAllSettings();
            
            return response()->json([
                'success' => true,
                'settings' => [
                    'password_policy' => [
                        'min_length' => (int)($settings['password_min_length'] ?? 8),
                        'expiry_days' => (int)($settings['password_expiry_days'] ?? 90),
                        'require_uppercase' => (bool)($settings['password_require_uppercase'] ?? true),
                        'require_special_chars' => (bool)($settings['password_require_special_chars'] ?? false),
                        'require_numbers' => (bool)($settings['password_require_numbers'] ?? true),
                        'prevent_reuse' => (bool)($settings['password_prevent_reuse'] ?? true),
                    ],
                    'session_management' => [
                        'timeout_minutes' => (int)($settings['session_timeout_minutes'] ?? 30),
                        'max_concurrent_sessions' => (int)($settings['session_max_concurrent'] ?? 3),
                        'remember_duration_days' => (int)($settings['session_remember_duration_days'] ?? 30),
                        'force_logout_on_password_change' => (bool)($settings['session_force_logout_on_password_change'] ?? true),
                        'track_activity' => (bool)($settings['session_track_activity'] ?? true),
                    ],
                    'user_registration' => [
                        'default_role' => $settings['registration_default_role'] ?? 'user',
                        'allow_self_registration' => (bool)($settings['registration_allow_self_registration'] ?? true),
                        'email_verification_required' => (bool)($settings['registration_email_verification_required'] ?? true),
                    ],
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch system settings: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update system settings (API)
     */
    public function updateSystemSettings(Request $request)
    {
        try {
            $validated = $request->validate([
                'password_policy' => 'nullable|array',
                'session_management' => 'nullable|array',
                'user_registration' => 'nullable|array',
            ]);

            // Update password policy
            if (isset($validated['password_policy'])) {
                $pp = $validated['password_policy'];
                if (isset($pp['min_length'])) SystemSetting::setValue('password_min_length', (int)$pp['min_length'], 'integer');
                if (isset($pp['expiry_days'])) SystemSetting::setValue('password_expiry_days', (int)$pp['expiry_days'], 'integer');
                if (isset($pp['require_uppercase'])) SystemSetting::setValue('password_require_uppercase', (bool)$pp['require_uppercase'], 'boolean');
                if (isset($pp['require_special_chars'])) SystemSetting::setValue('password_require_special_chars', (bool)$pp['require_special_chars'], 'boolean');
                if (isset($pp['require_numbers'])) SystemSetting::setValue('password_require_numbers', (bool)$pp['require_numbers'], 'boolean');
                if (isset($pp['prevent_reuse'])) SystemSetting::setValue('password_prevent_reuse', (bool)$pp['prevent_reuse'], 'boolean');
            }

            // Update session management
            if (isset($validated['session_management'])) {
                $sm = $validated['session_management'];
                if (isset($sm['timeout_minutes'])) SystemSetting::setValue('session_timeout_minutes', (int)$sm['timeout_minutes'], 'integer');
                if (isset($sm['max_concurrent_sessions'])) SystemSetting::setValue('session_max_concurrent', (int)$sm['max_concurrent_sessions'], 'integer');
                if (isset($sm['remember_duration_days'])) SystemSetting::setValue('session_remember_duration_days', (int)$sm['remember_duration_days'], 'integer');
                if (isset($sm['force_logout_on_password_change'])) SystemSetting::setValue('session_force_logout_on_password_change', (bool)$sm['force_logout_on_password_change'], 'boolean');
                if (isset($sm['track_activity'])) SystemSetting::setValue('session_track_activity', (bool)$sm['track_activity'], 'boolean');
            }

            // Update user registration
            if (isset($validated['user_registration'])) {
                $ur = $validated['user_registration'];
                if (isset($ur['default_role'])) SystemSetting::setValue('registration_default_role', (string)$ur['default_role'], 'string');
                if (isset($ur['allow_self_registration'])) SystemSetting::setValue('registration_allow_self_registration', (bool)$ur['allow_self_registration'], 'boolean');
                if (isset($ur['email_verification_required'])) SystemSetting::setValue('registration_email_verification_required', (bool)$ur['email_verification_required'], 'boolean');
            }

            return response()->json([
                'success' => true,
                'message' => 'System settings updated successfully!'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update system settings: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get notification settings (API)
     */
    public function getNotificationSettings()
    {
        try {
            $user = Auth::user();
            
            // For now, return default notification settings
            // In the future, you can store these in a user_preferences table
            return response()->json([
                'success' => true,
                'settings' => [
                    'global_reminder_time' => SystemSetting::getValue('notification_global_reminder_time', '09:00'),
                    'quiet_hours_start' => SystemSetting::getValue('notification_quiet_hours_start', '22:00'),
                    'quiet_hours_end' => SystemSetting::getValue('notification_quiet_hours_end', '07:00'),
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch notification settings: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update notification settings (API)
     */
    public function updateNotificationSettings(Request $request)
    {
        try {
            $validated = $request->validate([
                'global_reminder_time' => 'nullable|string|regex:/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/',
                'quiet_hours_start' => 'nullable|string|regex:/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/',
                'quiet_hours_end' => 'nullable|string|regex:/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/',
            ]);

            if (isset($validated['global_reminder_time'])) {
                SystemSetting::setValue('notification_global_reminder_time', $validated['global_reminder_time'], 'string');
            }
            if (isset($validated['quiet_hours_start'])) {
                SystemSetting::setValue('notification_quiet_hours_start', $validated['quiet_hours_start'], 'string');
            }
            if (isset($validated['quiet_hours_end'])) {
                SystemSetting::setValue('notification_quiet_hours_end', $validated['quiet_hours_end'], 'string');
            }

            return response()->json([
                'success' => true,
                'message' => 'Notification settings updated successfully!'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update notification settings: ' . $e->getMessage()
            ], 500);
        }
    }
}




