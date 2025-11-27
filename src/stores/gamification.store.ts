import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useStorage } from '@vueuse/core';
import { usePixelWorldStore } from './pixelWorld.store';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export const useGamificationStore = defineStore('gamification', () => {
  const xp = useStorage('planora_xp', 0);
  const coins = useStorage('planora_coins', 0);
  const level = computed(() => Math.floor(Math.sqrt(xp.value / 100)) + 1);
  const xpToNextLevel = computed(() => {
    const nextLevel = level.value + 1;
    return Math.pow(nextLevel - 1, 2) * 100;
  });

  const streak = useStorage('planora_streak', {
    current: 0,
    longest: 0,
    lastActiveDate: '',
  });

  const achievements = useStorage<Achievement[]>('planora_achievements', []);

  // Actions
  function addXp(amount: number) {
    xp.value += amount;
    // Check for level up logic here if needed, or just rely on computed level
  }

  function addCoins(amount: number) {
    coins.value += amount;
  }

  function onTaskCompleted(task: any) {
    // Basic reward
    addXp(10);
    addCoins(5);

    // Check streak
    checkDailyStreak();

    // Trigger world update if needed
    // const pixelStore = usePixelWorldStore();
    // pixelStore.checkRewards();
  }

  function checkDailyStreak() {
    const today = new Date().toISOString().split('T')[0];
    if (streak.value.lastActiveDate === today) return;

    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    if (streak.value.lastActiveDate === yesterday) {
      streak.value.current++;
    } else {
      streak.value.current = 1;
    }

    if (streak.value.current > streak.value.longest) {
      streak.value.longest = streak.value.current;
    }

    streak.value.lastActiveDate = today;
  }

  return {
    xp,
    coins,
    level,
    xpToNextLevel,
    streak,
    achievements,
    addXp,
    addCoins,
    onTaskCompleted,
    checkDailyStreak,
  };
});
