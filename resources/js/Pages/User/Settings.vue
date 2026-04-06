<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';
import UserLayout from '@/Layouts/UserLayout.vue';
import * as profileRoutes from '@/routes/user/profile';
import type { SharedProps } from '@/types/global';

const page = usePage<SharedProps>();

const props = defineProps<{
    user: {
        id: number;
        firstname: string;
        lastname: string;
        email: string;
        avatar?: string | null;
        created_at: string;
    };
    totalHabits: number;
    totalCompletions: number;
    accountAge: number;
}>();

const title = computed(
    () => `Settings | ${props.user.firstname} ${props.user.lastname}`,
);

const avatarSrc = computed(() => {
    if (props.user.avatar) return `/storage/${props.user.avatar}`;
    const n = encodeURIComponent(`${props.user.firstname} ${props.user.lastname}`);
    return `https://ui-avatars.com/api/?name=${n}&background=random`;
});

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

function saveProfile() {
    profileForm.put(profileRoutes.update.put());
}

function savePassword() {
    passwordForm.put(profileRoutes.password.put());
}

let scriptEl: HTMLScriptElement | null = null;
onMounted(() => {
    (window as unknown as { showScreen?: unknown }).showScreen = undefined;
    scriptEl = document.createElement('script');
    scriptEl.src = '/UserSide/js/settings.js';
    document.body.appendChild(scriptEl);
});

onUnmounted(() => {
    scriptEl?.remove();
});

async function onAvatarChange(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const body = new FormData();
    body.append('avatar', file);
    await fetch(profileRoutes.avatar.url(), {
        method: 'POST',
        body,
        headers: { 'X-CSRF-TOKEN': document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? '' },
        credentials: 'same-origin',
    });
    window.location.reload();
}
</script>

<template>
    <UserLayout
        :title="title"
        page-css="settings.css"
        active-page="settings"
        page-title="Settings"
        page-description="Set you app preferences, change password, edit profile, etc."
    >
        <div v-if="page.props.flash?.success" class="success-alert" style="margin: 20px">
            <span class="success-icon" style="font-weight: bold; font-size: 1.2em; margin-right: 10px">✓</span>
            {{ page.props.flash.success }}
        </div>

        <div id="password-screen" class="screen">
            <div class="content">
                <button
                    type="button"
                    class="back-btn"
                    onclick="showScreen('profile-screen', document.querySelector('.tabs .tab[data-screen=\'profile-screen\']'))"
                >
                    ← Back
                </button>
                <div class="section" style="max-width: 600px">
                    <form @submit.prevent="savePassword">
                        <div class="form-group">
                            <label class="form-label">Current Password</label>
                            <input v-model="passwordForm.current_password" type="password" class="form-input" required />
                            <span v-if="passwordForm.errors.current_password" style="color: #ef4444; font-size: 12px">{{
                                passwordForm.errors.current_password
                            }}</span>
                        </div>
                        <div class="form-group">
                            <label class="form-label">New Password</label>
                            <input v-model="passwordForm.password" type="password" class="form-input" required />
                            <span v-if="passwordForm.errors.password" style="color: #ef4444; font-size: 12px">{{
                                passwordForm.errors.password
                            }}</span>
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
                            <button type="submit" class="btn btn-primary" :disabled="passwordForm.processing">
                                Change Password
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div id="profile-screen" class="screen active">
            <div class="tabs">
                <div class="tab active" data-screen="profile-screen" onclick="showScreen('profile-screen', this)">
                    Profile
                </div>
                <div class="tab" data-screen="notifications-screen" onclick="showScreen('notifications-screen', this)">
                    Notifications
                </div>
            </div>

            <div class="profile-content">
                <div class="profile-section">
                    <div class="profile-left">
                        <div class="section">
                            <h2 style="margin-bottom: 24px; font-size: 16px; font-weight: 600">Profile Information</h2>
                            <div class="profile-header">
                                <div class="profile-avatar">
                                    <img
                                        id="profileAvatar"
                                        :src="avatarSrc"
                                        alt="Profile"
                                        style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover"
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
                                    <div class="profile-name">{{ user.firstname }} {{ user.lastname }}</div>
                                    <div class="profile-member">Member since {{ new Date(user.created_at).toLocaleDateString() }}</div>
                                    <label for="avatarInput" class="btn btn-secondary" style="margin-top: 8px; cursor: pointer; display: inline-block"
                                        >Change photo</label
                                    >
                                </div>
                            </div>

                            <form @submit.prevent="saveProfile">
                                <div class="form-row">
                                    <div class="form-group">
                                        <label class="form-label">First Name</label>
                                        <input v-model="profileForm.firstname" type="text" class="form-input" required />
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label">Last Name</label>
                                        <input v-model="profileForm.lastname" type="text" class="form-input" required />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Email</label>
                                    <input v-model="profileForm.email" type="email" class="form-input" required />
                                </div>
                                <div class="form-actions">
                                    <button type="submit" class="btn btn-primary" :disabled="profileForm.processing">Save Changes</button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div class="profile-right">
                        <div class="section">
                            <h2 style="margin-bottom: 24px; font-size: 16px; font-weight: 600">Account Statistics</h2>
                            <div style="display: grid; gap: 16px; margin-bottom: 24px">
                                <div style="padding: 16px; background: #f8f9fa; border-radius: 8px">
                                    <div style="font-size: 12px; color: #666; margin-bottom: 4px">Total Habits</div>
                                    <div style="font-size: 24px; font-weight: 600; color: #333">{{ totalHabits }}</div>
                                </div>
                                <div style="padding: 16px; background: #f8f9fa; border-radius: 8px">
                                    <div style="font-size: 12px; color: #666; margin-bottom: 4px">Total Completions</div>
                                    <div style="font-size: 24px; font-weight: 600; color: #333">{{ totalCompletions }}</div>
                                </div>
                                <div style="padding: 16px; background: #f8f9fa; border-radius: 8px">
                                    <div style="font-size: 12px; color: #666; margin-bottom: 4px">Account Age</div>
                                    <div style="font-size: 24px; font-weight: 600; color: #333">
                                        {{ accountAge }}
                                        <span style="font-size: 14px; color: #666; font-weight: 500">days</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="section">
                            <h2 style="margin-bottom: 24px; font-size: 16px; font-weight: 600">Preferences</h2>
                            <div class="preference-item">
                                <div>
                                    <h3 style="font-size: 14px; font-weight: 500; margin-bottom: 4px">Change Password</h3>
                                    <p style="font-size: 12px; color: #666">You can change your password here</p>
                                </div>
                                <button
                                    type="button"
                                    class="btn btn-secondary"
                                    onclick="showScreen('password-screen', document.querySelector('.tabs .tab[data-screen=\'profile-screen\']'))"
                                >
                                    Change Password
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="notifications-screen" class="screen">
            <div class="tabs">
                <div class="tab" data-screen="profile-screen" onclick="showScreen('profile-screen', this)">Profile</div>
                <div class="tab active" data-screen="notifications-screen" onclick="showScreen('notifications-screen', this)">
                    Notifications
                </div>
            </div>
            <div class="content"><p style="padding: 24px">Notification preferences (use existing app settings).</p></div>
        </div>
    </UserLayout>
</template>
