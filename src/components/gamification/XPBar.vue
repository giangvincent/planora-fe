<template>
  <div class="w-full max-w-xs">
    <div class="flex justify-between text-sm mb-1">
      <span class="font-bold text-primary-600">Level {{ gamificationStore.level }}</span>
      <span class="text-gray-500">{{ Math.floor(gamificationStore.xp) }} / {{ gamificationStore.xpToNextLevel }} XP</span>
    </div>
    <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
      <div
        class="h-full bg-gradient-to-r from-primary-400 to-primary-600 transition-all duration-500 ease-out"
        :style="{ width: `${progress}%` }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useGamificationStore } from '@/stores/gamification.store';

const gamificationStore = useGamificationStore();

const progress = computed(() => {
  // Simplified progress calculation for demo
  // In reality, we'd calculate progress within the current level
  return (gamificationStore.xp % 100);
});
</script>
