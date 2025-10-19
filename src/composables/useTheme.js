import { computed } from 'vue';
import { useSettingsStore } from '@/stores/settings';

export const useTheme = () => {
  const settingsStore = useSettingsStore();

  const theme = computed(() => settingsStore.theme);

  return {
    theme,
    toggleTheme: settingsStore.toggleTheme,
    setTheme: settingsStore.setTheme
  };
};
