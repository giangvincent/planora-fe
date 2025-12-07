<template>
  <div ref="container" class="w-full h-full bg-sky-200 relative overflow-hidden rounded-xl cursor-crosshair">
    <!-- Canvas will be injected here -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import * as PIXI from 'pixi.js';
import { useWorldStore } from '@/stores/world.store';

const props = defineProps({
    interactive: {
        type: Boolean,
        default: false
    }
});

const container = ref<HTMLElement | null>(null);
const worldStore = useWorldStore();

let app: PIXI.Application | null = null;

onMounted(async () => {
    if (!container.value) return;

    app = new PIXI.Application();

    await app.init({
        resizeTo: container.value,
        backgroundColor: 0x87CEEB,
        antialias: false,
    });

    if (container.value) { // Re-check after async
        container.value.appendChild(app.canvas);
    }

    const worldContainer = new PIXI.Container();
    app.stage.addChild(worldContainer);

    // Ground
    renderGround(worldContainer);

    // Initial render
    renderObjects(worldContainer);

    // Watch for store changes to re-render
    // Note: In a real game loop, we wouldn't clear/redraw everything, but for Vue integration this is simple
    watch(() => worldStore.items, () => {
        worldContainer.removeChildren();
        renderGround(worldContainer);
        renderObjects(worldContainer);
    }, { deep: true });

    // Click to place logic (Mock placement for now)
    if (props.interactive) {
        app.stage.eventMode = 'static';
        app.stage.hitArea = app.screen;
        // In a full implementation, we'd handle clicks here to place items from selected inventory
    }
});

function renderGround(stage: PIXI.Container) {
    if (!app) return;
    const ground = new PIXI.Graphics();
    ground.rect(0, app.screen.height - 100, app.screen.width, 100);
    ground.fill(0x228B22);
    stage.addChild(ground);
}

function renderObjects(stage: PIXI.Container) {
    worldStore.items.forEach(obj => {
        const graphics = new PIXI.Graphics();

        // Simple pixel art placeholders
        if (obj.type === 'tree') {
            graphics.rect(obj.x + 12, obj.y + 16, 8, 16); // Trunk
            graphics.fill(0x8B4513);
            graphics.rect(obj.x, obj.y, 32, 20); // Leaves
            graphics.fill(parseInt(obj.color.replace('#', '0x')));
        } else if (obj.type === 'house') {
            graphics.rect(obj.x, obj.y + 20, 40, 30); // Base
            graphics.fill(parseInt(obj.color.replace('#', '0x')));
            graphics.moveTo(obj.x - 5, obj.y + 20); // Roof
            graphics.lineTo(obj.x + 20, obj.y - 10);
            graphics.lineTo(obj.x + 45, obj.y + 20);
            graphics.fill(0x800000);
        } else {
             graphics.rect(obj.x, obj.y, 24, 24);
             graphics.fill(parseInt(obj.color.replace('#', '0x')));
        }

        stage.addChild(graphics);
    });
}

onUnmounted(() => {
    if (app) {
        app.destroy(true, { children: true });
    }
});
</script>
