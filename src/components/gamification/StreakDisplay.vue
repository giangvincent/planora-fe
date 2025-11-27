<template>
  <div class="flex items-center gap-2 px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-full font-bold border border-orange-200 dark:border-orange-800">
    <span class="text-xl">🔥</span>
    <span>{{ gamificationStore.streak.current }} Day Streak</span>
  </div>
</template>

<script setup lang="ts">
import { useGamificationStore } from '@/stores/gamification.store';

const gamificationStore = useGamificationStore();
</script>
