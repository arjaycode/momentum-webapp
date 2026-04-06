<script setup lang="ts">
import { Head, Link, useForm, usePage } from '@inertiajs/vue3';
import { signin } from '@/routes/user';
import { email as forgotEmailPost } from '@/routes/password';
import type { SharedProps } from '@/types/global';

const page = usePage<SharedProps>();

const form = useForm({
    email: '',
});

function submit() {
    form.post(forgotEmailPost.post());
}
</script>

<template>
    <Head title="Reset Habit Tracker Password Recovery" />
    <Head>
        <link rel="stylesheet" href="/UserSide/css/forgotpassword.css" />
    </Head>

    <div class="body-reset">
        <main class="main-container">
            <div class="header-section">
                <h1 class="header-title">
                    Lost Your <span class="text-primary-color">Habit</span> Password?
                </h1>
                <p class="header-subtitle">
                    Don't worry, we've all been there! Let's get you back on track with your habit-building journey.
                </p>
            </div>

            <div class="content-grid">
                <div class="col-left">
                    <div class="form-card">
                        <div class="form-header">
                            <div class="form-icon-wrapper">
                                <i class="form-icon-key">🔑</i>
                            </div>
                            <h2 class="form-title">Password Reset</h2>
                            <p class="form-subtitle">Enter your email and we'll send you a reset link.</p>
                        </div>

                        <form @submit.prevent="submit">
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input
                                    id="email"
                                    v-model="form.email"
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="you@example.com"
                                />
                                <p v-if="form.errors.email" style="color: #c00; font-size: 13px">{{ form.errors.email }}</p>
                            </div>
                            <button type="submit" class="submit-btn" :disabled="form.processing">Send reset link</button>
                        </form>

                        <p v-if="page.props.flash?.success" class="msg success" style="margin-top: 12px">
                            {{ page.props.flash.success }}
                        </p>

                        <p style="margin-top: 16px">
                            <Link :href="signin.url()">Back to sign in</Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
