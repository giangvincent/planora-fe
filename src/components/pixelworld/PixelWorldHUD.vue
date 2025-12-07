<template>
  <div class="pointer-events-none absolute inset-0 p-4 flex flex-col justify-between">
    <!-- Top Right Controls -->
    <div class="pointer-events-auto flex flex-col gap-2 self-end">
      <BaseButtonPixel size="sm" class="w-12 h-12 !p-0 grid place-items-center" @click="$emit('toggle-inventory')">
         🎒
      </BaseButtonPixel>
      <BaseButtonPixel size="sm" class="w-12 h-12 !p-0 grid place-items-center">
         🏪
      </BaseButtonPixel>
    </div>

    <!-- Bottom Left Status -->
    <div class="pointer-events-auto">
        <BaseCardPixel class="min-w-[200px] !p-2 !bg-white/90 backdrop-blur-sm">
            <h4 class="font-pixel text-xs uppercase mb-1">Current Zone</h4>
            <div class="flex items-center gap-2">
                <span class="text-xl">🌲</span>
                <span class="text-sm font-bold">Forest Home</span>
            </div>
        </BaseCardPixel>
    </div>

    <!-- Inventory Drawer (Overlay) -->
    <div v-if="showInventory" class="pointer-events-auto absolute bottom-20 left-1/2 -translate-x-1/2 w-full max-w-md">
        <BaseCardPixel title="Backpack" class="shadow-2xl">
            <div class="grid grid-cols-4 gap-2">
                <div
                    v-for="item in inventory"
                    :key="item.id"
                    class="border-2 border-pixel-border bg-slate-100 p-2 flex flex-col items-center cursor-pointer hover:bg-white hover:border-pixel-primary transition-colors relative"
                    @click="$emit('select-item', item)"
                >
                    <span class="text-2xl mb-1">{{ getItemIcon(item.type) }}</span>
                    <span class="text-[10px] font-pixel text-center leading-tight">{{ item.name }}</span>
                    <span class="absolute top-0 right-0 bg-pixel-primary text-white text-[10px] px-1 font-bold">{{ item.count }}</span>
                </div>
            </div>
        </BaseCardPixel>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButtonPixel from '@/components/ui/pixel/BaseButtonPixel.vue';
import BaseCardPixel from '@/components/ui/pixel/BaseCardPixel.vue';
import type { InventoryItem } from '@/stores/world.store';

defineProps<{
    showInventory: boolean,
    inventory: InventoryItem[]
}>();

defineEmits(['toggle-inventory', 'select-item']);

function getItemIcon(type: string) {
    switch (type) {
        case 'tree': return '🌳';
        case 'flower': return '🌹';
        case 'house': return '🏠';
        case 'rock': return '🪨';
        default: return '📦';
    }
}
</script>
