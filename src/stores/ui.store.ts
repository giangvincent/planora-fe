import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUIStore = defineStore('ui', () => {
  const sidebarOpen = ref(true);
  const focusModeActive = ref(false);

  function toggleSidebar() {
    sidebarOpen.value = !sidebarOpen.value;
  }

  function setFocusMode(active: boolean) {
    focusModeActive.value = active;
  }

  return {
    sidebarOpen,
    focusModeActive,
    toggleSidebar,
    setFocusMode,
  };
});
