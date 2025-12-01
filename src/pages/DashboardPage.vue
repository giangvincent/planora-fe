<template>
  <div class="space-y-8">
    <section class="grid gap-6 lg:grid-cols-3">
      <div class="card relative overflow-hidden p-6 lg:col-span-2">
        <div class="absolute -top-16 -right-16 h-36 w-36 rounded-full bg-primary-500/20 blur-3xl" />
        <p class="text-sm font-semibold uppercase tracking-wide text-primary-500">
          Today
        </p>
        <h2 class="mt-2 text-2xl font-semibold text-slate-900 dark:text-white flex items-center gap-3">
          {{ greeting }}, {{ settingsStore.profile.name.split(' ')[0] }} 👋
          <StreakDisplay />
        </h2>
        <p class="mt-2 text-slate-500 dark:text-slate-300">
          {{ quote.text }}
        </p>
        <p class="mt-1 text-sm text-slate-400">
          — {{ quote.author }}
        </p>
        <div class="mt-6 inline-flex items-center gap-3 rounded-full bg-white/70 px-4 py-2 text-xs font-medium uppercase tracking-wider text-primary-600 shadow dark:bg-slate-800/60">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path d="m5 12 5 5L20 7" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          {{ todaysCompletedCount }}/{{ todaysTasks.length }} tasks completed today
        </div>
      </div>

      <div class="card p-6">
        <h3 class="text-lg font-semibold text-slate-900 dark:text-white">
          Weekly focus
        </h3>
        <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Plan your deep work blocks earlier in the week and batch meetings after lunch.
        </p>
        <ul class="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <li class="flex items-center gap-2">
            <span class="text-primary-500">•</span> Block 90 minutes for your top priority.
          </li>
          <li class="flex items-center gap-2">
            <span class="text-primary-500">•</span> Review progress with a 5-minute reflection daily.
          </li>
          <li class="flex items-center gap-2">
            <span class="text-primary-500">•</span> Capture new ideas instantly in Planora.
          </li>
        </ul>
      </div>
    </section>

    <section class="grid gap-6 lg:grid-cols-2">
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-slate-900 dark:text-white">
            Today's tasks
          </h3>
          <button
            class="rounded-full bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            type="button"
            @click="handleAddTask"
          >
            Add task
          </button>
        </div>

        <TaskList
          :loading="tasksStore.loading"
          :tasks="todaysTasks"
          @edit="handleEditTask"
          @remove="handleDeleteTask"
          @toggle="handleToggleTask"
        />
      </div>

      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-slate-900 dark:text-white">
            Weekly goals
          </h3>
          <RouterLink
            class="text-sm font-semibold text-primary-500 hover:text-primary-600"
            :to="{ name: 'goals' }"
          >
            Manage goals
          </RouterLink>
        </div>
        <GoalList
          :goals="activeGoals"
          :loading="goalsStore.loading"
          @complete="handleCompleteGoal"
          @edit="handleEditGoal"
        />
      </div>
    </section>

    <AddTaskModal
      :default-date="selectedDate"
      :goals="goalsStore.goals"
      :open="showTaskModal"
      :task="editingTask"
      @close="handleCloseModal"
      @save="handleSaveTask"
    />
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import TaskList from '@/components/tasks/TaskList.vue';
import GoalList from '@/components/goals/GoalList.vue';
import AddTaskModal from '@/components/tasks/TaskForm.vue'; // Assuming TaskForm is the modal content or similar
import AchievementsList from '@/components/gamification/AchievementsList.vue';
import StreakDisplay from '@/components/gamification/StreakDisplay.vue';
import { useTaskStore } from '@/stores/task.store';
import { useGoalStore } from '@/stores/goal.store';
import { useSettingsStore } from '@/stores/settings'; // Assuming this exists, if not need to check

const tasksStore = useTaskStore();
const goalsStore = useGoalStore();
const settingsStore = useSettingsStore();

const showTaskModal = ref(false);
const editingTask = ref(null);
const selectedDate = ref(new Date().toISOString().slice(0, 10));

const todaysTasks = computed(() => tasksStore.todaysTasks);
const activeGoals = computed(() => goalsStore.activeGoals);
const todaysCompletedCount = computed(() => todaysTasks.value.filter((task) => task.completed).length);

const greeting = computed(() => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
});

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

const handleAddTask = () => {
  editingTask.value = null;
  selectedDate.value = new Date().toISOString().slice(0, 10);
  showTaskModal.value = true;
};

const handleEditTask = (task) => {
  editingTask.value = task;
  selectedDate.value = task.dueDate;
  showTaskModal.value = true;
};

const handleCloseModal = () => {
  showTaskModal.value = false;
  editingTask.value = null;
};

const handleSaveTask = async (task) => {
  if (task.id) {
    await tasksStore.updateTask(task.id, task);
  } else {
    await tasksStore.addTask({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      goalId: task.goalId,
      // completed: task.completed // addTask omits completed
    });
  }
};

const handleToggleTask = async (task) => {
  await tasksStore.completeTask(task.id);
};

const handleDeleteTask = async (task) => {
  await tasksStore.removeTask(task.id);
};

const handleCompleteGoal = async (goal) => {
  await goalsStore.completeGoal(goal.id);
};

const handleEditGoal = (goal) => {
  // Placeholder for future goal edit modal.
  console.info('Edit goal', goal);
};
</script>
