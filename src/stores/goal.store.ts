import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useStorage } from '@vueuse/core';
import { useGamificationStore } from './gamification.store';

export interface Goal {
  id: number;
  title: string;
  description: string;
  targetDate: string;
  progress: number;
  completed: boolean;
}

const defaultGoals: Goal[] = [
  {
    id: 1,
    title: 'Launch MVP',
    description: 'Ship the first version of Planora to early adopters.',
    targetDate: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
    progress: 45,
    completed: false
  }
];

export const useGoalStore = defineStore('goal', () => {
  const goals = useStorage<Goal[]>('planora_goals', defaultGoals);
  const loading = ref(false);
  const error = ref<any>(null);

  const gamificationStore = useGamificationStore();

  const activeGoals = computed(() => goals.value.filter((goal) => !goal.completed));
  const completedGoals = computed(() => goals.value.filter((goal) => goal.completed));

  async function addGoal(payload: Omit<Goal, 'id' | 'progress' | 'completed'>) {
    loading.value = true;
    try {
      const nextId = goals.value.length
        ? Math.max(...goals.value.map((goal) => goal.id)) + 1
        : 1;
      const goal: Goal = { id: nextId, progress: 0, completed: false, ...payload };
      goals.value.push(goal);
      return goal;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function updateGoal(id: number, updates: Partial<Goal>) {
    loading.value = true;
    try {
      const index = goals.value.findIndex(g => g.id === id);
      if (index !== -1) {
        goals.value[index] = { ...goals.value[index], ...updates };
      }
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  }

  async function completeGoal(id: number) {
    const goal = goals.value.find((g) => g.id === id);
    if (goal && !goal.completed) {
      await updateGoal(id, { completed: true, progress: 100 });
      // Big reward for goal completion
      gamificationStore.addXp(100);
      gamificationStore.addCoins(50);
    }
  }

  return {
    goals,
    loading,
    error,
    activeGoals,
    completedGoals,
    addGoal,
    updateGoal,
    completeGoal,
  };
});
