<template>
  <div ref="container" class="w-full h-full bg-sky-200 relative overflow-hidden rounded-xl cursor-crosshair">
    <!-- Canvas will be injected here -->
    <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-black/50 text-white z-10">
      Loading Assets...
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import * as PIXI from 'pixi.js';
import { useWorldStore } from '@/stores/world.store';

// Import sprite sheet (Vite will handle the path)
import spritesheetPath from '@/assets/pixel/spritesheet.png';

const props = defineProps({
    interactive: {
        type: Boolean,
        default: false
    }
});

const container = ref<HTMLElement | null>(null);
const worldStore = useWorldStore();
const loading = ref(true);

let app: PIXI.Application | null = null;
let baseTexture: PIXI.Texture | null = null;

// Texture Cache for sliced sprites
const textures: Record<string, PIXI.Texture> = {};

onMounted(async () => {
    if (!container.value) return;

    app = new PIXI.Application();

    await app.init({
        resizeTo: container.value,
        backgroundColor: 0x87CEEB,
        antialias: false, // Keep pixel art sharp
    });

    if (container.value) {
        container.value.appendChild(app.canvas);
    }

    // Load Assets
    try {
        baseTexture = await PIXI.Assets.load(spritesheetPath);
        if (baseTexture) {
           baseTexture.source.scaleMode = 'nearest'; // Ensure pixel art scaling
           prepareTextures(baseTexture);
        }
    } catch (e) {
        console.error("Failed to load spritesheet", e);
    }
    loading.value = false;

    const worldContainer = new PIXI.Container();
    app.stage.addChild(worldContainer);

    // Initial render
    renderWorld(worldContainer);

    // Watch for store changes
    watch(() => worldStore.items, () => {
        // Simple re-render strategy
        worldContainer.removeChildren();
        renderWorld(worldContainer);
    }, { deep: true });
});

function prepareTextures(base: PIXI.Texture) {
    // Slice the spritesheet into usable textures
    // Assuming 32x32 grid for tiles, but bigger for objects if needed
    // Adjust these coordinates based on the actual generated image layout!

    // Example mapping based on common sprite sheet layouts:
    // Row 0: Terrain (Grass, Water, Paths)
    textures['grass'] = new PIXI.Texture({ source: base.source, frame: new PIXI.Rectangle(0, 0, 32, 32) });
    textures['water'] = new PIXI.Texture({ source: base.source, frame: new PIXI.Rectangle(32, 0, 32, 32) });
    textures['path'] = new PIXI.Texture({ source: base.source, frame: new PIXI.Rectangle(64, 0, 32, 32) });

    // Row 1+: Objects
    // Tree (maybe bigger? 32x64 or 48x48? assuming 64x64 area for big tree)
    // Actually using a flexible approach:

    textures['tree'] = new PIXI.Texture({ source: base.source, frame: new PIXI.Rectangle(0, 32, 64, 64) });
    textures['house'] = new PIXI.Texture({ source: base.source, frame: new PIXI.Rectangle(64, 32, 64, 64) });
    textures['rock'] = new PIXI.Texture({ source: base.source, frame: new PIXI.Rectangle(128, 32, 32, 32) });
    textures['flower'] = new PIXI.Texture({ source: base.source, frame: new PIXI.Rectangle(160, 32, 32, 32) });
    textures['statue'] = new PIXI.Texture({ source: base.source, frame: new PIXI.Rectangle(192, 32, 32, 64) });

    // Fallback texture
    textures['fallback'] = PIXI.Texture.WHITE;
}

function renderWorld(stage: PIXI.Container) {
    if (!app) return;

    // Background / Ground Layer
    // Tiling sprite for grass
    if (textures['grass']) {
        const ground = new PIXI.TilingSprite({
            texture: textures['grass'],
            width: app.screen.width,
            height: app.screen.height
        });
        stage.addChild(ground);
    } else {
        // Fallback color
        const ground = new PIXI.Graphics();
        ground.rect(0, 0, app.screen.width, app.screen.height);
        ground.fill(0x228B22);
        stage.addChild(ground);
    }

    // Objects Layer
    worldStore.items.forEach(obj => {
        let sprite: PIXI.Sprite;

        if (textures[obj.type]) {
            sprite = new PIXI.Sprite(textures[obj.type]);
        } else {
            // Fallback for unknown types
            sprite = new PIXI.Sprite(textures['fallback']);
            sprite.tint = 0xFF0000; // Tint red to show error
            sprite.width = 32;
            sprite.height = 32;
        }

        sprite.x = obj.x;
        sprite.y = obj.y;

        // Center anchor for better positioning? Or bottom-center for objects?
        // Let's stick to top-left (0,0) as per previous rect implementation to match coordinate system,
        // or bottom-center if we adjust coordinates. Keeping simple for now.

        stage.addChild(sprite);
    });
}

onUnmounted(() => {
    if (app) {
        app.destroy(true, { children: true });
    }
});
</script>
