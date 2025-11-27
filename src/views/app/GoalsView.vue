<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold">Goals</h1>
      <button class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
        + New Goal
      </button>
    </div>

    <GoalList
      :goals="goalStore.goals"
      @delete="goalStore.goals = goalStore.goals.filter(g => g.id !== $event)"
    />
  </div>
</template>

<script setup lang="ts">
import { useGoalStore } from '@/stores/goal.store';
import GoalList from '@/components/goals/GoalList.vue';

const goalStore = useGoalStore();
</script>
