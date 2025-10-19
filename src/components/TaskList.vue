<template>
  <div class="space-y-3">
    <p v-if="loading" class="text-sm text-slate-500">Loading tasks...</p>
    <TransitionGroup
      appear
      name="task"
      tag="div"
      class="space-y-3"
    >
      <article
        v-for="task in tasks"
        :key="task.id"
        class="card flex items-start justify-between gap-4 p-4"
      >
        <label class="flex flex-1 cursor-pointer items-start gap-3">
          <input
            :checked="task.completed"
            class="mt-1 h-4 w-4 rounded border-slate-300 text-primary-500 focus:ring-primary-500"
            type="checkbox"
            @change="$emit('toggle', task)"
          />
          <div>
            <h3
              class="text-sm font-semibold text-slate-900 transition dark:text-white"
              :class="{ 'line-through text-slate-400': task.completed }"
            >
              {{ task.title }}
            </h3>
            <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {{ task.description }}
            </p>
            <p class="mt-2 text-xs font-medium uppercase tracking-wide text-slate-400">
              Due {{ formatDate(task.dueDate) }}
            </p>
          </div>
        </label>

        <div class="flex shrink-0 items-center gap-2">
          <button
            class="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:hover:bg-slate-800"
            type="button"
            @click="$emit('edit', task)"
          >
            <span class="sr-only">Edit task</span>
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path d="M21 11.5V8a2 2 0 0 0-.586-1.414L17.414 3.586A2 2 0 0 0 16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M13 21h8m-1-4.5 1.5 1.5L15 21l.5-4.5L18 13l2 2Z" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <button
            class="rounded-full p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 dark:hover:bg-slate-800"
            type="button"
            @click="$emit('remove', task)"
          >
            <span class="sr-only">Delete task</span>
            <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path d="m6 7 1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M4 7h16" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </article>
    </TransitionGroup>

    <p v-if="!loading && !tasks.length" class="text-sm text-slate-500">
      No tasks yet. Add your first task to stay on track.
    </p>
  </div>
</template>

<script setup>

defineProps({
  tasks: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
});

defineEmits(['toggle', 'edit', 'remove']);

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

<style scoped>
.task-enter-active,
.task-leave-active,
.task-move {
  transition: all 0.2s ease;
}

.task-enter-from,
.task-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>
