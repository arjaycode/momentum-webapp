<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue';
import { Link, router } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import adminRoutes from '@/routes/admin';
import { destroy } from '@/actions/App/Http/Controllers/Notes/NoteController';

type NoteRow = {
    id: number;
    message: string;
    user: {
        id: number;
        firstname: string;
        lastname: string;
        email: string;
        avatar: string | null;
    };
    habit: {
        id: number;
        category: { title: string } | null;
    } | null;
};

const props = defineProps<{
    notes: NoteRow[];
}>();

const total = computed(() => props.notes.length);

function avatarUrl(u: NoteRow['user']) {
    if (u.avatar) return `/storage/${u.avatar}`;
    const name = encodeURIComponent(`${u.firstname} ${u.lastname}`);
    return `https://ui-avatars.com/api/?name=${name}&background=random`;
}

function del(note: NoteRow) {
    if (!confirm('Delete this note?')) return;
    router.delete(destroy.delete({ id: note.id }));
}

let scriptEl: HTMLScriptElement | null = null;
onMounted(() => {
    scriptEl = document.createElement('script');
    scriptEl.src = '/AdminSide/js/notes-management.js';
    document.body.appendChild(scriptEl);
});
onUnmounted(() => scriptEl?.remove());
</script>

<template>
    <AdminLayout
        title="Notes Management - Momentum"
        page-css="notes-management.css"
        active="notes"
        page-title="Notes Management"
        page-description="Monitor, manage, and organize notes created by users"
    >
        <main class="main-content">
            <div class="stats-section">
                <div class="stat-card-single">
                    <div class="stat-info">
                        <span class="stat-label">Total Created Notes</span>
                        <div class="stat-value">{{ total }}</div>
                    </div>
                    <div class="stat-icon blue">
                        <i class="fas fa-file-alt"></i>
                    </div>
                </div>
            </div>

            <div class="controls-section">
                <div class="search-box-container">
                    <i class="fas fa-search"></i>
                    <input id="notesSearch" type="text" placeholder="Search categories..." />
                </div>
                <Link :href="adminRoutes.noteManagement.create.url()" class="btn-primary">
                    <i class="fas fa-plus"></i> Add New Note
                </Link>
            </div>

            <div id="notesList" class="notes-list">
                <div v-for="note in notes" :key="note.id" class="note-item">
                    <div class="note-header">
                        <div class="user-info">
                            <img
                                :src="avatarUrl(note.user)"
                                :alt="note.user.firstname"
                                class="user-avatar"
                            />
                            <div class="user-details">
                                <div class="user-name">
                                    {{ note.user.firstname }} {{ note.user.lastname }}
                                </div>
                                <div class="user-id">
                                    ID: #{{ String(note.user.id).padStart(4, '0') }}
                                </div>
                            </div>
                        </div>
                        <div class="user-email">{{ note.user.email }}</div>
                        <div class="note-actions">
                            <Link
                                :href="adminRoutes.noteManagement.edit.url({ id: note.id })"
                                class="action-btn edit-btn"
                                title="Edit"
                            >
                                <i class="fas fa-edit"></i>
                            </Link>
                            <button
                                type="button"
                                class="action-btn delete-btn"
                                title="Delete"
                                @click="del(note)"
                            >
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <div class="note-body">{{ note.message }}</div>
                </div>
            </div>
        </main>
    </AdminLayout>
</template>
