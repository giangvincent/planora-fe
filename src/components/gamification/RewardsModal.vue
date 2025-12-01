<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="transform scale-95 opacity-0"
    enter-to-class="transform scale-100 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="transform scale-100 opacity-100"
    leave-to-class="transform scale-95 opacity-0"
  >
    <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl border-4 border-yellow-400 relative overflow-hidden">
        <!-- Shine effect -->
        <div class="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent animate-pulse pointer-events-none"></div>

        <div class="text-6xl mb-4 animate-bounce">
          {{ icon }}
        </div>

        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {{ title }}
        </h2>

        <p class="text-gray-600 dark:text-gray-300 mb-6">
          {{ message }}
        </p>

        <button
          @click="$emit('close')"
          class="w-full py-3 px-6 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold rounded-xl transition-transform hover:scale-105 active:scale-95"
        >
          Awesome!
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean;
  title: string;
  message: string;
  icon: string;
}>();

defineEmits(['close']);
</script>
