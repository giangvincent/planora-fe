<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div v-if="loading" class="col-span-full text-center py-8">Loading goals...</div>
    <div v-else-if="goals.length === 0" class="col-span-full text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
      <p class="text-lg font-medium">No goals set yet</p>
      <p class="text-gray-500">Set a goal to start your journey!</p>
    </div>

    <GoalCard
      v-for="goal in goals"
      :key="goal.id"
      :goal="goal"
      @edit="$emit('edit', $event)"
      @delete="$emit('delete', $event)"
      @complete="$emit('complete', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import GoalCard from './GoalCard.vue';
import type { Goal } from '@/stores/goal.store';

defineProps<{
  goals: Goal[];
  loading?: boolean;
}>();

defineEmits(['edit', 'delete', 'complete']);
</script>
