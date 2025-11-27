<template>
  <aside
    class="fixed left-0 top-16 bottom-0 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-transform duration-300 z-20"
    :class="{ '-translate-x-full': !uiStore.sidebarOpen }"
  >
    <div class="p-4 space-y-2">
      <RouterLink
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        active-class="bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
      >
        <span>{{ item.icon }}</span>
        <span class="font-medium">{{ item.label }}</span>
      </RouterLink>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useUIStore } from '@/stores/ui.store';

const uiStore = useUIStore();

const navItems = [
  { label: 'Dashboard', path: '/app/dashboard', icon: '📊' },
  { label: 'Tasks', path: '/app/tasks', icon: '✅' },
  { label: 'Goals', path: '/app/goals', icon: '🎯' },
  { label: 'Calendar', path: '/app/calendar', icon: '📅' },
  { label: 'World', path: '/app/world', icon: '🌍' },
  { label: 'Profile', path: '/app/profile', icon: '👤' },
  { label: 'Settings', path: '/app/settings', icon: '⚙️' },
];
</script>
