import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useStorage } from '@vueuse/core';
import { useGamificationStore } from './gamification.store';
import { usePixelWorldStore } from './pixelWorld.store';


// import api from '@/services/api/http'; // Uncomment when API is ready

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  goalId?: number;
  completed: boolean;
  priority?: 'low' | 'medium' | 'high';
  isWeeklyFocus?: boolean;
}

const defaultTasks: Task[] = [
  {
    id: 1,
    title: 'Plan weekly sprint',
    description: 'Outline tasks and milestones for the upcoming week.',
    dueDate: new Date().toISOString().slice(0, 10),
    goalId: 1,
    completed: false,
    priority: 'high'
  },
  {
    id: 2,
    title: 'Deep work session',
    description: 'Focus on roadmap draft for 90 minutes.',
    dueDate: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
    goalId: 2,
    completed: false,
    priority: 'medium'
  }
];

export const useTaskStore = defineStore('task', () => {
  const tasks = useStorage<Task[]>('planora_tasks', defaultTasks);
  const loading = ref(false);
  const error = ref<any>(null);

  const gamificationStore = useGamificationStore();

  const todaysTasks = computed(() => {
    const today = new Date().toISOString().slice(0, 10);
    return tasks.value.filter((task) => task.dueDate === today);
  });

  const upcomingTasks = computed(() => {
    const now = new Date().toISOString().slice(0, 10);
    return tasks.value.filter((task) => task.dueDate >= now && !task.completed);
  });

  async function addTask(payload: Omit<Task, 'id' | 'completed'>) {
    loading.value = true;
    try {
      const nextId = tasks.value.length
        ? Math.max(...tasks.value.map((task) => task.id)) + 1
        : 1;
      const task: Task = { id: nextId, completed: false, ...payload };
      tasks.value.push(task);
      // await api.post('/tasks', task);
      return task;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function updateTask(id: number, updates: Partial<Task>) {
    loading.value = true;
    try {
      const index = tasks.value.findIndex(t => t.id === id);
      if (index !== -1) {
        tasks.value[index] = { ...tasks.value[index], ...updates };
        // await api.put(`/tasks/${id}`, updates);
      }
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  }

  async function completeTask(id: number) {
    const task = tasks.value.find((t) => t.id === id);
    if (task && !task.completed) {
      await updateTask(id, { completed: true });
      gamificationStore.onTaskCompleted(task);
      checkWeeklyPlanCompletion();
    }
  }

  function checkWeeklyPlanCompletion() {
    // Check if there are any weekly focus tasks
    const weeklyTasks = tasks.value.filter(t => t.isWeeklyFocus);
    if (weeklyTasks.length === 0) return;

    // Check if all are completed
    const allCompleted = weeklyTasks.every(t => t.completed);
    if (allCompleted) {
      // Trigger Map Expansion
      const pixelStore = usePixelWorldStore();
      // Assuming we unlock a specific zone for weekly plan, or just the next available one
      pixelStore.unlockZone('mountain_zone'); // Example
      gamificationStore.addXp(200); // Bonus XP for weekly plan
    }
  }

  async function removeTask(id: number) {
    loading.value = true;
    try {
      tasks.value = tasks.value.filter((task) => task.id !== id);
      // await api.delete(`/tasks/${id}`);
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  }

  return {
    tasks,
    loading,
    error,
    todaysTasks,
    upcomingTasks,
    addTask,
    updateTask,
    completeTask,
    removeTask,
    checkWeeklyPlanCompletion,
  };
});
