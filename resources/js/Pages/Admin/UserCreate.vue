<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { Link, useForm, router } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import adminRoutes from '@/routes/admin';
import { store } from '@/actions/App/Http/Controllers/User/UserController';

const form = useForm({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: 'user',
    status: 'active',
});

const showPassword = ref(false);

function togglePassword() {
    const input = document.getElementById('password') as HTMLInputElement;
    if (input) {
        showPassword.value = !showPassword.value;
        input.type = showPassword.value ? 'text' : 'password';
    }
}

function submit() {
    form.post(store.post(), {
        onSuccess: () => router.visit(adminRoutes.userManagement.url())
    });
}

let scriptEl: HTMLScriptElement | null = null;
onMounted(() => {
    scriptEl = document.createElement('script');
    scriptEl.src = '/AdminSide/js/create-user.js';
    document.body.appendChild(scriptEl);
});
onUnmounted(() => scriptEl?.remove());
</script>

<template>
    <AdminLayout
        title="Add User - Momentum"
        page-css="create-user.css"
        active="users"
        page-title="Add New User"
        page-description="Create a new user account"
    >
        <main class="main-content">
            <div class="back-section">
                <Link :href="adminRoutes.userManagement.url()" class="back-btn">
                    <i class="fas fa-arrow-left"></i>
                    Back to User Management
                </Link>
            </div>

            <div class="form-container">
                <form class="user-form" @submit.prevent="submit">
                    <!-- Name Fields -->
                    <div class="form-row">
                        <div class="form-group">
                            <label for="firstName">First Name</label>
                            <input
                                id="firstName"
                                v-model="form.firstname"
                                type="text"
                                placeholder="Enter first name"
                                class="form-input"
                                required
                            />
                            <span v-if="form.errors.firstname" class="error-message">{{ form.errors.firstname }}</span>
                        </div>
                        <div class="form-group">
                            <label for="lastName">Last Name</label>
                            <input
                                id="lastName"
                                v-model="form.lastname"
                                type="text"
                                placeholder="Enter last name"
                                class="form-input"
                                required
                            />
                        </div>
                    </div>

                    <!-- Email Address -->
                    <div class="form-group">
                        <label for="email">Email Address</label>
                        <input
                            id="email"
                            v-model="form.email"
                            type="email"
                            placeholder="Enter email address"
                            class="form-input"
                            required
                        />
                        <span v-if="form.errors.email" class="error-message">{{ form.errors.email }}</span>
                    </div>

                    <!-- Password -->
                    <div class="form-group">
                        <label for="password">Password</label>
                        <div class="password-input-wrapper">
                            <input
                                id="password"
                                v-model="form.password"
                                type="password"
                                placeholder="Enter password"
                                class="form-input"
                                required
                            />
                            <button type="button" class="password-toggle" @click.prevent="togglePassword">
                                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Role and Status -->
                    <div class="form-row">
                        <div class="form-group">
                            <label for="role">Role</label>
                            <select id="role" v-model="form.role" class="form-select" required>
                                <option value="">Select role</option>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="status">Status</label>
                            <select id="status" v-model="form.status" class="form-select" required>
                                <option value="">Select status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="blocked">Blocked</option>
                            </select>
                        </div>
                    </div>

                    <!-- Form Actions -->
                    <div class="form-actions">
                        <Link :href="adminRoutes.userManagement.url()" class="btn-cancel">Cancel</Link>
                        <button type="submit" class="btn-create" :disabled="form.processing">
                            <i class="fas fa-plus"></i>
                            Create User
                        </button>
                    </div>
                </form>
            </div>
        </main>
    </AdminLayout>
</template>
