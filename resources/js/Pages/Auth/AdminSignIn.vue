<script setup lang="ts">
import { Head, useForm } from '@inertiajs/vue3';
import { ref } from 'vue';
import { signin as signinPost } from '@/actions/App/Http/Controllers/Auth/LoginController';

const showPw = ref(false);
const form = useForm({
    email: '',
    password: '',
    remember: false as boolean,
});

function submit() {
    form.post(signinPost.post());
}
</script>

<template>
    <Head title="Admin Sign In - Momentum" />
    <Head>
        <link rel="stylesheet" href="/AdminSide/css/admin_signin.css" />
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
    </Head>

    <div class="auth-container">
        <div id="loginCard" class="auth-card">
            <div class="auth-logo">
                <i class="fas fa-chart-line"></i>
            </div>

            <h1 class="auth-title">Momentum Admin</h1>
            <p class="auth-subtitle">Secure admin panel access</p>

            <form id="signinForm" class="auth-form active" @submit.prevent="submit">
                <div class="form-group">
                    <label for="signinEmail">Email or Username</label>
                    <div class="input-wrapper">
                        <i class="fas fa-user input-icon"></i>
                        <input
                            id="signinEmail"
                            v-model="form.email"
                            type="text"
                            name="email"
                            placeholder="Enter email or username"
                            class="auth-input"
                            required
                        />
                    </div>
                    <p v-if="form.errors.email" style="color: #c00; font-size: 12px">{{ form.errors.email }}</p>
                </div>

                <div class="form-group">
                    <label for="signinPassword">Password</label>
                    <div class="input-wrapper">
                        <i class="fas fa-lock input-icon"></i>
                        <input
                            id="signinPassword"
                            v-model="form.password"
                            :type="showPw ? 'text' : 'password'"
                            name="password"
                            placeholder="Enter password"
                            class="auth-input"
                            required
                        />
                        <button type="button" class="password-toggle" @click="showPw = !showPw">
                            <i :class="showPw ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                        </button>
                    </div>
                </div>

                <div class="form-footer">
                    <label class="remember-me">
                        <input v-model="form.remember" id="rememberMe" type="checkbox" name="remember" />
                        <span>Remember me</span>
                    </label>
                </div>
                <button type="submit" class="auth-btn" :disabled="form.processing">Sign In</button>
            </form>
        </div>
    </div>
</template>
