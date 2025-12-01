<template>
  <Transition name="fade">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur"
    >
      <div class="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl dark:bg-slate-900">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold text-slate-900 dark:text-white">
            {{ form.id ? 'Edit Task' : 'Add Task' }}
          </h2>
          <button
            class="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:hover:bg-slate-800"
            type="button"
            @click="emitClose"
          >
            <span class="sr-only">Close modal</span>
            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path d="m6 6 12 12M6 18 18 6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>

        <form class="mt-6 space-y-4" @submit.prevent="handleSubmit">
          <div class="space-y-1">
            <label class="text-sm font-medium text-slate-600 dark:text-slate-300" for="title">
              Title
            </label>
            <input
              id="title"
              v-model="form.title"
              class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              placeholder="What needs to get done?"
              required
              type="text"
            />
          </div>

          <div class="space-y-1">
            <label class="text-sm font-medium text-slate-600 dark:text-slate-300" for="description">
              Description
            </label>
            <textarea
              id="description"
              v-model="form.description"
              class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              placeholder="Add important context."
              rows="3"
            />
          </div>

          <div class="grid gap-4 sm:grid-cols-2">
            <div class="space-y-1">
              <label class="text-sm font-medium text-slate-600 dark:text-slate-300" for="dueDate">
                Due date
              </label>
              <input
                id="dueDate"
                v-model="form.dueDate"
                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                type="date"
                required
              />
            </div>

            <div class="space-y-1">
              <label class="text-sm font-medium text-slate-600 dark:text-slate-300" for="goal">
                Link to goal
              </label>
              <select
                id="goal"
                v-model.number="form.goalId"
                class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option :value="null">No goal</option>
                <option
                  v-for="goal in goals"
                  :key="goal.id"
                  :value="goal.id"
                >
                  {{ goal.title }}
                </option>
              </select>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <input
                id="completed"
                v-model="form.completed"
                class="h-4 w-4 rounded border-slate-300 text-primary-500 focus:ring-primary-500"
                type="checkbox"
              />
              <label class="text-sm text-slate-600 dark:text-slate-300" for="completed">
                Mark as completed
              </label>
            </div>

            <div class="flex gap-2">
              <button
                class="rounded-full px-4 py-2 text-sm font-semibold text-slate-500 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                type="button"
                @click="emitClose"
              >
                Cancel
              </button>
              <button
                class="rounded-full bg-primary-500 px-5 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                type="submit"
              >
                Save Task
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { reactive, watch } from 'vue';

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
  task: {
    type: Object,
    default: null
  },
  defaultDate: {
    type: String,
    default: () => new Date().toISOString().slice(0, 10)
  },
  goals: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['close', 'save']);

const blankForm = () => ({
  id: null,
  title: '',
  description: '',
  dueDate: props.defaultDate,
  goalId: null,
  completed: false
});

const form = reactive(blankForm());

const resetForm = () => {
  Object.assign(form, blankForm());
};

const emitClose = () => {
  emit('close');
};

const handleSubmit = () => {
  emit('save', { ...form });
  emitClose();
  resetForm();
};

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen && props.task) {
      Object.assign(form, {
        id: props.task.id ?? null,
        title: props.task.title ?? '',
        description: props.task.description ?? '',
        dueDate: props.task.dueDate ?? props.defaultDate,
        goalId: props.task.goalId ?? null,
        completed: props.task.completed ?? false
      });
    } else if (isOpen) {
      Object.assign(form, blankForm());
      form.dueDate = props.defaultDate;
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
