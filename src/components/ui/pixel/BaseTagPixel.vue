<template>
  <span
    class="inline-flex items-center px-2 py-1 text-xs font-bold uppercase border-2 border-pixel-border"
    :class="variantClass"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'neutral',
    validator: (val: string) => ['primary', 'accent', 'danger', 'success', 'warning', 'neutral'].includes(val)
  }
});

const variantClass = computed(() => {
  switch (props.variant) {
    case 'primary': return 'bg-pixel-primary text-white';
    case 'accent': return 'bg-pixel-accent text-white';
    case 'danger': return 'bg-pixel-danger text-white';
    case 'success': return 'bg-pixel-success text-white';
    case 'warning': return 'bg-pixel-warning text-white';
    case 'neutral': return 'bg-slate-200 text-pixel-text';
    default: return 'bg-slate-200 text-pixel-text';
  }
});
</script>
