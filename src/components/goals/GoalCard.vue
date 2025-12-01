<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
    <div class="flex justify-between items-start mb-2">
      <h3 class="font-bold text-lg">{{ goal.title }}</h3>
      <span
        class="px-2 py-1 text-xs rounded-full"
        :class="goal.completed ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'"
      >
        {{ goal.completed ? 'Completed' : 'In Progress' }}
      </span>
    </div>

    <p class="text-gray-500 text-sm mb-4 line-clamp-2">{{ goal.description }}</p>

    <div class="space-y-1">
      <div class="flex justify-between text-xs text-gray-500">
        <span>Progress</span>
        <span>{{ goal.progress }}%</span>
      </div>
      <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          class="h-full bg-blue-500 rounded-full transition-all duration-500"
          :style="{ width: `${goal.progress}%` }"
        ></div>
      </div>
    </div>

    <div class="mt-4 flex justify-end gap-2">
      <button
        v-if="!goal.completed"
        @click="$emit('complete', goal.id)"
        class="text-sm text-green-600 hover:text-green-700 font-medium"
      >
        Complete
      </button>
      <button @click="$emit('edit', goal)" class="text-sm text-gray-500 hover:text-blue-500">Edit</button>
      <button @click="$emit('delete', goal.id)" class="text-sm text-gray-500 hover:text-red-500">Delete</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Goal } from '@/stores/goal.store';

defineProps<{
  goal: Goal
}>();

defineEmits(['edit', 'delete', 'complete']);
</script>
