import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useStorage } from '@vueuse/core';

export interface WorldObject {
  id: string;
  type: 'tree' | 'house' | 'lamp' | 'pet' | 'statue';
  x: number;
  y: number;
  spriteKey: string;
}

export interface WorldState {
  level: number;
  unlockedZones: string[];
  objects: WorldObject[];
  weather: 'sunny' | 'rain' | 'night';
}

export const usePixelWorldStore = defineStore('pixelWorld', () => {
  const world = useStorage<WorldState>('planora_world', {
    level: 1,
    unlockedZones: ['garden'],
    objects: [],
    weather: 'sunny',
  });

  const loaded = ref(false);

  function addObject(obj: WorldObject) {
    world.value.objects.push(obj);
  }

  function setWeather(weather: WorldState['weather']) {
    world.value.weather = weather;
  }

  function unlockZone(zoneId: string) {
    if (!world.value.unlockedZones.includes(zoneId)) {
      world.value.unlockedZones.push(zoneId);
    }
  }

  function checkRewards() {
    // Logic to update world based on inventory/level
    // For example, if user has a pet in inventory, ensure it's in the world objects
    // This is a placeholder for visual updates
  }

  return {
    world,
    loaded,
    addObject,
    setWeather,
    unlockZone,
    checkRewards,
  };
});
