<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { Link, useForm } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import adminRoutes from '@/routes/admin';
import { store } from '@/actions/App/Http/Controllers/Notes/NoteController';

defineProps<{
    users: { id: number; firstname: string; lastname: string; email: string }[];
    habits: {
        id: number;
        name: string;
        user: { firstname: string; lastname: string };
        category: { title: string } | null;
    }[];
}>();

const form = useForm({
    user_id: '' as string | number,
    habit_id: '' as string | number | '',
    message: '',
});

function submit() {
    form.transform((data) => {
        const d: Record<string, unknown> = { ...data };
        d.user_id = Number(d.user_id);
        if (d.habit_id === '' || d.habit_id === undefined) {
            d.habit_id = null;
        } else {
            d.habit_id = Number(d.habit_id);
        }
        return d;
    }).post(store.post());
}

let scriptEl: HTMLScriptElement | null = null;
onMounted(() => {
    scriptEl = document.createElement('script');
    scriptEl.src = '/AdminSide/js/note_add.js';
    document.body.appendChild(scriptEl);
});
onUnmounted(() => scriptEl?.remove());
</script>

<template>
    <AdminLayout
        title="Add New User Note - Momentum"
        page-css="note_add.css"
        active="notes"
        page-title="Add New Note"
        page-description="Manage and organize user notes"
    >
        <main class="main-content">
            <div class="back-section">
                <Link :href="adminRoutes.noteManagement.url()" class="back-btn">
                    <i class="fas fa-arrow-left"></i>
                    Back to Notes Management
                </Link>
            </div>
            <div class="form-container">
                <form @submit.prevent="submit">
                    <div class="form-row">
                        <div class="form-group">
                            <label>For User <span class="required">*</span></label>
                            <select id="userSelect" v-model="form.user_id" class="select-input" :class="{ 'is-error': form.errors.user_id }" required>
                                <option value="">Select User</option>
                                <option v-for="u in users" :key="u.id" :value="u.id">
                                    {{ u.firstname }} {{ u.lastname }} ({{ u.email }})
                                </option>
                            </select>
                            <span v-if="form.errors.user_id" class="error-message">{{ form.errors.user_id }}</span>
                        </div>
                        <div class="form-group">
                            <label>For Habit (Optional)</label>
                            <select id="habitSelect" v-model="form.habit_id" class="select-input">
                                <option value="">Select Habit (Optional)</option>
                                <option v-for="h in habits" :key="h.id" :value="h.id">
                                    {{ h.name }} - {{ h.user?.firstname ?? 'Unknown' }} {{ h.user?.lastname ?? '' }}{{ h.category ? ` (${h.category.title})` : '' }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Note <span class="required">*</span></label>
                        <textarea
                            id="noteText"
                            v-model="form.message"
                            class="textarea-input"
                            :class="{ 'is-error': form.errors.message }"
                            placeholder="Put your note here..."
                            required
                        ></textarea>
                        <span v-if="form.errors.message" class="error-message">{{ form.errors.message }}</span>
                    </div>
                    <div class="form-actions">
                        <Link :href="adminRoutes.noteManagement.url()" class="btn btn-cancel">Cancel</Link>
                        <button type="submit" class="btn btn-primary" :disabled="form.processing">
                            Create Note
                        </button>
                    </div>
                </form>
            </div>
        </main>
    </AdminLayout>
</template>

<style scoped>
.error-message {
    color: #dc2626;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: block;
}

.select-input.is-error,
.textarea-input.is-error {
    border-color: #dc2626 !important;
    background-color: #fee2e2;
}

.required {
    color: #dc2626;
}
</style>
