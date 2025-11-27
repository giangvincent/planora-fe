<template>
  <div class="space-y-3">
    <div v-if="loading" class="text-center py-4 text-gray-500">Loading tasks...</div>
    <div v-else-if="tasks.length === 0" class="text-center py-8 text-gray-500 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
      <p>No tasks found.</p>
      <p class="text-sm mt-1">Create one to get started!</p>
    </div>
    <TransitionGroup name="list">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @edit="$emit('edit', $event)"
        @delete="$emit('delete', $event)"
      />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import TaskItem from './TaskItem.vue';
import type { Task } from '@/stores/task.store';

defineProps<{
  tasks: Task[];
  loading?: boolean;
}>();

defineEmits(['edit', 'delete']);
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
