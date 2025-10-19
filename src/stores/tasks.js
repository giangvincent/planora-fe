import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import api from '@/services/api';

const shouldSyncWithApi = import.meta.env.VITE_USE_API === 'true';

const defaultTasks = [
  {
    id: 1,
    title: 'Plan weekly sprint',
    description: 'Outline tasks and milestones for the upcoming week.',
    dueDate: new Date().toISOString().slice(0, 10),
    goalId: 1,
    completed: false
  },
  {
    id: 2,
    title: 'Deep work session',
    description: 'Focus on roadmap draft for 90 minutes.',
    dueDate: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
    goalId: 2,
    completed: false
  }
];

export const useTasksStore = defineStore('tasks', () => {
  const tasks = useStorage('planora_tasks', defaultTasks);
  const loading = ref(false);
  const error = ref(null);

  const todaysTasks = computed(() => {
    const today = new Date().toISOString().slice(0, 10);
    return tasks.value.filter((task) => task.dueDate === today);
  });

  const upcomingTasks = computed(() => {
    const now = new Date().toISOString().slice(0, 10);
    return tasks.value.filter((task) => task.dueDate >= now && !task.completed);
  });

  const tasksByDate = computed(() => {
    return tasks.value.reduce((acc, task) => {
      if (!acc[task.dueDate]) {
        acc[task.dueDate] = [];
      }
      acc[task.dueDate].push(task);
      return acc;
    }, {});
  });

  const addTask = async (payload) => {
    loading.value = true;
    try {
      const nextId = tasks.value.length
        ? Math.max(...tasks.value.map((task) => task.id)) + 1
        : 1;
      const task = { id: nextId, completed: false, ...payload };
      tasks.value = [...tasks.value, task];
      if (shouldSyncWithApi) {
        await api.post('/tasks', task);
      }
      return task;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateTask = async (id, updates) => {
    loading.value = true;
    try {
      tasks.value = tasks.value.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      );
      if (shouldSyncWithApi) {
        await api.put(`/tasks/${id}`, updates);
      }
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const toggleTaskCompletion = async (id) => {
    const task = tasks.value.find((item) => item.id === id);
    if (!task) return;

    await updateTask(id, { completed: !task.completed });
  };

  const removeTask = async (id) => {
    loading.value = true;
    try {
      tasks.value = tasks.value.filter((task) => task.id !== id);
      if (shouldSyncWithApi) {
        await api.delete(`/tasks/${id}`);
      }
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const fetchTasks = async () => {
    loading.value = true;
    try {
      if (shouldSyncWithApi) {
        const { data } = await api.get('/tasks');
        tasks.value = data;
      }
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  return {
    tasks,
    loading,
    error,
    todaysTasks,
    upcomingTasks,
    tasksByDate,
    addTask,
    updateTask,
    toggleTaskCompletion,
    removeTask,
    fetchTasks
  };
});
