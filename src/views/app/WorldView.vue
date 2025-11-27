<template>
  <div class="h-[calc(100vh-8rem)] relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg">
    <PixelWorldCanvas />
    <PixelWorldHUD />
  </div>
</template>

<script setup lang="ts">
import PixelWorldCanvas from '@/components/pixelworld/PixelWorldCanvas.vue';
import PixelWorldHUD from '@/components/pixelworld/PixelWorldHUD.vue';
</script>
