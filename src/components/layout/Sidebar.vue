<template>
  <aside
    :class="[
      'z-20 flex h-screen flex-col border-r border-slate-200 bg-white transition-all duration-300 dark:border-slate-800 dark:bg-slate-950',
      collapsed ? 'w-20' : 'w-64'
    ]"
  >
    <div class="flex items-center justify-between gap-3 px-6 py-5">
      <div class="flex items-center gap-2">
        <span class="grid h-9 w-9 place-items-center rounded-full bg-primary-500 text-lg font-semibold text-white">
          🗓
        </span>
        <span v-if="!collapsed" class="text-lg font-semibold text-slate-900 dark:text-white">
          Planora
        </span>
      </div>
      <button
        class="hidden rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 lg:inline-flex"
        type="button"
        @click="$emit('toggle', !collapsed)"
      >
        <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path
            v-if="collapsed"
            d="m9 5 7 7-7 7"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            v-else
            d="m15 19-7-7 7-7"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>

    <nav class="flex-1 space-y-1 px-3">
      <RouterLink
        v-for="item in navigation"
        :key="item.name"
        :to="item.to"
        class="group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        :class="isActive(item.to)
          ? 'bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-300'
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'"
      >
        <span class="grid h-8 w-8 place-items-center rounded-xl bg-slate-100 text-slate-600 transition group-hover:bg-primary-100 group-hover:text-primary-600 dark:bg-slate-800 dark:text-slate-300 dark:group-hover:bg-primary-500/20 dark:group-hover:text-primary-200">
          <svg
            v-if="item.icon === 'dashboard'"
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            viewBox="0 0 24 24"
          >
            <path d="M4.5 12.75 10.5 6.75 13.5 9.75 19.5 3.75" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M19.5 10.875V19.5H4.5V4.5H16.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <svg
            v-else-if="item.icon === 'calendar'"
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            viewBox="0 0 24 24"
          >
            <path d="M7 3v4M17 3v4M4.25 9h15.5M5 21h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1Z" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <svg
            v-else-if="item.icon === 'goals'"
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            viewBox="0 0 24 24"
          >
            <path d="M4.5 19.5 9 15l3 3 7.5-7.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="m21 8.25-2.25-2.25" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <svg
            v-else-if="item.icon === 'notifications'"
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            viewBox="0 0 24 24"
          >
            <path
              d="M14.857 17.657 19 21m0 0 4-4m-4 4V7a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path d="M8 11h4m-4 4h4m4-7v2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <svg
            v-else
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            viewBox="0 0 24 24"
          >
            <path d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6 21a7 7 0 0 1 12 0" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
        <span v-if="!collapsed">{{ item.label }}</span>
      </RouterLink>
    </nav>

    <div class="px-6 pb-6 pt-4">
      <div class="rounded-2xl bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 p-4 text-sm text-white">
        <p class="font-semibold">Weekly Focus</p>
        <p class="mt-1 text-xs text-primary-100">
          Prioritize deep work blocks and celebrate small wins daily.
        </p>
        <button
          class="mt-4 w-full rounded-xl bg-white/10 py-2 text-sm font-medium backdrop-blur transition hover:bg-white/20"
          type="button"
        >
          View Tips
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';

defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
});

defineEmits(['toggle']);

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const navigation = computed(() => [
  {
    name: 'dashboard',
    label: 'Dashboard',
    to: { name: 'dashboard' },
    icon: 'dashboard'
  },
  {
    name: 'calendar',
    label: 'Calendar',
    to: { name: 'calendar' },
    icon: 'calendar'
  },
  {
    name: 'goals',
    label: 'Goals',
    to: { name: 'goals' },
    icon: 'goals'
  },
  {
    name: 'notifications',
    label: 'Notifications',
    to: { name: 'notifications' },
    icon: 'notifications'
  },
  {
    name: 'profile',
    label: 'Profile',
    to: { name: 'profile' },
    icon: 'profile'
  }
]);

const isActive = (to) => route.name === to.name;
</script>
