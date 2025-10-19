<template>
  <header class="flex items-center justify-between gap-4 border-b border-slate-200 bg-white/80 px-6 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
    <div class="flex items-center gap-3">
      <button
        class="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 md:hidden"
        type="button"
        @click="$emit('toggle-sidebar')"
      >
        <span class="sr-only">Toggle navigation</span>
        <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
      <h1 class="text-xl font-semibold text-slate-900 dark:text-white">
        {{ pageTitle }}
      </h1>
    </div>

    <div class="flex items-center gap-4">
      <button
        class="rounded-full bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
        type="button"
        @click="settingsStore.toggleTheme"
      >
        <span class="sr-only">Toggle theme</span>
        <svg
          v-if="settingsStore.theme === 'light'"
          class="h-5 w-5"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 3v1.5M12 19.5V21M4.5 12H3m18 0h-1.5M6.364 6.364 5.303 5.303m13.394 13.394-1.061-1.061M17.636 6.364l1.061-1.061M6.364 17.636l-1.061 1.061M12 7.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Z"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <svg
          v-else
          class="h-5 w-5"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          viewBox="0 0 24 24"
        >
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <div class="inline-flex items-center gap-3 rounded-full bg-slate-100 p-1 pr-3 dark:bg-slate-800">
        <div class="grid h-9 w-9 place-items-center rounded-full bg-primary-500 text-sm font-semibold uppercase text-white">
          {{ userInitials }}
        </div>
        <div class="hidden text-left text-sm leading-tight md:block">
          <p class="font-medium text-slate-900 dark:text-slate-100">
            {{ settingsStore.profile.name }}
          </p>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            {{ settingsStore.profile.email }}
          </p>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useSettingsStore } from '@/stores/settings';

defineEmits(['toggle-sidebar']);

const route = useRoute();
const settingsStore = useSettingsStore();

const pageTitle = computed(() => route.meta?.title ?? 'Planora');

const userInitials = computed(() => {
  const name = settingsStore.profile.name || 'User';
  const [first = '', second = ''] = name.split(' ');
  return `${first.charAt(0)}${second.charAt(0)}`.toUpperCase() || 'U';
});
</script>
