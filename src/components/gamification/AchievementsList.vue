<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
    <h2 class="text-xl font-bold mb-4">Achievements</h2>
    <div class="space-y-4">
      <div
        v-for="achievement in achievements"
        :key="achievement.id"
        class="flex items-center gap-4 p-3 rounded-lg border transition-colors"
        :class="[
          achievement.unlocked
            ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800'
            : 'bg-gray-50 border-gray-200 dark:bg-gray-700/50 dark:border-gray-600 opacity-70'
        ]"
      >
        <div class="text-2xl">
          {{ achievement.unlocked ? '🏆' : '🔒' }}
        </div>
        <div>
          <h3 class="font-bold">{{ achievement.title }}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">{{ achievement.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useGamificationStore } from '@/stores/gamification.store';

const gamificationStore = useGamificationStore();

const achievements = computed(() => [
  {
    id: 'early_bird',
    title: 'Early Bird',
    description: 'Complete a task before 9 AM (7 times)',
    unlocked: gamificationStore.achievements.some(a => a.id === 'early_bird' && a.unlocked)
  },
  {
    id: 'deep_focus',
    title: 'Deep Focus',
    description: 'Complete 30 minutes of uninterrupted work',
    unlocked: gamificationStore.achievements.some(a => a.id === 'deep_focus' && a.unlocked)
  },
  {
    id: 'project_mastery',
    title: 'Project Mastery',
    description: 'Finish 5 goals',
    unlocked: gamificationStore.achievements.some(a => a.id === 'project_mastery' && a.unlocked)
  },
  {
    id: 'streak_master_30',
    title: 'Streak Master',
    description: 'Reach a 30-day streak',
    unlocked: gamificationStore.achievements.some(a => a.id === 'streak_master_30' && a.unlocked)
  }
]);
</script>
