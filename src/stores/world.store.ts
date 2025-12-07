import { defineStore } from 'pinia';
import { ref } from 'vue';
import { worldApi } from '@/services/api/world.api';

export interface WorldObject {
    id: string;
    type: 'tree' | 'house' | 'rock' | 'flower' | 'statue';
    x: number;
    y: number;
    color: string;
}

export interface InventoryItem {
    id: string;
    type: 'tree' | 'house' | 'rock' | 'flower' | 'statue';
    name: string;
    count: number;
    color: string;
}

export const useWorldStore = defineStore('world', () => {
    // Current objects placed in the world
    const items = ref<WorldObject[]>([
        { id: '1', type: 'house', x: 200, y: 300, color: '#A52A2A' },
        { id: '2', type: 'tree', x: 100, y: 350, color: '#228B22' },
        { id: '3', type: 'tree', x: 150, y: 380, color: '#228B22' }
    ]);

    // Items available to be placed
    const inventory = ref<InventoryItem[]>([
        { id: 'i1', type: 'tree', name: 'Oak Sapling', count: 2, color: '#228B22' },
        { id: 'i2', type: 'flower', name: 'Pixel Rose', count: 5, color: '#FF69B4' }
    ]);

    async function fetchState() {
        try {
            const response = await worldApi.getState();
            // Assuming response returns { items, inventory }
            if (response.data) {
                items.value = response.data.items;
                inventory.value = response.data.inventory;
            }
        } catch (err) {
            console.warn('World API fetch failed, using local mock data', err);
        }
    }

    async function placeItem(item: InventoryItem, x: number, y: number) {
        if (item.count > 0) {
            // Optimistic update
            const newObj: WorldObject = {
                id: Date.now().toString(),
                type: item.type,
                x,
                y,
                color: item.color
            };

            items.value.push(newObj);
            item.count--;

            try {
                await worldApi.placeItem({ itemId: item.id, x, y });
            } catch (err) {
                console.warn('World API place failed', err);
                // In strict mode, we might revert the change here.
            }
        }
    }

    function addItemToInventory(type: InventoryItem['type'], name: string, color: string) {
        const existing = inventory.value.find(i => i.type === type && i.color === color);
        if (existing) {
            existing.count++;
        } else {
            inventory.value.push({
                id: Date.now().toString(),
                type,
                name,
                count: 1,
                color
            });
        }
    }

    return {
        items,
        inventory,
        fetchState,
        placeItem,
        addItemToInventory
    };
});
