<template>
  <Head title="Notes Management - Momentum" />

  <AdminLayout 
    activeLink="notes" 
    pageTitle="Notes Management" 
    pageDescription="Monitor, manage, and organize notes created by users"
  >
    <div class="space-y-6">
      
      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Total Notes -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-shadow">
          <div>
            <div class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Total Created Notes</div>
            <div class="text-3xl font-bold text-gray-900">{{ notes.length }}</div>
          </div>
          <div class="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center transform group-hover:scale-110 transition-transform">
            <i class="fas fa-file-alt text-2xl"></i>
          </div>
        </div>
      </div>

      <!-- Main Content Block -->
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col pt-2">
        <!-- Header & Actions -->
        <div class="p-6 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100">
          <div class="relative flex-1 max-w-md">
            <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input type="text" v-model="searchQuery" placeholder="Search notes by user or content..." class="w-full pl-11 pr-4 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
          </div>
          
          <div class="flex gap-3">
            <Link :href="admin.noteManagement.create().url" class="inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors shrink-0">
              <i class="fas fa-plus"></i> Add New Note
            </Link>
          </div>
        </div>

        <!-- Notes Grid -->
        <div class="p-6">
          <div v-if="filteredNotes.length > 0" class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            <div v-for="note in filteredNotes" :key="note.id" class="bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all group flex flex-col h-full relative">
              
              <!-- Header -->
              <div class="flex items-start justify-between gap-4 mb-4">
                <div class="flex items-center gap-3">
                  <img :src="note.user?.avatar ? '/storage/' + note.user.avatar : `https://ui-avatars.com/api/?name=${encodeURIComponent((note.user?.firstname || '') + ' ' + (note.user?.lastname || ''))}&background=random`" 
                       alt="Avatar" class="w-10 h-10 rounded-full border border-gray-200 shadow-sm" />
                  <div>
                    <div class="text-sm font-bold text-gray-900 leading-tight">
                      {{ note.user?.firstname }} {{ note.user?.lastname }}
                    </div>
                    <div class="text-xs text-gray-500 font-medium">ID: #{{ (note.user?.id || 0).toString().padStart(4, '0') }}</div>
                  </div>
                </div>

                <div class="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity absolute right-4 top-4 bg-gray-50/90 backdrop-blur-sm p-1 xl:static xl:bg-transparent xl:opacity-100">
                  <Link :href="admin.noteManagement.edit(note.id).url" class="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors tooltip-trigger" title="Edit Note">
                    <i class="fas fa-edit"></i>
                  </Link>
                  <button @click="openDeleteModal(note)" class="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors tooltip-trigger" title="Delete Note">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>

              <!-- Badges -->
              <div class="mb-4 flex flex-wrap gap-2">
                <div v-if="note.habit && note.habit.category" :class="[
                    'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider',
                    getCategoryBadgeClass(note.habit.category.color)
                  ]">
                  <i :class="`fas fa-${note.habit.category.icon}`"></i>
                  {{ note.habit.category.title }}
                </div>
                <div v-else class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold uppercase tracking-wider">
                  <i class="fas fa-sticky-note"></i>
                  General Note
                </div>
              </div>

              <!-- Note Content -->
              <div class="flex-1">
                <p class="text-sm text-gray-700 leading-relaxed bg-white p-4 rounded-xl border border-gray-100 whitespace-pre-wrap"><span class="font-bold text-gray-900 mr-1 text-xs uppercase tracking-wider">Note:</span>{{ note.message }}</p>
              </div>

              <!-- Footer -->
              <div class="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between">
                <div class="text-xs font-medium text-gray-500">
                  Created {{ new Date(note.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) }}
                </div>
                <span class="inline-flex items-center px-2.5 py-1 rounded-md bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider">
                  Active
                </span>
              </div>

            </div>
          </div>
          
          <div v-else class="py-12 flex flex-col items-center justify-center text-gray-400">
            <i class="fas fa-file-alt text-4xl mb-4 text-gray-300"></i>
            <p class="text-lg font-medium text-gray-900">No notes found</p>
            <p class="text-sm">Try adjusting your search query.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Modal -->
    <Modal :show="showDeleteModal" @close="showDeleteModal = false" maxWidth="md">
      <div class="p-6">
        <div class="flex flex-col items-center text-center">
          <div class="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
            <i class="fas fa-exclamation-triangle text-2xl"></i>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">Delete Note?</h3>
          
          <div class="w-full bg-gray-50 rounded-xl p-4 border border-gray-200 mb-6 text-left">
            <div class="flex items-center gap-3 mb-3">
              <img :src="selectedNote?.user?.avatar ? '/storage/' + selectedNote.user.avatar : `https://ui-avatars.com/api/?name=${encodeURIComponent((selectedNote?.user?.firstname || '') + ' ' + (selectedNote?.user?.lastname || ''))}&background=random`" 
                   alt="Avatar" class="w-8 h-8 rounded-full border border-gray-200" />
              <div>
                <div class="text-sm font-bold text-gray-900">{{ selectedNote?.user?.firstname }} {{ selectedNote?.user?.lastname }}</div>
              </div>
            </div>
            <p class="text-sm text-gray-600 italic line-clamp-2">"{{ selectedNote?.message }}"</p>
          </div>

          <p class="text-sm text-gray-500 mb-6">Are you sure you want to delete this note? This action cannot be undone.</p>
          
          <div class="flex gap-3 w-full">
            <button @click="showDeleteModal = false" class="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <Link :href="admin.noteManagement.destroy(selectedNote?.id).url" method="delete" as="button" class="flex-1 px-4 py-2.5 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors" @success="showDeleteModal = false">
              Delete
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  </AdminLayout>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Head, Link } from '@inertiajs/vue3';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import Modal from '@/Components/Modal.vue';
import admin from '@/routes/admin';

const props = defineProps({
  notes: Array
});

const searchQuery = ref('');

const filteredNotes = computed(() => {
  return props.notes.filter(note => {
    const term = searchQuery.value.toLowerCase();
    const userMatches = note.user && (note.user.firstname.toLowerCase().includes(term) || note.user.lastname.toLowerCase().includes(term) || note.user.email.toLowerCase().includes(term));
    const contentMatches = note.message.toLowerCase().includes(term);
    return userMatches || contentMatches;
  });
});

const showDeleteModal = ref(false);
const selectedNote = ref(null);

const openDeleteModal = (note) => {
  selectedNote.value = note;
  showDeleteModal.value = true;
};

const getCategoryBadgeClass = (colorName) => {
  const map = {
    'green': 'bg-emerald-100 text-emerald-700 border border-emerald-200',
    'blue': 'bg-blue-100 text-blue-700 border border-blue-200',
    'purple': 'bg-purple-100 text-purple-700 border border-purple-200',
    'yellow': 'bg-amber-100 text-amber-700 border border-amber-200',
    'orange': 'bg-orange-100 text-orange-700 border border-orange-200',
    'red': 'bg-rose-100 text-rose-700 border border-rose-200',
  };
  return map[colorName] || 'bg-gray-100 text-gray-700 border border-gray-200';
};
</script>
