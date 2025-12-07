<template>
  <div class="h-[calc(100vh-80px)] relative border-4 border-pixel-border rounded-xl overflow-hidden shadow-pixel">
    <PixelWorldCanvas interactive />

    <PixelWorldHUD
        :show-inventory="isInventoryOpen"
        :inventory="worldStore.inventory"
        @toggle-inventory="isInventoryOpen = !isInventoryOpen"
        @select-item="placeItem"
    />

    <!-- Placement Toast -->
    <div v-if="lastAction" class="absolute top-20 left-1/2 -translate-x-1/2 z-50 animate-bounce">
        <BaseTagPixel variant="success">{{ lastAction }}</BaseTagPixel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useWorldStore, type InventoryItem } from '@/stores/world.store';
import PixelWorldCanvas from '@/components/pixelworld/PixelWorldCanvas.vue';
import PixelWorldHUD from '@/components/pixelworld/PixelWorldHUD.vue';
import BaseTagPixel from '@/components/ui/pixel/BaseTagPixel.vue';

const worldStore = useWorldStore();
const isInventoryOpen = ref(false);
const lastAction = ref('');

function placeItem(item: InventoryItem) {
    // Mock placement at random location for now
    // In real app, we would enter "placement mode" and wait for canvas click
    if (item.count > 0) {
        const randomX = 50 + Math.random() * 600;
        const randomY = 300 + Math.random() * 100;
        worldStore.placeItem(item, randomX, randomY);

        lastAction.value = `Placed ${item.name}!`;
        setTimeout(() => lastAction.value = '', 2000);
    }
}
</script>
