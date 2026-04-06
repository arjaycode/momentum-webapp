<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { Link, useForm } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import adminRoutes from '@/routes/admin';
import { update } from '@/actions/App/Http/Controllers/Notes/NoteController';

const props = defineProps<{
    note: {
        id: number;
        user_id: number;
        habit_id: number | null;
        message: string;
    };
    users: { id: number; firstname: string; lastname: string; email: string }[];
    habits: {
        id: number;
        name: string;
        user: { firstname: string; lastname: string };
        category: { title: string } | null;
    }[];
}>();

const form = useForm({
    user_id: props.note.user_id,
    habit_id: props.note.habit_id ?? ('' as const),
    message: props.note.message,
});

function submit() {
    form
        .transform((data) => {
            const d: Record<string, unknown> = { ...data };
            d.user_id = Number(d.user_id);
            if (d.habit_id === '' || d.habit_id === undefined) {
                d.habit_id = null;
            } else {
                d.habit_id = Number(d.habit_id);
            }
            return d;
        })
        .put(update.put({ id: props.note.id }));
}

let scriptEl: HTMLScriptElement | null = null;
onMounted(() => {
    scriptEl = document.createElement('script');
    scriptEl.src = '/AdminSide/js/note_edit.js';
    document.body.appendChild(scriptEl);
});
onUnmounted(() => scriptEl?.remove());
</script>

<template>
    <AdminLayout
        title="Edit Note - Momentum"
        page-css="note_edit.css"
        active="notes"
        page-title="Edit Note"
        page-description="Update note"
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
                            <select v-model="form.user_id" class="select-input" required>
                                <option value="">Select User</option>
                                <option v-for="u in users" :key="u.id" :value="u.id">
                                    {{ u.firstname }} {{ u.lastname }} ({{ u.email }})
                                </option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>For Habit (Optional)</label>
                            <select v-model="form.habit_id" class="select-input">
                                <option value="">Select Habit (Optional)</option>
                                <option v-for="h in habits" :key="h.id" :value="h.id">
                                    {{ h.name }} - {{ h.user.firstname }} {{ h.user.lastname }}
                                    <template v-if="h.category"> ({{ h.category.title }})</template>
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Note <span class="required">*</span></label>
                        <textarea v-model="form.message" class="textarea-input" required />
                    </div>
                    <div class="form-actions">
                        <Link :href="adminRoutes.noteManagement.url()" class="btn btn-cancel">Cancel</Link>
                        <button type="submit" class="btn btn-primary" :disabled="form.processing">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </main>
    </AdminLayout>
</template>
