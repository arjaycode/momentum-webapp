<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    pageTitle: string;
    description: string;
}>();

const dateDisplay = computed(() =>
    new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date()),
);
</script>

<template>
    <header class="header">
        <div class="header-left">
            <h1 class="page-title" v-html="pageTitle"></h1>
            <p v-if="description" class="page-subtitle" v-html="description"></p>
        </div>
        <div class="header-right">
            <span class="date-display">{{ dateDisplay }}</span>
        </div>
    </header>
</template>
