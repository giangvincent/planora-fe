<template>
  <div class="space-y-8">
    <section class="card p-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-lg font-semibold text-slate-900 dark:text-white">
            {{ goalForm.id ? 'Update goal' : 'Create a new goal' }}
          </h2>
          <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Break down your big objectives into measurable progress.
          </p>
        </div>
        <button
          v-if="goalForm.id"
          class="rounded-full px-3 py-1 text-sm font-semibold text-slate-500 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          type="button"
          @click="resetGoalForm"
        >
          Cancel edit
        </button>
      </div>

      <form class="mt-6 grid gap-4 md:grid-cols-2" @submit.prevent="handleGoalSubmit">
        <div class="space-y-1 md:col-span-2">
          <label class="text-sm font-medium text-slate-600 dark:text-slate-300" for="goal-title">
            Goal title
          </label>
          <input
            id="goal-title"
            v-model="goalForm.title"
            class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            placeholder="Launch a new feature"
            required
            type="text"
          />
        </div>

        <div class="space-y-1 md:col-span-2">
          <label class="text-sm font-medium text-slate-600 dark:text-slate-300" for="goal-description">
            Description
          </label>
          <textarea
            id="goal-description"
            v-model="goalForm.description"
            class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            placeholder="Outline why this goal matters and how you will measure it."
            rows="3"
          />
        </div>

        <div class="space-y-1">
          <label class="text-sm font-medium text-slate-600 dark:text-slate-300" for="goal-date">
            Target date
          </label>
          <input
            id="goal-date"
            v-model="goalForm.targetDate"
            class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            type="date"
            required
          />
        </div>

        <div class="space-y-1">
          <label class="text-sm font-medium text-slate-600 dark:text-slate-300" for="goal-progress">
            Progress ({{ goalForm.progress }}%)
          </label>
          <input
            id="goal-progress"
            v-model.number="goalForm.progress"
            class="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 dark:bg-slate-700"
            max="100"
            min="0"
            step="5"
            type="range"
          />
        </div>

        <div class="md:col-span-2 flex justify-end gap-2">
          <button
            class="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-200 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            type="button"
            @click="resetGoalForm"
          >
            Reset
          </button>
          <button
            class="rounded-full bg-primary-500 px-5 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            type="submit"
          >
            {{ goalForm.id ? 'Update goal' : 'Add goal' }}
          </button>
        </div>
      </form>
    </section>

    <section class="grid gap-6 lg:grid-cols-2">
      <div>
        <h3 class="text-lg font-semibold text-slate-900 dark:text-white">
          Active goals
        </h3>
        <GoalList
          class="mt-4"
          :goals="goalsStore.activeGoals"
          :loading="goalsStore.loading"
          @complete="handleGoalComplete"
          @edit="handleGoalEdit"
        />
      </div>

      <div>
        <h3 class="text-lg font-semibold text-slate-900 dark:text-white">
          Completed goals
        </h3>
        <GoalList
          class="mt-4"
          :goals="goalsStore.completedGoals"
          :loading="goalsStore.loading"
          @edit="handleGoalEdit"
        />
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import GoalList from '@/components/GoalList.vue';
import { useGoalsStore } from '@/stores/goals';

const goalsStore = useGoalsStore();

const goalForm = reactive({
  id: null,
  title: '',
  description: '',
  targetDate: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10),
  progress: 0
});

const resetGoalForm = () => {
  goalForm.id = null;
  goalForm.title = '';
  goalForm.description = '';
  goalForm.targetDate = new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10);
  goalForm.progress = 0;
};

const handleGoalSubmit = async () => {
  const payload = {
    title: goalForm.title,
    description: goalForm.description,
    targetDate: goalForm.targetDate,
    progress: goalForm.progress,
    completed: goalForm.progress >= 100
  };

  if (goalForm.id) {
    await goalsStore.updateGoal(goalForm.id, payload);
  } else {
    await goalsStore.addGoal(payload);
  }

  resetGoalForm();
};

const handleGoalComplete = async (goal) => {
  await goalsStore.markGoalComplete(goal.id);
};

const handleGoalEdit = (goal) => {
  goalForm.id = goal.id;
  goalForm.title = goal.title;
  goalForm.description = goal.description;
  goalForm.targetDate = goal.targetDate;
  goalForm.progress = goal.progress;
};
</script>
