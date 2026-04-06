<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useForm } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import { store } from '@/actions/App/Http/Controllers/User/UserController';

const form = useForm({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: 'user',
    status: 'active',
});

function submit() {
    form.post(store.post());
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
        page-css="user-management.css"
        active="users"
        page-title="Add New User"
        page-description="Create a new user account"
    >
        <main class="main-content" style="max-width: 640px">
            <form class="auth-form" @submit.prevent="submit">
                <div class="form-group">
                    <label>First name</label>
                    <input v-model="form.firstname" type="text" required />
                    <span v-if="form.errors.firstname" class="error">{{ form.errors.firstname }}</span>
                </div>
                <div class="form-group">
                    <label>Last name</label>
                    <input v-model="form.lastname" type="text" required />
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input v-model="form.email" type="email" required />
                    <span v-if="form.errors.email" class="error">{{ form.errors.email }}</span>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input v-model="form.password" type="password" required />
                </div>
                <div class="form-group">
                    <label>Role</label>
                    <select v-model="form.role">
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Status</label>
                    <select v-model="form.status">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="blocked">Blocked</option>
                    </select>
                </div>
                <button type="submit" class="btn-primary" :disabled="form.processing">Create User</button>
            </form>
        </main>
    </AdminLayout>
</template>
