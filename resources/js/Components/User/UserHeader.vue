<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { usePage } from '@inertiajs/vue3';
import userRoutes from '@/routes/user';
import type { SharedProps } from '@/types/global';

defineProps<{
    pageTitle: string;
    pageDescription: string;
}>();

usePage<SharedProps>();

const dropdownOpen = ref(false);
const items = ref<
    {
        id: number;
        link?: string | null;
        color?: string | null;
        icon?: string | null;
        title: string;
        message: string;
        time: string;
    }[]
>([]);
const badgeCount = ref(0);
const showEmpty = ref(true);

const headerDate = computed(() =>
    new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    }).format(new Date()),
);

function csrf(): string {
    return document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content ?? '';
}

async function loadNotifications() {
    const res = await fetch(userRoutes.notifications.url(), {
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            Accept: 'application/json',
        },
        credentials: 'same-origin',
    });
    const data = await res.json();
    if (data.success && data.notifications?.length > 0) {
        items.value = data.notifications;
        badgeCount.value = data.unread_count ?? 0;
        showEmpty.value = false;
    } else {
        items.value = [];
        badgeCount.value = 0;
        showEmpty.value = true;
    }
}

async function updateBadgeOnly() {
    try {
        const res = await fetch(userRoutes.notifications.url(), {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                Accept: 'application/json',
            },
            credentials: 'same-origin',
        });
        const data = await res.json();
        badgeCount.value = data.unread_count ?? 0;
    } catch {
        /* ignore */
    }
}

async function clearAll(e: Event) {
    e.stopPropagation();
    await fetch(userRoutes.notifications.clear.url(), {
        method: 'POST',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'X-CSRF-TOKEN': csrf(),
            Accept: 'application/json',
        },
        credentials: 'same-origin',
    });
    await loadNotifications();
    await updateBadgeOnly();
}

function toggleDropdown(e: Event) {
    e.stopPropagation();
    dropdownOpen.value = !dropdownOpen.value;
    if (dropdownOpen.value) {
        loadNotifications();
    }
}

function onDocClick() {
    dropdownOpen.value = false;
}

let intervalId: ReturnType<typeof setInterval>;

onMounted(() => {
    updateBadgeOnly();
    intervalId = setInterval(updateBadgeOnly, 30000);
    document.addEventListener('click', onDocClick);
    (window as unknown as { refreshNotifications?: () => void }).refreshNotifications = () => {
        updateBadgeOnly();
        if (dropdownOpen.value) {
            loadNotifications();
        }
    };
});

onUnmounted(() => {
    clearInterval(intervalId);
    document.removeEventListener('click', onDocClick);
});

function go(link: string | null | undefined) {
    if (link) {
        window.location.href = link;
    }
}
</script>

<template>
    <header class="main-header">
        <div class="header-left">
            <h1 class="header-title">{{ pageTitle }}</h1>
            <p class="header-subtitle">
                {{ pageDescription }}
            </p>
        </div>
        <div class="header-right">
            <div class="notification-container">
                <button type="button" class="icon-button notification-button" @click.stop="toggleDropdown">
                    <i class="fas fa-bell"></i>
                    <span v-show="badgeCount > 0" class="notification-badge">{{ badgeCount }}</span>
                </button>
                <div
                    v-show="dropdownOpen"
                    class="notification-dropdown"
                    style="display: block"
                    @click.stop
                >
                    <div class="notification-header">
                        <h3>Notifications</h3>
                        <button type="button" @click="clearAll">Clear all</button>
                    </div>
                    <div class="notification-list">
                        <div
                            v-for="notif in items"
                            :key="notif.id"
                            class="notification-item"
                            style="
                                padding: 12px 16px;
                                border-bottom: 1px solid #f0f0f0;
                                cursor: pointer;
                                transition: background 0.2s;
                            "
                            @click="go(notif.link ?? undefined)"
                        >
                            <div style="display: flex; align-items: start; gap: 12px">
                                <div
                                    style="
                                        width: 40px;
                                        height: 40px;
                                        border-radius: 50%;
                                        display: flex;
                                        align-items: center;
                                        justify-content: center;
                                        color: white;
                                        font-size: 18px;
                                        flex-shrink: 0;
                                    "
                                    :style="{ background: notif.color ?? '#007bff' }"
                                >
                                    <i :class="notif.icon ?? 'fas fa-check'"></i>
                                </div>
                                <div style="flex: 1">
                                    <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px">
                                        {{ notif.title }}
                                    </div>
                                    <div style="font-size: 12px; color: #666; margin-bottom: 4px">
                                        {{ notif.message }}
                                    </div>
                                    <div style="font-size: 11px; color: #999">{{ notif.time }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-show="showEmpty" id="noNotifications">
                        <i class="fas fa-bell-slash"></i>
                        <p>No notifications</p>
                    </div>
                </div>
            </div>
            <div class="header-date">{{ headerDate }}</div>
        </div>
    </header>
</template>
