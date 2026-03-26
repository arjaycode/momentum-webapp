<template>
  <Head title="User Management - Momentum" />

  <AdminLayout 
    activeLink="users" 
    pageTitle="User Management" 
    pageDescription="Manage users, roles, and permissions"
  >
    <div class="space-y-6">
      
      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Total Users -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-shadow">
          <div>
            <div class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Total Users</div>
            <div class="text-3xl font-bold text-gray-900">{{ totalUsers }}</div>
          </div>
          <div class="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center transform group-hover:scale-110 transition-transform">
            <i class="fas fa-users text-2xl"></i>
          </div>
        </div>

        <!-- Active Users -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-shadow">
          <div>
            <div class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Active</div>
            <div class="text-3xl font-bold text-gray-900">{{ totalActiveUsers }}</div>
          </div>
          <div class="w-14 h-14 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center transform group-hover:scale-110 transition-transform">
            <i class="fas fa-user-check text-2xl"></i>
          </div>
        </div>

        <!-- Inactive Users -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-shadow">
          <div>
            <div class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Inactive</div>
            <div class="text-3xl font-bold text-gray-900">{{ totalInactiveUsers }}</div>
          </div>
          <div class="w-14 h-14 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center transform group-hover:scale-110 transition-transform">
            <i class="fas fa-user-clock text-2xl"></i>
          </div>
        </div>

        <!-- Blocked Users -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-md transition-shadow">
          <div>
            <div class="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Blocked</div>
            <div class="text-3xl font-bold text-gray-900">{{ totalBlockedUsers }}</div>
          </div>
          <div class="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center transform group-hover:scale-110 transition-transform">
            <i class="fas fa-user-times text-2xl"></i>
          </div>
        </div>
      </div>

      <!-- Main Content Block -->
      <div class="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col">
        <!-- Header & Actions -->
        <div class="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 class="text-lg font-bold text-gray-900">All Users</h3>
            <p class="text-sm text-gray-500 mt-1">Manage user accounts and permissions</p>
          </div>
          <Link :href="admin.userManagement.create().url" class="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-xl hover:bg-indigo-700 transition-colors shrink-0">
            <i class="fas fa-plus"></i> Add New User
          </Link>
        </div>

        <!-- Filters Block -->
        <div class="p-4 bg-gray-50 border-b border-gray-100 flex flex-col md:flex-row gap-4 items-center">
          <div class="relative flex-1 w-full">
            <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input type="text" v-model="searchQuery" placeholder="Search by name or email..." class="w-full pl-11 pr-4 py-2 bg-white border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
          </div>
          <div class="flex gap-3 w-full md:w-auto">
            <select v-model="roleFilter" class="flex-1 md:w-40 px-3 py-2 bg-white border border-gray-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none transition-all cursor-pointer text-gray-700">
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            <select v-model="statusFilter" class="flex-1 md:w-40 px-3 py-2 bg-white border border-gray-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none transition-all cursor-pointer text-gray-700">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="w-full text-left whitespace-nowrap">
            <thead>
              <tr class="bg-gray-50/50 text-xs font-semibold tracking-wide text-gray-500 uppercase border-b border-gray-100">
                <th class="px-6 py-4">User</th>
                <th class="px-6 py-4">Email</th>
                <th class="px-6 py-4 text-center">Role</th>
                <th class="px-6 py-4 text-center">Status</th>
                <th class="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-gray-50/50 transition-colors group">
                <td class="px-6 py-4">
                  <div class="flex items-center gap-4">
                    <img :src="user.avatar ? '/storage/' + user.avatar : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.firstname + ' ' + user.lastname)}&background=random`" alt="" class="w-10 h-10 rounded-full object-cover border border-gray-200" />
                    <div>
                      <div class="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{{ user.firstname }} {{ user.lastname }}</div>
                      <div class="text-xs text-gray-500 font-medium">ID: #{{ user.id }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 text-sm text-gray-600">{{ user.email }}</td>
                <td class="px-6 py-4 text-center">
                  <span :class="[
                    'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider',
                    user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                  ]">
                    {{ user.role }}
                  </span>
                </td>
                <td class="px-6 py-4 text-center">
                  <span :class="[
                    'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider',
                    user.status === 'active' ? 'bg-green-100 text-green-700' : 
                    (user.status === 'blocked' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700')
                  ]">
                    {{ user.status }}
                  </span>
                </td>
                <td class="px-6 py-4 text-right space-x-2">
                  <Link :href="admin.userManagement.edit(user.id).url" class="inline-flex items-center justify-center p-2 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors tooltip-trigger" title="Edit User">
                    <i class="fas fa-edit"></i>
                  </Link>
                  <button v-if="user.role !== 'admin'" @click="openStatusModal(user)" class="inline-flex items-center justify-center p-2 rounded-lg text-orange-600 hover:bg-orange-50 transition-colors tooltip-trigger" title="Change Status">
                    <i class="fas fa-ban"></i>
                  </button>
                  <button v-if="user.role !== 'admin'" @click="openDeleteModal(user)" class="inline-flex items-center justify-center p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors tooltip-trigger" title="Delete User">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
              <tr v-if="filteredUsers.length === 0">
                <td colspan="5" class="px-6 py-12 text-center text-gray-500">
                  <div class="flex flex-col items-center">
                    <i class="fas fa-search text-3xl mb-3 text-gray-300"></i>
                    <p class="text-sm">No users found matching your criteria</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <Modal :show="showDeleteModal" @close="showDeleteModal = false" maxWidth="md">
      <div class="p-6">
        <div class="flex flex-col items-center text-center">
          <div class="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
            <i class="fas fa-trash-alt text-2xl"></i>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">Delete User?</h3>
          <p class="text-sm text-gray-500 mb-6">Are you sure you want to delete <span class="font-bold text-gray-700">{{ selectedUser?.firstname }} {{ selectedUser?.lastname }}</span>? This action cannot be undone.</p>
          
          <div class="flex gap-3 w-full">
            <button @click="showDeleteModal = false" class="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <Link :href="admin.userManagement.delete(selectedUser?.id).url" method="delete" as="button" class="flex-1 px-4 py-2.5 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors" @success="showDeleteModal = false">
              Delete
            </Link>
          </div>
        </div>
      </div>
    </Modal>

    <Modal :show="showStatusModal" @close="showStatusModal = false" maxWidth="md">
      <div class="p-6">
        <div class="flex flex-col items-center text-center">
          <div class="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
            <i class="fas fa-user-shield text-2xl"></i>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-2">Change User Status</h3>
          <p class="text-sm text-gray-500 mb-6">Update status for <span class="font-bold text-gray-700">{{ selectedUser?.firstname }} {{ selectedUser?.lastname }}</span></p>
          
          <form @submit.prevent="updateStatus" class="w-full space-y-4">
            <select v-model="statusForm.status" class="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-gray-900 focus:ring-2 focus:ring-indigo-500">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="blocked">Blocked / Banned</option>
            </select>
            <div class="flex gap-3 w-full pt-4">
              <button type="button" @click="showStatusModal = false" class="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button type="submit" class="flex-1 px-4 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors" :disabled="statusForm.processing">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  </AdminLayout>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Head, Link, useForm } from '@inertiajs/vue3';
