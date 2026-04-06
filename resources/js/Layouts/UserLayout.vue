<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import UserSidebar from '@/Components/User/UserSidebar.vue';
import UserHeader from '@/Components/User/UserHeader.vue';

const props = defineProps<{
    title?: string;
    pageCss: string;
    activePage: string;
    pageTitle: string;
    pageDescription?: string;
}>();
</script>

<template>
    <Head :title="title" />
    <Head>
        <link rel="stylesheet" href="/UserSide/css/main.css" />
        <link rel="stylesheet" href="/UserSide/css/sidebar.css" />
        <link rel="stylesheet" href="/UserSide/css/header.css" />
        <link rel="stylesheet" :href="`/UserSide/css/${pageCss}`" />
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
    </Head>
    <UserSidebar :active-page="activePage" />
    <div class="main-container">
        <UserHeader :page-title="pageTitle" :page-description="pageDescription ?? ''" />
        <div class="main-content">
            <slot />
        </div>
    </div>
</template>
