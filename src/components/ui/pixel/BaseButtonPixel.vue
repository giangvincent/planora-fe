<template>
  <button
    class="pixel-btn flex items-center justify-center gap-2 active:scale-95 transition-transform"
    :class="[
      variantClass,
      sizeClass,
      { 'opacity-50 cursor-not-allowed': disabled }
    ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot name="icon-left" />
    <span :class="{ 'mt-[2px]': true }"><slot /></span> <!-- Slight offset for pixel font alignment if needed -->
    <slot name="icon-right" />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary', // primary, accent, danger, warning, success
    validator: (val: string) => ['primary', 'accent', 'danger', 'warning', 'success', 'outline'].includes(val)
  },
  size: {
    type: String,
    default: 'md', // sm, md, lg
    validator: (val: string) => ['sm', 'md', 'lg'].includes(val)
  },
  disabled: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['click']);

const variantClass = computed(() => {
  switch (props.variant) {
    case 'accent': return 'pixel-btn-accent'; // Defined in pixel.css or use tailwind bg-pixel-accent
    case 'danger': return 'bg-pixel-danger border-pixel-border text-white';
    case 'warning': return 'bg-pixel-warning border-pixel-border text-white';
    case 'success': return 'bg-pixel-success border-pixel-border text-white';
    case 'outline': return 'bg-transparent border-pixel-border text-pixel-text hover:bg-slate-100';
    default: return 'bg-pixel-primary border-pixel-border text-white';
  }
});

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm': return 'text-xs py-2 px-3';
    case 'lg': return 'text-lg py-4 px-6';
    default: return 'text-sm py-3 px-5'; // Default md
  }
});
</script>

<style scoped>
/* Scoped overrides if necessary, but relying on pixel.css global classes is better for consistency */
</style>