import axios from 'axios';
import AdminLayout from '@/Layouts/AdminLayout.vue';
import Modal from '@/Components/Modal.vue';
import admin from '@/routes/admin';

const props = defineProps({
  users: Array,
  totalUsers: Number,
  totalActiveUsers: Number,
  totalInactiveUsers: Number,
  totalBlockedUsers: Number,
});

const searchQuery = ref('');
const roleFilter = ref('');
const statusFilter = ref('');

const filteredUsers = computed(() => {
  return props.users.filter(user => {
    const matchesSearch = (user.firstname + ' ' + user.lastname).toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesRole = roleFilter.value === '' || user.role === roleFilter.value;
    const matchesStatus = statusFilter.value === '' || user.status === statusFilter.value;
    return matchesSearch && matchesRole && matchesStatus;
  });
});

const showDeleteModal = ref(false);
const showStatusModal = ref(false);
const selectedUser = ref(null);

const openDeleteModal = (user) => {
  selectedUser.value = user;
  showDeleteModal.value = true;
};

const openStatusModal = (user) => {
  selectedUser.value = user;
  statusForm.status = user.status;
  showStatusModal.value = true;
};

const statusForm = useForm({
  status: ''
});

const updateStatus = async () => {
  try {
    // Controller logic returns JSON for update_status
    await axios.patch(admin.userManagement.updateStatus(selectedUser.value.id).url, {
      status: statusForm.status
    });
    // Optimistic UI update
    const userIndex = props.users.findIndex(u => u.id === selectedUser.value.id);
    if(userIndex > -1) {
      props.users[userIndex].status = statusForm.status;
    }
    showStatusModal.value = false;
  } catch (error) {
    alert("Failed to update status");
  }
};
</script>
