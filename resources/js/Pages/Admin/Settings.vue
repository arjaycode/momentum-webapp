<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { router, useForm, usePage } from '@inertiajs/vue3';
import axios from 'axios';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import {
    update,
    updatePassword,
    updateAvatar,
    getNotificationSettings,
    updateNotificationSettings,
} from '@/actions/App/Http/Controllers/Admin/AdminSettingsController';
import type { SharedProps } from '@/types/global';

const props = defineProps<{
    user: {
        id: number;
        firstname: string;
        lastname: string;
        email: string;
        avatar: string | null;
        created_at: string;
    };
    totalUsers: number;
    totalHabits: number;
    totalNotes: number;
    accountAgeDays: number;
}>();

const page = usePage<SharedProps>();
const csrf = () =>
    document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? '';

axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf();

const mainScreen = ref<'profile' | 'notifications'>('profile');
const passwordScreen = ref(false);

const profileForm = useForm({
    firstname: props.user.firstname,
    lastname: props.user.lastname,
    email: props.user.email,
});

const passwordForm = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
});

const avatarSrc = ref(
    props.user.avatar
        ? `/storage/${props.user.avatar}`
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
              `${props.user.firstname} ${props.user.lastname}`,
          )}&background=random`,
);

const globalReminderTime = ref('09:00');
const quietHoursStart = ref('22:00');
const quietHoursEnd = ref('07:00');

function showProfileTab() {
    mainScreen.value = 'profile';
    passwordScreen.value = false;
}

function showNotificationsTab() {
    mainScreen.value = 'notifications';
    passwordScreen.value = false;
}

function openPassword() {
    passwordScreen.value = true;
}

function closePassword() {
    passwordScreen.value = false;
}

function submitProfile() {
    profileForm.put(update.put());
}

function submitPassword() {
    passwordForm.put(updatePassword.put(), {
        onSuccess: () => {
            passwordForm.reset();
            closePassword();
        },
    });
}

function onAvatarChange(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    if (file.size > 2048 * 1024) {
        alert('File size must be less than 2MB');
        input.value = '';
        return;
    }
    if (!file.type.match('image.*')) {
        alert('Please select an image file');
        input.value = '';
        return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
        if (typeof ev.target?.result === 'string') {
            avatarSrc.value = ev.target.result;
        }
    };
    reader.readAsDataURL(file);

    const fd = new FormData();
    fd.append('avatar', file);
    axios
        .post(updateAvatar.post().url, fd, {
            headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
            if (res.data?.success && res.data?.avatar_url) {
                avatarSrc.value = res.data.avatar_url;
            }
        })
        .catch(() => {
            alert('An error occurred while uploading the avatar.');
        })
        .finally(() => {
            input.value = '';
        });
}

function loadNotificationSettings() {
    axios
        .get(getNotificationSettings.get().url)
        .then((res) => {
            const s = res.data?.settings;
            if (s?.global_reminder_time) {
                globalReminderTime.value = s.global_reminder_time;
            }
            if (s?.quiet_hours_start) {
                quietHoursStart.value = s.quiet_hours_start;
            }
            if (s?.quiet_hours_end) {
                quietHoursEnd.value = s.quiet_hours_end;
            }
        })
        .catch(() => {});
}

function saveNotificationSettings(e: Event) {
    e.preventDefault();
    axios
        .put(updateNotificationSettings.put().url, {
            global_reminder_time: globalReminderTime.value,
            quiet_hours_start: quietHoursStart.value,
            quiet_hours_end: quietHoursEnd.value,
        })
        .then((res) => {
            if (res.data?.success) {
                alert(res.data.message || 'Saved.');
            }
        })
        .catch(() => alert('Failed to save notification settings.'));
}

onMounted(() => {
    loadNotificationSettings();
});

const memberSince = new Date(props.user.created_at).toLocaleDateString(undefined, {
    month: 'long',
    year: 'numeric',
});
</script>

<template>
    <AdminLayout
        title="Admin Settings - Momentum"
        page-css="admin-settings.css"
        active="settings"
        page-title="Admin Settings"
        page-description="Manage your account and app preferences"
    >
        <main class="main-content">
            <div
                v-if="page.props.flash?.success"
                id="toast-notification"
                class="toast-notification toast-success"
            >
                <div class="toast-content">
                    <i class="fas fa-check-circle toast-icon"></i>
                    <span class="toast-message">{{ page.props.flash.success }}</span>
                </div>
            </div>

            <div v-show="passwordScreen" id="password-screen" class="screen active">
                <div class="content">
                    <button
                        type="button"
                        class="back-btn"
                        @click="closePassword(); showProfileTab()"
                    >
                        ← Back
                    </button>
                    <div class="section password-section">
                        <h2>Change Password</h2>
                        <form @submit.prevent="submitPassword">
                            <div class="form-group">
                                <label class="form-label">Current Password</label>
                                <input
                                    v-model="passwordForm.current_password"
                                    type="password"
                                    class="form-input"
                                    required
                                />
                            </div>
                            <div class="form-group">
                                <label class="form-label">New Password</label>
                                <input
                                    v-model="passwordForm.password"
                                    type="password"
                                    class="form-input"
                                    required
                                />
                            </div>
                            <div class="form-group">
                                <label class="form-label">Confirm New Password</label>
                                <input
                                    v-model="passwordForm.password_confirmation"
                                    type="password"
                                    class="form-input"
                                    required
                                />
                            </div>
                            <div class="form-actions">
                                <button type="button" class="btn btn-secondary" @click="closePassword()">
                                    Cancel
                                </button>
                                <button type="submit" class="btn btn-primary" :disabled="passwordForm.processing">
                                    Change Password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div v-show="!passwordScreen && mainScreen === 'profile'" id="profile-screen" class="screen active">
                <div class="tabs">
                    <div
                        class="tab"
                        :class="{ active: mainScreen === 'profile' }"
                        data-screen="profile-screen"
                        @click="showProfileTab()"
                    >
                        Profile
                    </div>
                    <div
                        class="tab"
                        :class="{ active: mainScreen === 'notifications' }"
                        data-screen="notifications-screen"
                        @click="showNotificationsTab()"
                    >
                        Notifications
                    </div>
                </div>

                <div class="profile-content">
                    <div class="profile-section">
                        <div class="profile-left">
                            <div class="section">
                                <h2>Profile Information</h2>
                                <div class="profile-header">
                                    <div class="profile-avatar">
                                        <img
                                            id="profileAvatar"
                                            :src="avatarSrc"
                                            alt="Profile"
                                            class="avatar-image"
                                        />
                                        <input
                                            id="avatarInput"
                                            type="file"
                                            accept="image/*"
                                            style="display: none"
                                            @change="onAvatarChange"
                                        />
                                    </div>
                                    <div>
                                        <div class="profile-name">
                                            {{ user.firstname }} {{ user.lastname }}
                                        </div>
                                        <div class="profile-member">Member since {{ memberSince }}</div>
                                        <label for="avatarInput" class="btn btn-secondary btn-change-photo">
                                            Change photo
                                        </label>
                                    </div>
                                </div>

                                <form @submit.prevent="submitProfile">
                                    <div class="form-row">
                                        <div class="form-group">
                                            <label class="form-label">First Name</label>
                                            <input
                                                v-model="profileForm.firstname"
                                                type="text"
                                                class="form-input"
                                                required
                                            />
                                        </div>
                                        <div class="form-group">
                                            <label class="form-label">Last Name</label>
                                            <input
                                                v-model="profileForm.lastname"
                                                type="text"
                                                class="form-input"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Email</label>
                                        <input
                                            id="email"
                                            v-model="profileForm.email"
                                            type="email"
                                            class="form-input"
                                            required
                                        />
                                    </div>
                                    <div class="form-actions">
                                        <button type="button" class="btn btn-secondary" @click="router.reload()">
                                            Cancel
                                        </button>
                                        <button type="submit" class="btn btn-primary" :disabled="profileForm.processing">
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div class="profile-right">
                            <div class="section">
                                <h2>Account Statistics</h2>
                                <div class="stats-grid">
                                    <div class="stat-card">
                                        <div class="stat-label">Total Users</div>
                                        <div class="stat-value">{{ totalUsers.toLocaleString() }}</div>
                                    </div>
                                    <div class="stat-card">
                                        <div class="stat-label">Total Habits</div>
                                        <div class="stat-value">{{ totalHabits.toLocaleString() }}</div>
                                    </div>
                                    <div class="stat-card">
                                        <div class="stat-label">Total Notes</div>
                                        <div class="stat-value">{{ totalNotes.toLocaleString() }}</div>
                                    </div>
                                    <div class="stat-card">
                                        <div class="stat-label">Account Age</div>
                                        <div class="stat-value">
                                            {{ accountAgeDays.toLocaleString() }}
                                            <span class="stat-unit">days</span>
                                        </div>
                                        <div class="stat-subtitle">
                                            Member since
                                            {{
                                                new Date(user.created_at).toLocaleDateString(undefined, {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                })
                                            }}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="section">
                                <h2>Preferences</h2>
                                <div class="preference-item">
                                    <div>
                                        <h3>Change Password</h3>
                                        <p>You can change your password here</p>
                                    </div>
                                    <button type="button" class="btn btn-secondary" @click="openPassword()">
                                        Change Password
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                v-show="!passwordScreen && mainScreen === 'notifications'"
                id="notifications-screen"
                class="screen active"
            >
                <div class="tabs">
                    <div class="tab" :class="{ active: mainScreen === 'profile' }" @click="showProfileTab()">
                        Profile
                    </div>
                    <div
                        class="tab"
                        :class="{ active: mainScreen === 'notifications' }"
                        @click="showNotificationsTab()"
                    >
                        Notifications
                    </div>
                </div>
                <div class="notification-content">
                    <div class="notification-settings">
                        <div class="notification-list">
                            <div class="section">
                                <h2>Notification Timing</h2>
                                <form id="notificationForm" @submit="saveNotificationSettings">
                                    <div class="form-group">
                                        <label class="form-label">Global Reminder Time (Daily Reminders)</label>
                                        <input
                                            id="globalReminderTime"
                                            v-model="globalReminderTime"
                                            type="time"
                                            class="form-input"
                                        />
                                        <p>Habits without a specific time will use this.</p>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Quiet Hours</label>
                                        <div class="time-range">
                                            <input
                                                id="quietHoursStart"
                                                v-model="quietHoursStart"
                                                type="time"
                                                class="form-input"
                                                style="width: 120px"
                                            />
                                            <span>to</span>
                                            <input
                                                id="quietHoursEnd"
                                                v-model="quietHoursEnd"
                                                type="time"
                                                class="form-input"
                                                style="width: 120px"
                                            />
                                        </div>
                                        <p>Silence all notifications during this period.</p>
                                    </div>
                                    <div class="form-actions">
                                        <button type="submit" class="btn btn-primary">Save Changes</button>
                                        <button type="button" class="btn btn-secondary" @click="loadNotificationSettings()">
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </AdminLayout>
</template>
