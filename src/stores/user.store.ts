import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useStorage, usePreferredDark } from '@vueuse/core';

export const useUserStore = defineStore('user', () => {
  const preferences = useStorage('planora_preferences', {
    theme: 'system', // 'light', 'dark', 'system'
    pixelMode: true, // Default to true for the transition
    notifications: true,
    sound: true,
    showPixelWorld: true,
    name: 'Vincent', // Default name
    email: 'vincent@example.com', // Default email
  });

  const preferredDark = usePreferredDark();

  const isDark = computed(() => {
    if (preferences.value.theme === 'system') {
      return preferredDark.value;
    }
    return preferences.value.theme === 'dark';
  });

  function toggleTheme() {
    preferences.value.theme = isDark.value ? 'light' : 'dark';
    applyTheme();
  }

  function setTheme(theme: 'light' | 'dark' | 'system') {
    preferences.value.theme = theme;
    applyTheme();
  }

  function togglePixelMode() {
    preferences.value.pixelMode = !preferences.value.pixelMode;
  }

  function applyTheme() {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (isDark.value) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }

  // Initialize theme
  applyTheme();

  return {
    preferences,
    isDark,
    toggleTheme,
    setTheme,
    togglePixelMode,
  };
});
