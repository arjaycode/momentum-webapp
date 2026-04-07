<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { Link, useForm, router } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import adminRoutes from '@/routes/admin';
import { update } from '@/actions/App/Http/Controllers/User/UserController';

const props = defineProps<{
    user: {
        id: number;
        firstname: string;
        lastname: string;
        email: string;
        role: string;
        status: string;
    };
}>();

const form = useForm({
    firstname: props.user.firstname,
    lastname: props.user.lastname,
    email: props.user.email,
    role: props.user.role,
    status: props.user.status,
    password: '',
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
    const data = { ...form.data() };
    if (!data.password) {
        delete (data as Record<string, unknown>).password;
    }
    form.transform(() => data).put(update.put(props.user.id), {
        onSuccess: () => router.visit(adminRoutes.userManagement.url())
    });
}

let scriptEl: HTMLScriptElement | null = null;
onMounted(() => {
    scriptEl = document.createElement('script');
    scriptEl.src = '/AdminSide/js/edit-user.js';
    document.body.appendChild(scriptEl);
});
onUnmounted(() => scriptEl?.remove());
</script>

<template>
    <AdminLayout
        title="Edit User - Momentum"
        page-css="create-user.css"
        active="users"
        page-title="Edit User"
        page-description="Edit the details of this user"
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
                                placeholder="Leave blank to keep the current password..."
                                class="form-input"
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
                            <i class="fas fa-check"></i>
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </main>
    </AdminLayout>
</template>
