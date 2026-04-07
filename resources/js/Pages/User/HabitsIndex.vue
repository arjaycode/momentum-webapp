<script setup lang="ts">
import { ref } from 'vue';
import { router, usePage } from '@inertiajs/vue3';
import UserLayout from '@/Layouts/UserLayout.vue';
import { Link } from '@inertiajs/vue3';
import { add as habitsAdd } from '@/routes/user/habits';
import { view as habitsView, edit as habitsEdit, deleteMethod, markDone } from '@/routes/user/habits';
import type { SharedProps } from '@/types/global';
import type { Habit } from '@/types/models';

const props = defineProps<{
    habits: (Habit & {
        streak?: number;
        isCompletedToday?: boolean;
        category?: { title?: string } | null;
    })[];
    activeHabits: number;
    currentStreak: number;
}>();

const page = usePage<SharedProps>();

const showDelete = ref(false);
const deleteId = ref<number | null>(null);

function openDelete(id: number) {
    deleteId.value = id;
    showDelete.value = true;
}

function closeDelete() {
    showDelete.value = false;
    deleteId.value = null;
}

function confirmDelete() {
    if (deleteId.value == null) return;
    router.delete(deleteMethod.url(deleteId.value));
    closeDelete();
}

function csrf(): string {
    return document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? '';
}

function markAsDone(id: number) {
    fetch(markDone.url(id), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrf(),
            'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'same-origin',
    })
        .then((r) => r.json())
        .then(() => {
            router.reload({ only: ['habits', 'activeHabits', 'currentStreak'] });
            const w = window as unknown as { refreshNotifications?: () => void };
            w.refreshNotifications?.();
        });
}
</script>

<template>
    <UserLayout
        title="My Habits"
        page-css="habits.css"
        active-page="habits"
        page-title="Habits"
        page-description="Create, Edit, Delete your habits"
    >
        <div v-if="page.props.flash?.success" class="success-alert" style="margin: 20px">
            {{ page.props.flash.success }}
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-header">
                    <span class="stat-label">Active Habits</span>
                    <div class="stat-icon green-icon">
                        <i class="fas fa-list"></i>
                    </div>
                </div>
                <div class="stat-value">{{ props.activeHabits }}</div>
            </div>
            <div class="stat-card">
                <div class="stat-header">
                    <span class="stat-label">Current Streak</span>
                    <div class="stat-icon orange-icon">
                        <i class="fas fa-fire"></i>
                    </div>
                </div>
                <div class="stat-value">
                    {{ props.currentStreak ?? 0 }} {{ (props.currentStreak ?? 0) == 1 ? 'day' : 'days' }}
                </div>
            </div>
        </div>

        <div class="habit-container">
            <table class="habit-table">
                <thead>
                    <tr>
                        <th>Habit Title</th>
                        <th>Category</th>
                        <th>Streak</th>
                        <th class="flex-between">
                            Actions
                            <Link :href="habitsAdd.url()" class="add-btn"><i class="fas fa-plus"></i>Add Habit</Link>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="habit in props.habits" :key="habit.id" :data-habit-id="habit.id">
                        <td>
                            <div class="habit-title-cell">
                                <div class="habit-title">{{ habit.habit_name }}</div>
                                <div v-if="habit.description" class="habit-description">{{ habit.description }}</div>
                                <div v-else class="habit-description no-description">No description</div>
                            </div>
                        </td>
                        <td>
                            <span
                                v-if="habit.category"
                                class="badge"
                                :class="(habit.category.title ?? 'default').toLowerCase()"
                                >{{ habit.category.title ?? 'Uncategorized' }}</span
                            >
                            <span v-else class="badge default">Uncategorized</span>
                        </td>
                        <td class="streak">
                            {{ (habit.streak ?? 0) > 0 ? '🔥 ' : '❄️ ' }}{{ habit.streak ?? 0 }}
                        </td>
                        <td>
                            <div class="action-container">
                                <div class="action-buttons">
                                    <Link :href="habitsView.url(habit.id)" class="btn btn-view">
                                        <i class="fa-solid fa-expand"></i> View
                                    </Link>
                                    <Link :href="habitsEdit.url(habit.id)" class="btn btn-edit">
                                        <i class="fa-regular fa-pen-to-square"></i> Edit
                                    </Link>
                                    <a class="btn btn-delete" href="#" @click.prevent="openDelete(habit.id)">
                                        <i class="fa-solid fa-xmark"></i> Delete
                                    </a>
                                </div>
                                <div class="mark-as-done-container">
                                    <button
                                        v-if="habit.isCompletedToday"
                                        class="btn btn-completed"
                                        type="button"
                                        disabled
                                    >
                                        <i class="fa-solid fa-check-circle"></i> Completed
                                    </button>
                                    <button v-else type="button" class="btn btn-done" @click="markAsDone(habit.id)">
                                        <i class="fa-solid fa-check"></i> Mark As Done
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr v-if="!props.habits?.length">
                        <td colspan="4" style="text-align: center; padding: 2rem">
                            No habits yet.
                            <Link :href="habitsAdd.url()">Create your first habit</Link> to get started!
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-show="showDelete" id="deleteModal" class="modal-overlay" style="display: flex">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Delete Habit</h3>
                    <span class="close-btn" @click="closeDelete">&times;</span>
                </div>
                <div class="modal-body">
                    <p>Are you sure you want to delete this habit?</p>
                    <p class="modal-description">This action will permanently remove the habit and its streak history.</p>
                </div>
                <div class="modal-footer">
                    <button type="button" id="cancelBtn" class="btn btn-secondary" @click="closeDelete">Cancel</button>
                    <button type="button" id="confirmDeleteBtn" class="btn btn-danger" @click="confirmDelete">
                        Yes, Delete
                    </button>
                </div>
            </div>
        </div>
    </UserLayout>
</template>
