<template>
  <div class="flex items-center gap-2 px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-full font-bold border border-yellow-200 dark:border-yellow-800">
    <span class="text-xl">🪙</span>
    <span>{{ gamificationStore.coins }}</span>
  </div>
</template>

<script setup lang="ts">
import { useGamificationStore } from '@/stores/gamification.store';

const gamificationStore = useGamificationStore();
</script>
