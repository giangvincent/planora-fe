<template>
  <div
    class="group flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all"
    :class="{ 'opacity-60': task.completed }"
  >
    <button
      @click="toggleComplete"
      class="w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors"
      :class="task.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 dark:border-gray-600 hover:border-green-500'"
    >
      <svg v-if="task.completed" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>
    </button>

    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2 mb-1">
        <h3
          class="font-medium truncate"
          :class="{ 'line-through text-gray-500': task.completed }"
        >
          {{ task.title }}
        </h3>
        <!-- Badges -->
        <span v-if="task.isWeeklyFocus" class="px-1.5 py-0.5 text-[10px] font-bold bg-purple-100 text-purple-700 rounded border border-purple-200">
          WEEKLY
        </span>
        <span
          class="px-1.5 py-0.5 text-[10px] font-bold rounded border"
          :class="priorityClass"
        >
          +{{ xpReward }} XP
        </span>
      </div>
      <p v-if="task.description" class="text-xs text-gray-500 truncate">{{ task.description }}</p>
    </div>

    <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <button @click="$emit('edit', task)" class="p-1 text-gray-400 hover:text-blue-500">
        ✏️
      </button>
      <button @click="$emit('delete', task.id)" class="p-1 text-gray-400 hover:text-red-500">
        🗑️
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Task } from '@/stores/task.store';
import { useTaskStore } from '@/stores/task.store';

const props = defineProps<{
  task: Task
}>();

const emit = defineEmits(['edit', 'delete']);

const taskStore = useTaskStore();

function toggleComplete() {
  if (!props.task.completed) {
    taskStore.completeTask(props.task.id);
  } else {
    taskStore.updateTask(props.task.id, { completed: false });
  }
}

import { computed } from 'vue';

const xpReward = computed(() => {
  let base = 10;
  if (props.task.priority === 'medium') base += 5;
  if (props.task.priority === 'high') base += 10;
  return base;
});

const priorityClass = computed(() => {
  switch (props.task.priority) {
    case 'high': return 'bg-red-100 text-red-700 border-red-200';
    case 'medium': return 'bg-orange-100 text-orange-700 border-orange-200';
    default: return 'bg-green-100 text-green-700 border-green-200';
  }
});
</script>
