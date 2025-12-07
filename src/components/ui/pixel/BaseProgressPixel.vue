<template>
  <div class="w-full">
    <div v-if="label || showValue" class="flex justify-between mb-1">
      <span v-if="label" class="font-pixel text-xs uppercase">{{ label }}</span>
      <span v-if="showValue" class="font-pixel text-xs">{{ current }} / {{ max }}</span>
    </div>
    <div class="relative w-full h-4 bg-slate-200 border-2 border-pixel-border">
      <div
        class="h-full transition-all duration-500 ease-out"
        :class="colorClass"
        :style="{ width: `${percentage}%` }"
      ></div>
      <!-- Optional: segments/ticks could go here -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  current: {
    type: Number,
    required: true
  },
  max: {
    type: Number,
    default: 100
  },
  label: {
    type: String,
    default: ''
  },
  showValue: {
    type: Boolean,
    default: false
  },
  variant: {
    type: String,
    default: 'primary' // primary, xp, health
  }
});

const percentage = computed(() => {
  return Math.min(100, Math.max(0, (props.current / props.max) * 100));
});

const colorClass = computed(() => {
  switch (props.variant) {
    case 'xp': return 'bg-pixel-xp';
    case 'health': return 'bg-pixel-danger';
    case 'coin': return 'bg-pixel-coin';
    default: return 'bg-pixel-primary';
  }
});
</script>
