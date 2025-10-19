<template>
  <div class="space-y-4">
    <p v-if="loading" class="text-sm text-slate-500">Loading goals...</p>

    <article
      v-for="goal in goals"
      :key="goal.id"
      class="card space-y-4 p-5"
    >
      <div class="flex items-center justify-between gap-4">
        <div>
          <h3 class="text-base font-semibold text-slate-900 dark:text-white">
            {{ goal.title }}
          </h3>
          <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {{ goal.description }}
          </p>
        </div>
        <span
          class="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-600 dark:bg-primary-500/10 dark:text-primary-300"
        >
          {{ goal.progress }}%
        </span>
      </div>

      <div>
        <div class="h-2 rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            class="h-full rounded-full bg-primary-500 transition-all"
            :style="{ width: `${goal.progress}%` }"
          />
        </div>
        <p class="mt-2 text-xs uppercase tracking-wide text-slate-400">
          Target {{ formatDate(goal.targetDate) }}
        </p>
      </div>

      <div class="flex items-center gap-2">
        <button
          v-if="!goal.completed"
          class="rounded-full bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          type="button"
          @click="$emit('complete', goal)"
        >
          Mark Completed
        </button>
        <button
          class="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-200 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          type="button"
          @click="$emit('edit', goal)"
        >
          Edit Goal
        </button>
      </div>
    </article>

    <p v-if="!loading && !goals.length" class="text-sm text-slate-500">
      No goals to display. Start by adding what you want to achieve.
    </p>
  </div>
</template>

<script setup>
defineProps({
  goals: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
});

defineEmits(['complete', 'edit']);

const formatDate = (date) => {
  try {
    return new Intl.DateTimeFormat(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(date));
  } catch (error) {
    return date;
  }
};
</script>
