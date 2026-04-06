<script setup lang="ts">
import { computed, ref } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';
import UserLayout from '@/Layouts/UserLayout.vue';
import { store } from '@/routes/user/habits';
import type { Habit } from '@/types/models';

const props = defineProps<{
    categories: { id: number; title: string }[];
    user_id: number;
}>();

const page = usePage();

const redirectTo = computed(() => {
    try {
        return new URL(page.url, window.location.origin).searchParams.get('redirect_to');
    } catch {
        return null;
    }
});

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const form = useForm({
    name: '',
    category_id: null as number | null,
    description: '',
    enable_push_notifications: false,
    target_days: [] as string[],
    redirect_to: '' as string,
    temp_notes: [] as string[],
});

function toggleDay(d: string) {
    const i = form.target_days.indexOf(d);
    if (i >= 0) {
        form.target_days.splice(i, 1);
    } else {
        form.target_days.push(d);
    }
}

function dayOn(d: string) {
    return form.target_days.includes(d);
}

function submit() {
    form.redirect_to = redirectTo.value ?? '';
    form.post(store.post());
}

const noteDraft = ref('');
const showNote = ref(false);

function addTempNote() {
    if (!noteDraft.value.trim()) return;
    form.temp_notes.push(noteDraft.value.trim());
    noteDraft.value = '';
    showNote.value = false;
}
</script>

<template>
    <UserLayout
        title="Add Habit"
        page-css="habits.css"
        active-page="habits"
        page-title="Add New Habit"
        page-description="Create a new habit to master"
    >
        <form id="habitForm" @submit.prevent="submit">
            <input v-if="redirectTo" type="hidden" name="redirect_to" :value="redirectTo" />

            <div class="content-area">
                <div class="details-section">
                    <div class="form-group">
                        <label class="form-label">Habit Title</label>
                        <input v-model="form.name" type="text" class="form-input" required />
                        <span v-if="form.errors.name" style="color: #c00; font-size: 12px">{{ form.errors.name }}</span>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Habit Category</label>
                        <select v-model="form.category_id" class="form-input">
                            <option :value="null">Select Category (Optional)</option>
                            <option v-for="c in props.categories" :key="c.id" :value="c.id">{{ c.title }}</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label class="form-label">Description</label>
                        <textarea v-model="form.description" class="form-textarea"></textarea>
                    </div>

                    <div class="notification-section">
                        <div class="notification-header">
                            <div class="notification-icon">🔔</div>
                            <div class="notification-content">
                                <div class="notification-title">Push Notifications</div>
                                <div class="notification-text">Get reminder when it's time for your habit</div>
                            </div>
                            <label class="notification-toggle">
                                <input v-model="form.enable_push_notifications" type="checkbox" value="1" />
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                    </div>

                    <div class="notes-section">
                        <div class="notes-header">
                            <h2 class="notes-title">Quick Notes</h2>
                            <button type="button" class="add-note-btn" @click="showNote = !showNote">+</button>
                        </div>
                        <div v-show="showNote" class="note-input-area">
                            <textarea v-model="noteDraft" class="note-textarea" placeholder="What's on your mind?"></textarea>
                            <button type="button" class="save-note-btn" @click="addTempNote">Save</button>
                        </div>
                        <div class="notes-list">
                            <div v-for="(n, i) in form.temp_notes" :key="i" class="note-item">{{ n }}</div>
                        </div>
                    </div>
                </div>

                <div class="stats-panel">
                    <div class="days-selector">
                        <div class="form-label">Target Days</div>
                        <div id="daysGrid" class="days-grid">
                            <label
                                v-for="d in days"
                                :key="d"
                                class="day-circle"
                                :class="{ active: dayOn(d), inactive: !dayOn(d) }"
                                @click.prevent="toggleDay(d)"
                            >
                                <input type="checkbox" :checked="dayOn(d)" hidden />
                                <span class="day-initial">{{ d[0] }}</span>
                            </label>
                        </div>
                        <div class="days-info">{{ form.target_days.length }} days per week</div>
                        <p v-if="form.errors.target_days" style="color: #c00; font-size: 12px">{{ form.errors.target_days }}</p>
                    </div>
                </div>
            </div>

            <button type="submit" class="save-changes-btn" :disabled="form.processing">Add Habit</button>
        </form>
    </UserLayout>
</template>
