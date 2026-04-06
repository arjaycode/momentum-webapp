<script setup lang="ts">
import { Head, Link, useForm, usePage } from '@inertiajs/vue3';
import { ref } from 'vue';
import { signin as signinPost } from '@/actions/App/Http/Controllers/Auth/LoginController';
import { signup } from '@/routes/user';
import { request as forgotPassword } from '@/routes/password';
import { auth as googleAuth } from '@/routes/google';
import type { SharedProps } from '@/types/global';

const page = usePage<SharedProps>();
const showPw = ref(false);

const form = useForm({
    email: (page.props as unknown as { old?: { email?: string } }).old?.email ?? '',
    password: '',
    remember: false as boolean,
});

function togglePassword() {
    showPw.value = !showPw.value;
}

function submit() {
    form.post(signinPost.post());
}
</script>

<template>
    <Head title="Momentum - Build Better Habits" />

    <Head>
        <link rel="stylesheet" href="/UserSide/css/signin.css" />
    </Head>

    <div
        class="container"
        style="background: url('/UserSide/img/figma.jpg') center/cover no-repeat fixed"
    >
        <div class="left-section">
            <div class="logo-icon">
                <svg viewBox="0 0 24 24">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
            </div>
            <h1>Build Better Habits, Track<br />Your Progress</h1>
            <p>
                Join thousands of users who have transformed their<br />lives through consistent habit tracking and
                goal<br />achievement.
            </p>
            <div class="features">
                <div class="feature-item">
                    <div class="check-icon"></div>
                    <span>Daily habit tracking & reminders</span>
                </div>
                <div class="feature-item">
                    <div class="check-icon"></div>
                    <span>Visual progress analytics</span>
                </div>
                <div class="feature-item">
                    <div class="check-icon"></div>
                    <span>Social accountability features</span>
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
            <p class="subtitle">Build better habits, track your progress</p>

            <div
                v-if="page.props.flash?.success"
                id="successAlertSignin"
                class="success-alert"
                style="display: block"
            >
                <span class="success-icon">✓</span>
                {{ page.props.flash.success }}
            </div>

            <div class="welcome-title">Welcome Back</div>
            <p class="subtitle" style="margin-bottom: 20px">Sign in to continue your habit journey</p>

            <div class="social-buttons">
                <a :href="googleAuth.url()" class="social-btn"
                    ><svg width="20" height="20" viewBox="0 0 24 24">
                        <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                    </svg>
                    Continue with Google
                </a>
            </div>

            <div class="divider">or</div>

            <form @submit.prevent="submit">
                <div class="form-group">
                    <label>Email Address</label>
                    <div class="input-wrapper">
                        <span class="input-icon">✉</span>
                        <input v-model="form.email" type="email" name="email" placeholder="Enter your email" required />
                    </div>
                    <p v-if="form.errors.email" style="color: #ff4d4d; font-size: 12px; margin-top: 5px">
                        {{ form.errors.email }}
                    </p>
                </div>

                <div class="form-group">
                    <label>Password</label>
                    <div class="input-wrapper">
                        <span class="input-icon">🔒</span>
                        <input
                            v-model="form.password"
                            :type="showPw ? 'text' : 'password'"
                            name="password"
                            placeholder="Enter your password"
                            required
                        />
                        <button type="button" class="toggle-password" @click="togglePassword">👁</button>
                    </div>
                    <p v-if="form.errors.password" style="color: #ff4d4d; font-size: 12px; margin-top: 5px">
                        {{ form.errors.password }}
                    </p>
                </div>

                <div class="form-footer">
                    <label class="remember-me">
                        <input v-model="form.remember" type="checkbox" name="remember" /> Remember me
                    </label>
                    <Link :href="forgotPassword.url()" class="forgot-link">Forgot password?</Link>
                </div>

                <button type="submit" class="sign-in-btn" :disabled="form.processing">Sign In</button>
            </form>

            <div class="sign-up-link">
                Don't have an account?
                <Link :href="signup.url()">Sign up here</Link>
            </div>

            <div class="benefits">
                <div class="benefits-title">What you'll get:</div>
                <div class="benefits-list">
                    <div class="benefit-item">
                        <div class="benefit-icon green">✓</div>
                        <div class="benefit-text">Track Habits</div>
                    </div>
                    <div class="benefit-item">
                        <div class="benefit-icon blue">📊</div>
                        <div class="benefit-text">View Progress</div>
                    </div>
                    <div class="benefit-item">
                        <div class="benefit-icon purple">🏆</div>
                        <div class="benefit-text">Achievements</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
