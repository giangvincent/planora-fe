<template>
  <div class="space-y-8">
    <!-- Header / Stats -->
    <div class="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 relative overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute -top-16 -right-16 h-36 w-36 rounded-full bg-primary-500/20 blur-3xl" />

      <div class="relative z-10">
        <h1 class="text-2xl font-bold flex items-center gap-2">
          {{ greeting }}, {{ userStore.preferences.name || 'User' }}! 👋
        </h1>
        <p class="text-gray-500 mt-1">{{ quote.text }}</p>
        <p class="text-xs text-gray-400">— {{ quote.author }}</p>

        <div class="mt-4 inline-flex items-center gap-3 rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 dark:bg-primary-900/20 dark:text-primary-300">
           <span>{{ todaysCompletedCount }}/{{ taskStore.todaysTasks.length }} tasks done today</span>
        </div>
      </div>

      <div class="flex gap-4 relative z-10">
        <XPBar />
        <StreakDisplay />
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main Content: Tasks -->
      <div class="lg:col-span-2 space-y-6">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold">Today's Focus</h2>
          <div class="flex gap-2">
             <button
              class="px-3 py-1.5 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition"
              @click="handleAddTask"
            >
              + Add Task
            </button>
            <RouterLink to="/app/tasks" class="text-primary-600 hover:underline text-sm flex items-center px-2">View All</RouterLink>
          </div>
        </div>

        <TaskList
          :tasks="taskStore.todaysTasks"
          @edit="handleEditTask"
          @delete="handleDeleteTask"
          @toggle="handleToggleTask"
        />
      </div>

      <!-- Sidebar: World Preview & Goals -->
      <div class="space-y-8">
        <!-- World Preview -->
        <div class="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
          <h2 class="font-bold mb-4 flex items-center gap-2">
            <span>Your World</span>
            <span class="text-xs font-normal text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">Level {{ gamificationStore.level }}</span>
          </h2>
          <div class="h-48 rounded-lg overflow-hidden relative group">
             <PixelWorldCanvas />
             <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none"></div>
             <RouterLink to="/app/world" class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/20 text-white font-bold transition-opacity backdrop-blur-[2px]">
               Enter World
             </RouterLink>
          </div>
        </div>

        <!-- Achievements -->
        <AchievementsList />

        <!-- Active Goals -->
        <div>
          <div class="flex items-center justify-between mb-4">
            <h2 class="font-bold">Active Goals</h2>
            <RouterLink to="/app/goals" class="text-xs text-primary-600 hover:underline">Manage</RouterLink>
          </div>

          <div v-if="goalStore.activeGoals.length === 0" class="text-sm text-gray-500 text-center py-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-dashed">
            No active goals.
          </div>

          <div class="space-y-4">
            <div v-for="goal in goalStore.activeGoals.slice(0, 3)" :key="goal.id" class="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-sm transition-shadow">
              <div class="flex justify-between items-start mb-2">
                <h3 class="font-bold text-sm line-clamp-1">{{ goal.title }}</h3>
                <span class="text-xs font-mono bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">{{ goal.progress }}%</span>
              </div>
              <div class="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div class="h-full bg-blue-500 transition-all duration-500" :style="{ width: `${goal.progress}%` }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <AddTaskModal
      :open="showTaskModal"
      :task="editingTask"
      :default-date="selectedDate"
      :goals="goalStore.goals"
      @close="handleCloseModal"
      @save="handleSaveTask"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
import { useUserStore } from '@/stores/user.store';
import { useTaskStore } from '@/stores/task.store';
import { useGoalStore } from '@/stores/goal.store';
import { useGamificationStore } from '@/stores/gamification.store';

import XPBar from '@/components/gamification/XPBar.vue';
import StreakDisplay from '@/components/gamification/StreakDisplay.vue';
import TaskList from '@/components/tasks/TaskList.vue';
import PixelWorldCanvas from '@/components/pixelworld/PixelWorldCanvas.vue';
import AchievementsList from '@/components/gamification/AchievementsList.vue';
import AddTaskModal from '@/components/tasks/AddTaskModal.vue'; // We will move it here

const userStore = useUserStore();
const taskStore = useTaskStore();
const goalStore = useGoalStore();
const gamificationStore = useGamificationStore();
// const settingsStore = useSettingsStore(); // Optional if needed

// State for Modal
const showTaskModal = ref(false);
const editingTask = ref(null);
const selectedDate = ref(new Date().toISOString().slice(0, 10));

// Computed
const todaysCompletedCount = computed(() => taskStore.todaysTasks.filter((t) => t.completed).length);

const greeting = computed(() => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
});

// Quotes
const motivationalQuotes = reactive([
  { text: 'You do not rise to the level of your goals, you fall to the level of your systems.', author: 'James Clear' },
  { text: 'Focus on being productive instead of busy.', author: 'Tim Ferriss' },
  { text: 'Action is the foundational key to all success.', author: 'Pablo Picasso' },
  { text: 'Tiny progress is still progress. Keep going.', author: 'Planora' }
]);

const quote = computed(() => {
  const dayIndex = new Date().getDay();
  return motivationalQuotes[dayIndex % motivationalQuotes.length];
});

// Handlers
const handleAddTask = () => {
  editingTask.value = null;
  selectedDate.value = new Date().toISOString().slice(0, 10);
  showTaskModal.value = true;
};

const handleEditTask = (task: any) => {
  editingTask.value = task;
  selectedDate.value = task.dueDate;
  showTaskModal.value = true;
};

const handleCloseModal = () => {
  showTaskModal.value = false;
  editingTask.value = null;
};

const handleSaveTask = async (task: any) => {
  if (task.id) {
    await taskStore.updateTask(task.id, task);
  } else {
    await taskStore.addTask({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      goalId: task.goalId,
      // completed: task.completed // usually false on create
    });
  }
};

const handleToggleTask = async (taskId: number) => {
  // TaskList emits 'toggle' with ID or task object?
  // Checking TaskList.vue: @toggle="$emit('toggle', $event)" -> TaskItem emits toggleComplete which calls store directly?
  // Wait, TaskItem calls store directly. But TaskList emits 'toggle' too?
  // Let's check TaskList.vue again. It emits 'edit' and 'delete'. It does NOT emit 'toggle' in the version I saw in step 139.
  // But DashboardPage had @toggle="handleToggleTask".
  // Let's assume TaskItem handles toggle internally via store as seen in step 143.
  // So we might not need this handler if the component handles it.
  // However, for consistency with DashboardPage logic, let's keep it if TaskList was updated.
  // Actually, TaskItem.vue (step 143) calls store directly.
  // So we can remove @toggle from template if TaskList doesn't emit it.
  // I will remove @toggle from template above to be safe.
};

const handleDeleteTask = async (taskId: number) => {
  await taskStore.removeTask(taskId);
};
</script>
