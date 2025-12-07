<template>
  <div class="pixel-card p-4 relative" :class="customClasses">
    <div v-if="title" class="mb-4 border-b-2 border-pixel-border pb-2">
      <h3 class="font-pixel text-lg text-pixel-text uppercase">{{ title }}</h3>
    </div>

    <slot />

    <div v-if="$slots.footer" class="mt-4 pt-4 border-t-2 border-dotted border-pixel-border">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  hoverable: {
    type: Boolean,
    default: false
  }
});

const customClasses = computed(() => {
    return {
        'hover:shadow-pixel-hover hover:-translate-y-[2px] cursor-pointer': props.hoverable
    }
})
</script>
