<template>
  <nav class="h-16 border-b border-gray-200 dark:border-gray-800 flex items-center px-4 justify-between bg-white dark:bg-gray-900">
    <div class="flex items-center gap-4">
      <button @click="uiStore.toggleSidebar" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
        <span class="sr-only">Toggle Sidebar</span>
        <!-- Icon placeholder -->
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
      </button>
      <h1 class="text-xl font-bold bg-gradient-to-r from-primary-500 to-purple-600 bg-clip-text text-transparent">Planora</h1>
    </div>
    <div class="flex items-center gap-4">
      <!-- Gamification Widgets -->
      <div class="hidden md:flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
        <span class="text-yellow-500">🪙</span>
        <span class="font-bold">{{ gamificationStore.coins }}</span>
      </div>
      <div class="hidden md:flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
        <span class="text-blue-500">⭐</span>
        <span class="font-bold">Lvl {{ gamificationStore.level }}</span>
      </div>

      <button @click="userStore.toggleTheme" class="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
        {{ userStore.isDark ? '🌙' : '☀️' }}
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useUIStore } from '@/stores/ui.store';
import { useUserStore } from '@/stores/user.store';
import { useGamificationStore } from '@/stores/gamification.store';

const uiStore = useUIStore();
const userStore = useUserStore();
const gamificationStore = useGamificationStore();
</script>
