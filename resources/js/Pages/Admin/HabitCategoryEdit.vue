<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { Link, router, useForm } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import adminRoutes from '@/routes/admin';
import { update } from '@/actions/App/Http/Controllers/Habit/HabitCategoryController';

const props = defineProps<{
    category: {
        id: number;
        title: string;
        description: string | null;
        status: string;
        color: string;
        icon: string;
    };
}>();

const form = useForm({
    title: props.category.title,
    description: props.category.description ?? '',
    status: props.category.status as 'active' | 'inactive',
    color: props.category.color,
    icon: props.category.icon,
});

function submit() {
    form.patch(update.patch({ id: props.category.id }), {
        onSuccess: () => {
            router.visit(adminRoutes.habitManagement.url());
        },
    });
}

let scriptEl: HTMLScriptElement | null = null;
onMounted(() => {
    scriptEl = document.createElement('script');
    scriptEl.src = '/AdminSide/js/edit_habit_category.js';
    document.body.appendChild(scriptEl);
});
onUnmounted(() => scriptEl?.remove());
</script>

<template>
    <AdminLayout
        title="Edit Habit Category - Momentum"
        page-css="edit_habit_category.css"
        active="habits"
        page-title="Edit Habit Category"
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
                <form id="editCategoryForm" class="category-form" @submit.prevent="submit">
                    <div class="form-group">
                        <label for="habitName">Habit Category Name <span class="required">*</span></label>
                        <input
                            id="habitName"
                            v-model="form.title"
                            type="text"
                            class="form-input"
                            :class="{ 'is-error': form.errors.title }"
                            required
                        />
                        <span v-if="form.errors.title" class="error-message">{{ form.errors.title }}</span>
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
                        <label for="status">Status <span class="required">*</span></label>
                        <select id="status" v-model="form.status" class="form-select" :class="{ 'is-error': form.errors.status }" required>
                            <option value="">Select status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        <span v-if="form.errors.status" class="error-message">{{ form.errors.status }}</span>
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
                            Save Changes
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

.form-input.is-error,
.form-select.is-error,
.form-textarea.is-error {
    border-color: #dc2626 !important;
    background-color: #fee2e2;
}

.required {
    color: #dc2626;
}
</style>
