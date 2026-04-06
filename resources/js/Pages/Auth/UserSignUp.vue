<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import { ref } from 'vue';
import { signup as signupSubmit } from '@/actions/App/Http/Controllers/Auth/SignupController';
import { signin } from '@/routes/user';
import { auth as googleAuth } from '@/routes/google';

const showPw = ref(false);

const form = useForm({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
});

function submit() {
    form.post(signupSubmit.post());
}
</script>

<template>
    <Head title="Momentum — Create Account" />
    <Head>
        <link rel="stylesheet" href="/UserSide/css/signup.css" />
    </Head>

    <div
        class="container"
        role="main"
        style="background: url('/UserSide/img/figma.jpg') center/cover no-repeat fixed"
    >
        <div class="bg-rings" aria-hidden="true"></div>
        <section class="promo" aria-label="Marketing">
            <div class="card-logo">
                <svg viewBox="0 0 24 24">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
            </div>
            <h2>Momentum</h2>

            <h1>Build Better Habits, Track<br />Your Progress</h1>
            <p class="lead">
                Join thousands of users who transformed their lives through consistent habit tracking and
                progress-focused features.
            </p>

            <ul>
                <li><span class="dot">✓</span> Daily habit tracking & reminders</li>
                <li><span class="dot">✓</span> Visual progress analytics</li>
                <li><span class="dot">✓</span> Social accountability features</li>
            </ul>
        </section>

        <aside class="card" aria-label="Create Account">
            <div class="card-logo">
                <svg viewBox="0 0 24 24">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
            </div>

            <h2>Create Account</h2>
            <p class="subtitle">Start your habit-building journey today</p>

            <form @submit.prevent="submit">
                <div class="form-grid" role="group" aria-label="Name and email">
                    <div>
                        <label for="firstName">First Name</label>
                        <input
                            id="firstName"
                            v-model="form.firstname"
                            name="firstname"
                            type="text"
                            placeholder="John"
                        />
                    </div>
                    <div>
                        <label for="lastName">Last Name</label>
                        <input
                            id="lastName"
                            v-model="form.lastname"
                            name="lastname"
                            type="text"
                            placeholder="Doe"
                        />
                    </div>

                    <div class="full-row">
                        <label for="email">Email Address</label>
                        <input
                            id="email"
                            v-model="form.email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                        />
                    </div>

                    <div class="full-row pw-row">
                        <label for="password">Password</label>
                        <input
                            id="password"
                            v-model="form.password"
                            name="password"
                            :type="showPw ? 'text' : 'password'"
                            placeholder="Create a strong password"
                            aria-describedby="pwHelp"
                        />
                        <button type="button" class="pw-toggle" @click="showPw = !showPw">
                            {{ showPw ? 'Hide' : 'Show' }}
                        </button>
                        <div id="pwHelp" style="font-size: 12px; color: var(--muted); margin-top: 6px">
                            Password should be at least 8 characters long
                        </div>
                    </div>
                </div>
                <div v-if="Object.keys(form.errors).length">
                    <ul class="msg">
                        <li v-for="(err, k) in form.errors" :key="k" class="msg error">{{ err }}</li>
                    </ul>
                </div>
                <div>
                    <button class="btn btn-primary" type="submit" :disabled="form.processing">Create Account</button>
                </div>

                <div class="or-row" aria-hidden="true" style="margin-top: 10px">
                    <div class="line"></div>
                    <div>Or continue with</div>
                    <div class="line"></div>
                </div>

                <div class="socials">
                    <a :href="googleAuth.url()" type="button" class="social-btn"> G Google </a>
                </div>

                <div class="signin">
                    Already have an account?
                    <Link :href="signin.url()">Sign in here</Link>
                </div>
            </form>
        </aside>
    </div>
</template>
