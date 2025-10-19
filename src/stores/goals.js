import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import api from '@/services/api';

const shouldSyncWithApi = import.meta.env.VITE_USE_API === 'true';

const defaultGoals = [
  {
    id: 1,
    title: 'Launch MVP',
    description: 'Ship the first version of Planora to early adopters.',
    targetDate: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
    progress: 45,
    completed: false
  },
  {
    id: 2,
    title: 'Improve health routine',
    description: 'Hit fitness goals and track daily habits.',
    targetDate: new Date(Date.now() + 30 * 86400000).toISOString().slice(0, 10),
    progress: 60,
    completed: false
  }
];

export const useGoalsStore = defineStore('goals', () => {
  const goals = useStorage('planora_goals', defaultGoals);
  const loading = ref(false);
  const error = ref(null);

  const activeGoals = computed(() => goals.value.filter((goal) => !goal.completed));
  const completedGoals = computed(() => goals.value.filter((goal) => goal.completed));

  const addGoal = async (payload) => {
    loading.value = true;
    try {
      const nextId = goals.value.length
        ? Math.max(...goals.value.map((goal) => goal.id)) + 1
        : 1;
      const goal = { id: nextId, progress: 0, completed: false, ...payload };
      goals.value = [...goals.value, goal];
      if (shouldSyncWithApi) {
        await api.post('/goals', goal);
      }
      return goal;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateGoal = async (id, updates) => {
    loading.value = true;
    try {
      goals.value = goals.value.map((goal) =>
        goal.id === id ? { ...goal, ...updates } : goal
      );
      if (shouldSyncWithApi) {
        await api.put(`/goals/${id}`, updates);
      }
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const markGoalComplete = (id) => updateGoal(id, { completed: true, progress: 100 });

  const fetchGoals = async () => {
    loading.value = true;
    try {
      if (shouldSyncWithApi) {
        const { data } = await api.get('/goals');
        goals.value = data;
      }
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  return {
    goals,
    loading,
    error,
    activeGoals,
    completedGoals,
    addGoal,
    updateGoal,
    markGoalComplete,
    fetchGoals
  };
});
