<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { Link, router } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import adminRoutes from '@/routes/admin';

interface CategoryType {
    id: number;
    title: string;
    status: string;
    habits_count?: number;
}

const props = defineProps<{
    categories: CategoryType[];
}>();

const searchTerm = ref('');
const filterValue = ref('');
const showDeleteModal = ref(false);
const categoryToDelete = ref<CategoryType | null>(null);

const totalCategories = computed(() => props.categories.length);
const activeCategories = computed(() => 
    props.categories.filter(c => c.status === 'active').length
);
const totalHabits = computed(() => 
    props.categories.reduce((sum, c) => sum + (c.habits_count ?? 0), 0)
);

const filteredCategories = computed(() => {
    return props.categories.filter(category => {
        const matchesSearch = category.title.toLowerCase().includes(searchTerm.value.toLowerCase());
        const matchesFilter = !filterValue.value || category.status.toLowerCase() === filterValue.value.toLowerCase();
        return matchesSearch && matchesFilter;
    });
});

function openDeleteModal(category: CategoryType) {
    categoryToDelete.value = category;
    showDeleteModal.value = true;
}

function closeDeleteModal() {
    showDeleteModal.value = false;
    categoryToDelete.value = null;
}

function confirmDelete() {
    if (categoryToDelete.value) {
        router.delete(adminRoutes.habitManagement.delete.url({ id: categoryToDelete.value.id }));
    }
    closeDeleteModal();
}

let scriptEl: HTMLScriptElement | null = null;
onMounted(() => {
    scriptEl = document.createElement('script');
    scriptEl.src = '/AdminSide/js/habit-management.js';
    document.body.appendChild(scriptEl);
});
onUnmounted(() => scriptEl?.remove());
</script>

<template>
    <AdminLayout
        title="Habit Categories"
        page-css="habit-management.css"
        active="habits"
        page-title="Habit Categories"
        page-description="Manage habit categories"
    >
        <main class="main-content">
            <!-- Stats Grid -->
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-info">
                        <span class="stat-label">Total Categories</span>
                        <div class="stat-value">{{ totalCategories }}</div>
                    </div>
                    <div class="stat-icon blue">
                        <i class="fas fa-layer-group"></i>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-info">
                        <span class="stat-label">Active Categories</span>
                        <div class="stat-value">{{ activeCategories }}</div>
                    </div>
                    <div class="stat-icon green">
                        <i class="fas fa-check-circle"></i>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-info">
                        <span class="stat-label">Total Habits</span>
                        <div class="stat-value">{{ totalHabits }}</div>
                    </div>
                    <div class="stat-icon purple">
                        <i class="fas fa-heart"></i>
                    </div>
                </div>
            </div>

            <!-- Controls Section -->
            <div class="controls-section">
                <div class="search-box-container">
                    <i class="fas fa-search"></i>
                    <input 
                        id="categorySearch"
                        v-model="searchTerm"
                        type="text" 
                        placeholder="Search categories..." 
                    />
                </div>
                <div class="controls-right">
                    <select id="categoryFilter" v-model="filterValue" class="filter-select">
                        <option value="">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                    <Link :href="adminRoutes.habitManagement.create.url()" class="btn-primary">
                        <i class="fas fa-plus"></i> Add Category
                    </Link>
                </div>
            </div>

            <!-- Categories Grid -->
            <div class="categories-grid">
                <div 
                    v-for="category in filteredCategories" 
                    :key="category.id"
                    class="category-card"
                    :data-status="category.status.toLowerCase()"
                >
                    <input type="hidden" name="category-id" :value="category.id" />
                    <div class="category-header">
                        <div class="category-icon blue">
                            <i class="fas fa-list"></i>
                        </div>
                        <div class="category-actions">
                            <Link 
                                :href="adminRoutes.habitManagement.edit.url({ id: category.id })"
                                class="action-icon"
                                title="Edit"
                            >
                                <i class="fas fa-edit"></i>
                            </Link>
                            <button 
                                type="button"
                                class="action-icon"
                                title="Delete"
                                @click.prevent="openDeleteModal(category)"
                            >
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <h3 class="category-title">{{ category.title }}</h3>
                    <div class="category-footer">
                        <span class="habit-count">{{ category.habits_count ?? 0 }} habits</span>
                        <span class="status-badge" :class="category.status.toLowerCase()">
                            {{ category.status }}
                        </span>
                    </div>
                </div>
            </div>

            <!-- Delete Confirmation Modal -->
            <div v-if="showDeleteModal" class="modal-backdrop is-visible" @click="closeDeleteModal">
                <div class="modal-content" @click.stop>
                    <div class="modal-header">
                        <h2>Delete Category</h2>
                        <button type="button" class="modal-close" @click="closeDeleteModal">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div v-if="categoryToDelete" class="category-preview">
                            <div class="category-icon-bg">
                                <i class="fas fa-list"></i>
                            </div>
                            <p class="preview-title">{{ categoryToDelete.title }}</p>
                            <p class="preview-habits">{{ categoryToDelete.habits_count ?? 0 }} habit{{ (categoryToDelete.habits_count ?? 0) !== 1 ? 's' : '' }}</p>
                            <span class="preview-status" :class="categoryToDelete.status.toLowerCase()">
                                {{ categoryToDelete.status }}
                            </span>
                        </div>
                        <p class="warning-text">Are you sure you want to delete this category? This action cannot be undone.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn-secondary" @click="closeDeleteModal">Cancel</button>
                        <button type="button" class="btn-danger" @click="confirmDelete">Delete</button>
                    </div>
                </div>
            </div>
        </main>
    </AdminLayout>
