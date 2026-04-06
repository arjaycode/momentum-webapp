<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import AdminSidebar from '@/Components/Admin/AdminSidebar.vue';
import AdminHeader from '@/Components/Admin/AdminHeader.vue';

defineProps<{
    title?: string;
    pageCss: string;
    active: string;
    pageTitle: string;
    pageDescription?: string;
}>();
</script>

<template>
    <Head :title="title" />
    <Head>
        <link rel="icon" type="image/x-icon" href="/AdminSide/img/Logo.png" />
        <link rel="stylesheet" href="/AdminSide/css/sidebar.css" />
        <link rel="stylesheet" href="/AdminSide/css/header.css" />
        <link rel="stylesheet" :href="`/AdminSide/css/${pageCss}`" />
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
    </Head>
    <div class="container">
        <AdminSidebar :active="active" />
        <div class="main-container">
            <AdminHeader :page-title="pageTitle" :description="pageDescription ?? ''" />
            <slot />
        </div>
    </div>
</template>
