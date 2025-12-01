<template>
  <div ref="container" class="w-full h-full bg-sky-200 relative overflow-hidden rounded-xl">
    <!-- Canvas will be injected here -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import * as PIXI from 'pixi.js';
import { usePixelWorldStore } from '@/stores/pixelWorld.store';
import { useGamificationStore } from '@/stores/gamification.store';

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

  // Render Pets
  renderPets(worldContainer);

  // Listen for resize
  window.addEventListener('resize', onResize);
});

function renderObjects(stage: PIXI.Container) {
  pixelStore.world.objects.forEach(obj => {
    const graphics = new PIXI.Graphics();
    graphics.rect(obj.x, obj.y, 32, 32);

    // Different colors for different objects
    if (obj.type === 'tree') graphics.fill(0x8B4513);
    else if (obj.type === 'house') graphics.fill(0xA52A2A);
    else graphics.fill(0xCCCCCC);

    stage.addChild(graphics);
  });

  // Render Unlocked Zones (visual representation)
  if (pixelStore.world.unlockedZones.includes('forest_zone')) {
    const forest = new PIXI.Graphics();
    forest.rect(app!.screen.width - 100, app!.screen.height - 150, 80, 80);
    forest.fill(0x006400); // Dark Green Forest
    stage.addChild(forest);
  }

  if (pixelStore.world.unlockedZones.includes('mountain_zone')) {
    const mountain = new PIXI.Graphics();
    mountain.moveTo(100, app!.screen.height - 100);
    mountain.lineTo(150, app!.screen.height - 200);
    mountain.lineTo(200, app!.screen.height - 100);
    mountain.fill(0x808080); // Grey Mountain
    stage.addChild(mountain);
  }
}

function renderPets(stage: PIXI.Container) {
  const gamificationStore = useGamificationStore();
  if (gamificationStore.inventory.pets.includes('pixel_pet_dog')) {
    const pet = new PIXI.Graphics();
    pet.circle(app!.screen.width / 2 + 50, app!.screen.height - 120, 10);
    pet.fill(0xD2691E); // Chocolate dog
    stage.addChild(pet);
  }
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
