<template>
  <div ref="container" class="w-full h-full bg-sky-200 relative overflow-hidden rounded-xl">
    <!-- Canvas will be injected here -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import * as PIXI from 'pixi.js';
import { usePixelWorldStore } from '@/stores/pixelWorld.store';

const container = ref<HTMLElement | null>(null);
const pixelStore = usePixelWorldStore();

let app: PIXI.Application | null = null;

onMounted(async () => {
  if (!container.value) return;

  app = new PIXI.Application();

  await app.init({
    resizeTo: container.value,
    backgroundColor: 0x87CEEB, // Sky blue
    antialias: false, // Pixel art look
  });

  container.value.appendChild(app.canvas);

  // Create a container for the world
  const worldContainer = new PIXI.Container();
  app.stage.addChild(worldContainer);

  // Ground
  const ground = new PIXI.Graphics();
  ground.rect(0, app.screen.height - 100, app.screen.width, 100);
  ground.fill(0x228B22); // Forest green
  worldContainer.addChild(ground);

  // Render objects from store
  renderObjects(worldContainer);

  // Listen for resize
  window.addEventListener('resize', onResize);
});

function renderObjects(stage: PIXI.Container) {
  // Clear existing objects if needed or just add new ones
  // For demo, let's add a simple placeholder for objects
  pixelStore.world.objects.forEach(obj => {
    const graphics = new PIXI.Graphics();
    graphics.rect(obj.x, obj.y, 32, 32);
    graphics.fill(0x8B4513); // Brown box (tree trunk?)
    stage.addChild(graphics);
  });
}

function onResize() {
  if (app && container.value) {
    app.resize();
    // Re-draw ground
    // In a real game, you'd have a better camera/viewport system
  }
}

onUnmounted(() => {
  window.removeEventListener('resize', onResize);
  if (app) {
    app.destroy(true, { children: true });
  }
});
</script>
