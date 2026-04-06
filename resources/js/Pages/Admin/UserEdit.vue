<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useForm } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
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

function submit() {
    const data = { ...form.data() };
    if (!data.password) {
        delete (data as Record<string, unknown>).password;
    }
    form.transform(() => data).put(update.put(props.user.id));
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
        page-css="user-management.css"
        active="users"
        page-title="Edit User"
        page-description="Update user account"
    >
        <main class="main-content" style="max-width: 640px">
            <form @submit.prevent="submit">
                <div class="form-group">
                    <label>First name</label>
                    <input v-model="form.firstname" type="text" required />
                </div>
                <div class="form-group">
                    <label>Last name</label>
                    <input v-model="form.lastname" type="text" required />
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input v-model="form.email" type="email" required />
                </div>
                <div class="form-group">
                    <label>New password (optional)</label>
                    <input v-model="form.password" type="password" />
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
                <button type="submit" class="btn-primary" :disabled="form.processing">Save</button>
            </form>
        </main>
    </AdminLayout>
</template>
