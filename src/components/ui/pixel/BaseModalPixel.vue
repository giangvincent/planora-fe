<template>
  <Transition name="pixel-modal">
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" @click="closeOnBackdrop ? $emit('close') : null"></div>

        <!-- Modal Content -->
        <div class="relative w-full max-w-lg z-10 transform transition-all pixel-card" role="dialog" aria-modal="true">
            <!-- Header -->
            <div class="flex justify-between items-center mb-4 border-b-2 border-pixel-border pb-2">
                <h3 class="font-pixel text-lg text-pixel-text uppercase">{{ title }}</h3>
                <button @click="$emit('close')" class="hover:bg-red-100 p-1 rounded pixel-border-sm">
                    <span class="sr-only">Close</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- Body -->
            <div class="mb-6">
                <slot />
            </div>

            <!-- Footer -->
            <div v-if="$slots.footer" class="flex justify-end gap-2 border-t-2 border-dotted border-pixel-border pt-4">
                <slot name="footer" />
            </div>
        </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Notification'
  },
  closeOnBackdrop: {
    type: Boolean,
    default: true
  }
});

defineEmits(['close']);
</script>

<style scoped>
.pixel-modal-enter-active,
.pixel-modal-leave-active {
  transition: opacity 0.2s ease;
}

.pixel-modal-enter-from,
.pixel-modal-leave-to {
  opacity: 0;
}

.pixel-modal-enter-active .pixel-card,
.pixel-modal-leave-active .pixel-card {
    transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.pixel-modal-enter-from .pixel-card {
    transform: scale(0.9) translateY(10px);
}
.pixel-modal-leave-to .pixel-card {
    transform: scale(0.95);
}
</style>
