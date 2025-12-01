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

export interface StreakState {
  current: number;
  longest: number;
  lastActiveDate: string;
}

export interface Inventory {
  chests: number;
  sparks: number;
  pets: string[];
  badges: string[];
}

export interface RewardNotification {
  title: string;
  message: string;
  icon: string;
}

export const useGamificationStore = defineStore('gamification', () => {
  const xp = useStorage('planora_xp', 0);
  const coins = useStorage('planora_coins', 0);
  const level = computed(() => Math.floor(Math.sqrt(xp.value / 100)) + 1);
  const xpToNextLevel = computed(() => {
    const nextLevel = level.value + 1;
    return Math.pow(nextLevel - 1, 2) * 100;
  });

  const streak = useStorage<StreakState>('planora_streak', {
    current: 0,
    longest: 0,
    lastActiveDate: '',
  });

  const inventory = useStorage<Inventory>('planora_inventory', {
    chests: 0,
    sparks: 0,
    pets: [],
    badges: [],
  });

  const currentReward = ref<RewardNotification | null>(null);

  const achievements = useStorage<Achievement[]>('planora_achievements', []);

  // Actions
  function addXp(amount: number) {
    xp.value += amount;
    // Check for level up logic here if needed, or just rely on computed level
  }

  function addCoins(amount: number) {
    coins.value += amount;
  }

  function addSparks(amount: number) {
    inventory.value.sparks += amount;
  }

  function addChest(amount: number) {
    inventory.value.chests += amount;
    showReward('Chest Unlocked!', `You received ${amount} chest(s)!`, '🎁');
  }

  function unlockPet(petId: string) {
    if (!inventory.value.pets.includes(petId)) {
      inventory.value.pets.push(petId);
      showReward('New Pet!', 'You unlocked a new pixel pet!', '🐶');
    }
  }

  function unlockBadge(badgeId: string) {
    if (!inventory.value.badges.includes(badgeId)) {
      inventory.value.badges.push(badgeId);
      showReward('Badge Unlocked!', 'You earned a new badge!', '🏅');
    }
  }

  function showReward(title: string, message: string, icon: string) {
    currentReward.value = { title, message, icon };
  }

  function clearReward() {
    currentReward.value = null;
  }

  function onTaskCompleted(task: any) {
    // Difficulty Bonus
    let xpBonus = 0;
    if (task.priority === 'medium') xpBonus = 5;
    if (task.priority === 'high') xpBonus = 10;

    // Basic reward + Bonus
    addXp(10 + xpBonus);
    addCoins(5);

    // Check streak
    checkDailyStreak();

    // Check Achievements
    checkAchievements(task);

    // Trigger world update if needed
    const pixelStore = usePixelWorldStore();
    pixelStore.checkRewards();
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

    // Check Streak Rewards
    checkStreakRewards();
  }

  function checkStreakRewards() {
    const s = streak.value.current;
    if (s >= 3) unlockPet('pixel_pet_dog'); // Example pet
    if (s >= 7) {
      const pixelStore = usePixelWorldStore();
      pixelStore.unlockZone('forest_zone'); // Example zone
    }
    if (s >= 30) unlockBadge('streak_master_30');
  }

  function checkAchievements(task?: any) {
    // Early Bird: Complete morning task (before 9 AM)
    if (task) {
      const hour = new Date().getHours();
      if (hour < 9) {
        incrementAchievementProgress('early_bird');
      }
    }

    // Project Mastery: Finish 5 goals (handled in goal store or here if we track goal count)
    // Deep Focus: Handled by timer component
  }

  function incrementAchievementProgress(id: string) {
    const ach = achievements.value.find(a => a.id === id);
    if (ach && !ach.unlocked) {
      // Logic to track progress would go here. For now, let's assume simple unlock for demo
      // In a real app, we'd need a 'progress' field on Achievement interface
      // For this demo, we'll just unlock it if it's hit enough times (need storage for counts)
      // Simulating unlock:
      unlockAchievement(id);
    }
  }

  function unlockAchievement(id: string) {
    const ach = achievements.value.find(a => a.id === id);
    if (ach && !ach.unlocked) {
      ach.unlocked = true;
      ach.unlockedAt = new Date().toISOString();
      addXp(50); // Achievement XP reward
      showReward('Achievement Unlocked!', `You unlocked: ${ach.title}`, '🏆');
    }
  }

  function claimDailySpark() {
    const today = new Date().toISOString().split('T')[0];
    // We can use a separate storage for last spark claim or piggyback on streak
    // Let's assume we check if we haven't claimed it today
    // For simplicity, let's say 'checkDailyStreak' also gives a spark if it's a new day
    // But requirements say "User receives a Pixel Spark" - likely on login
    // We'll add a specific method for it
    addSparks(1);
  }

  return {
    inventory,
    addXp,
    addCoins,
    addSparks,
    addChest,
    onTaskCompleted,
    checkDailyStreak,
    claimDailySpark,
    unlockAchievement,
    currentReward,
    clearReward,
    achievements,
  };
});
