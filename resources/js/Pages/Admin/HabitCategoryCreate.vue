<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { Link, useForm } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import adminRoutes from '@/routes/admin';
import { store } from '@/actions/App/Http/Controllers/Habit/HabitCategoryController';

const form = useForm({
    title: '',
    description: '',
    status: '' as '' | 'active' | 'inactive',
    color: '' as string,
    icon: '' as string,
});

function submit() {
    form.post(store.post());
}

let scriptEl: HTMLScriptElement | null = null;
onMounted(() => {
    scriptEl = document.createElement('script');
    scriptEl.src = '/AdminSide/js/add_habit_category.js';
    document.body.appendChild(scriptEl);
});
onUnmounted(() => scriptEl?.remove());
</script>

<template>
    <AdminLayout
        title="Add Habit Category - Momentum"
        page-css="add_habit_category.css"
        active="habits"
        page-title="Add New Habit Category"
        page-description="Manage and organize your habit categories"
    >
        <main class="main-content">
            <div class="back-section">
                <Link :href="adminRoutes.habitManagement.url()" class="back-btn">
                    <i class="fas fa-arrow-left"></i>
                    Back to Habit Management
                </Link>
            </div>

            <div class="form-container">
                <form class="category-form" @submit.prevent="submit">
                    <div class="form-group">
                        <label for="title">Habit Title</label>
                        <input
                            id="title"
                            v-model="form.title"
                            type="text"
                            class="form-input"
                            required
                        />
                    </div>
                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea
                            id="description"
                            v-model="form.description"
                            rows="5"
                            class="form-textarea"
                        />
                    </div>
                    <div class="form-group">
                        <label for="status">Status</label>
                        <select id="status" v-model="form.status" class="form-select" required>
                            <option value="">Select status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Color Theme</label>
                        <div class="color-picker">
                            <template v-for="c in ['blue', 'green', 'purple', 'red', 'orange']" :key="c">
                                <input
                                    :id="'color-' + c"
                                    v-model="form.color"
                                    type="radio"
                                    name="color"
                                    :value="c"
                                    class="color-radio"
                                />
                                <label :for="'color-' + c" class="color-option" :class="c" :title="c">
                                    <span class="color-circle"></span>
                                </label>
                            </template>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Icon</label>
                        <div class="icon-picker">
                            <template v-for="ic in ['heart', 'dumbbell', 'book', 'star']" :key="ic">
                                <input
                                    :id="'icon-' + ic"
                                    v-model="form.icon"
                                    type="radio"
                                    name="icon"
                                    :value="ic"
                                    class="icon-radio"
                                />
                                <label :for="'icon-' + ic" class="icon-option" :title="ic">
                                    <i :class="'fas fa-' + ic"></i>
                                </label>
                            </template>
                        </div>
                    </div>
                    <div class="form-actions">
                        <Link :href="adminRoutes.habitManagement.url()" class="btn-cancel">Cancel</Link>
                        <button type="submit" class="btn-create" :disabled="form.processing">
                            <i class="fas fa-plus"></i>
                            Create Category
                        </button>
                    </div>
                </form>
            </div>
        </main>
    </AdminLayout>
</template>
