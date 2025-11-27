<template>
  <div class="space-y-8">
    <!-- Header / Stats -->
    <div class="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div>
        <h1 class="text-2xl font-bold">Welcome back, {{ userStore.preferences.name || 'User' }}! 👋</h1>
        <p class="text-gray-500">You have {{ taskStore.todaysTasks.length }} tasks for today.</p>
      </div>
      <div class="flex gap-4">
        <XPBar />
        <StreakDisplay />
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main Content: Tasks -->
      <div class="lg:col-span-2 space-y-6">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold">Today's Focus</h2>
          <RouterLink to="/app/tasks" class="text-primary-600 hover:underline text-sm">View All</RouterLink>
        </div>
        <TaskList :tasks="taskStore.todaysTasks" />
      </div>

      <!-- Sidebar: World Preview & Goals -->
      <div class="space-y-6">
        <div class="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
          <h2 class="font-bold mb-4">Your World</h2>
          <div class="h-48 rounded-lg overflow-hidden relative">
             <PixelWorldCanvas />
             <div class="absolute inset-0 bg-black/10 hover:bg-black/0 transition-colors pointer-events-none"></div>
             <RouterLink to="/app/world" class="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/20 text-white font-bold transition-opacity">
               Enter World
             </RouterLink>
          </div>
        </div>

        <div>
          <h2 class="font-bold mb-4">Active Goals</h2>
          <div class="space-y-4">
            <div v-for="goal in goalStore.activeGoals.slice(0, 2)" :key="goal.id" class="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 class="font-bold text-sm">{{ goal.title }}</h3>
              <div class="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mt-2 overflow-hidden">
                <div class="h-full bg-blue-500" :style="{ width: `${goal.progress}%` }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user.store';
import { useTaskStore } from '@/stores/task.store';
import { useGoalStore } from '@/stores/goal.store';
import XPBar from '@/components/gamification/XPBar.vue';
import StreakDisplay from '@/components/gamification/StreakDisplay.vue';
import TaskList from '@/components/tasks/TaskList.vue';
import PixelWorldCanvas from '@/components/pixelworld/PixelWorldCanvas.vue';

const userStore = useUserStore();
const taskStore = useTaskStore();
const goalStore = useGoalStore();
</script>
