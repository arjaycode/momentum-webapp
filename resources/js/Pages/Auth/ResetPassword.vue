<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import { request as forgotPassword } from '@/routes/password';
import { update as passwordUpdate } from '@/routes/password';

const props = defineProps<{
    token: string;
    email?: string;
}>();

const form = useForm({
    token: props.token,
    email: props.email ?? '',
    password: '',
    password_confirmation: '',
});

function submit() {
    form.post(passwordUpdate.post());
}
</script>

<template>
    <Head title="Momentum - Reset Password" />
    <Head>
        <link rel="stylesheet" href="/UserSide/css/signin.css" />
    </Head>

    <div class="container" style="background: url('/UserSide/img/figma.jpg') center/cover no-repeat fixed">
        <div class="left-section">
            <div class="logo-icon">
                <svg viewBox="0 0 24 24">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
            </div>
            <h1>Reset Your<br />Password</h1>
            <p>Create a new secure password to continue your<br />habit-building journey.</p>
            <div class="features">
                <div class="feature-item">
                    <div class="check-icon"></div>
                    <span>Choose a strong password</span>
                </div>
                <div class="feature-item">
                    <div class="check-icon"></div>
                    <span>At least 8 characters long</span>
                </div>
                <div class="feature-item">
                    <div class="check-icon"></div>
                    <span>Keep it secure and memorable</span>
                </div>
            </div>
        </div>

        <div class="login-card">
            <div class="card-logo">
                <svg viewBox="0 0 24 24">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
            </div>
            <h2>Momentum</h2>
            <p class="subtitle">Reset your password</p>

            <div class="welcome-title">Create New Password</div>
            <p class="subtitle" style="margin-bottom: 20px">Enter your new password below</p>

            <form @submit.prevent="submit">
                <input type="hidden" name="token" :value="form.token" />

                <div class="form-group">
                    <label>Email Address</label>
                    <div class="input-wrapper">
                        <span class="input-icon">✉</span>
                        <input v-model="form.email" type="email" name="email" readonly required />
                    </div>
                    <p v-if="form.errors.email" style="color: #ff4d4d; font-size: 12px">{{ form.errors.email }}</p>
                </div>

                <div class="form-group">
                    <label>Password</label>
                    <div class="input-wrapper">
                        <span class="input-icon">🔒</span>
                        <input
                            v-model="form.password"
                            type="password"
                            name="password"
                            placeholder="New password"
                            required
                        />
                    </div>
                    <p v-if="form.errors.password" style="color: #ff4d4d; font-size: 12px">{{ form.errors.password }}</p>
                </div>

                <div class="form-group">
                    <label>Confirm Password</label>
                    <div class="input-wrapper">
                        <span class="input-icon">🔒</span>
                        <input
                            v-model="form.password_confirmation"
                            type="password"
                            name="password_confirmation"
                            placeholder="Confirm password"
                            required
                        />
                    </div>
                </div>

                <button type="submit" class="sign-in-btn" :disabled="form.processing">Reset Password</button>
            </form>

            <div class="sign-up-link">
                <Link :href="forgotPassword.url()">Request a new link</Link>
            </div>
        </div>
    </div>
</template>