</template>

<style scoped>
.modal-backdrop {
    display: none;
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 1000;
    align-items: center;
    justify-content: center;
}

.modal-backdrop.is-visible {
    display: flex;
}

.modal-content {
    background: white;
    border-radius: 12px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    max-width: 400px;
    width: 90%;
    overflow: hidden;
}

.modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 24px;
    border-bottom: 1px solid #e5e7eb;
}

.modal-header h2 {
    margin: 0;
    font-size: 1.25rem;
    color: #1f2937;
}

.modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #6b7280;
    cursor: pointer;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    transition: all 0.2s;
}

.modal-close:hover {
    background-color: #f3f4f6;
    color: #1f2937;
}

.modal-body {
    padding: 24px;
}

.category-preview {
    text-align: center;
    margin-bottom: 16px;
}

.category-icon-bg {
    width: 64px;
    height: 64px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
    font-size: 32px;
    color: white;
}

.preview-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 8px;
}

.preview-habits {
    font-size: 0.875rem;
    color: #6b7280;
    margin-bottom: 12px;
}

.preview-status {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
}

.preview-status.active {
    background-color: #d1fae5;
    color: #065f46;
}

.preview-status.inactive {
    background-color: #fee2e2;
    color: #991b1b;
}

.warning-text {
    font-size: 0.875rem;
    color: #6b7280;
    margin: 0;
    line-height: 1.5;
}

.modal-footer {
    display: flex;
    gap: 12px;
    padding: 16px 24px;
    border-top: 1px solid #e5e7eb;
    justify-content: flex-end;
}

.btn-secondary,
.btn-danger {
    padding: 8px 16px;
    border: none;
    border-radius: 6px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-secondary {
    background-color: #f3f4f6;
    color: #1f2937;
}

.btn-secondary:hover {
    background-color: #e5e7eb;
}

.btn-danger {
    background-color: #dc2626;
    color: white;
}

.btn-danger:hover {
    background-color: #b91c1c;
}

.category-card {
    transition: all 0.3s ease;
}

.action-icon {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    color: #6b7280;
    padding: 4px;
    border-radius: 4px;
    transition: all 0.2s;
}

.action-icon:hover {
    color: #1f2937;
    background-color: #f3f4f6;
}

.action-icon[title="Delete"]:hover {
    color: #dc2626;
}
</style>
