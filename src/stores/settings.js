import { computed } from 'vue';
import { defineStore } from 'pinia';
import { useStorage, usePreferredDark } from '@vueuse/core';
import { setAuthToken } from '@/services/api';

const defaultProfile = {
  name: 'Alex Productivity',
  email: 'alex@example.com',
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  themePreference: 'system',
  notificationsEnabled: true,
  token: null
};

export const useSettingsStore = defineStore('settings', () => {
  const profile = useStorage('planora_profile', defaultProfile);
  const preferredDark = usePreferredDark();

  const themePreference = computed(() => profile.value.themePreference ?? profile.value.theme ?? 'system');
  const theme = computed(() =>
    themePreference.value === 'system' ? (preferredDark.value ? 'dark' : 'light') : themePreference.value
  );
  const notificationsEnabled = computed(() => Boolean(profile.value.notificationsEnabled));
  const token = computed(() => profile.value.token);

  const applyTheme = (mode) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    root.dataset.theme = mode;
  };

  const init = () => {
    applyTheme(theme.value);
    if (token.value) {
      setAuthToken(token.value);
    }
  };

  const updateProfile = (updates) => {
    profile.value = {
      ...profile.value,
      ...updates
    };
    if (updates.theme) {
      profile.value.themePreference = updates.theme;
      applyTheme(
        updates.theme === 'system' ? (preferredDark.value ? 'dark' : 'light') : updates.theme
      );
    }
  };

  const toggleTheme = () => {
    const next = themePreference.value === 'dark' ? 'light' : 'dark';
    profile.value.themePreference = next;
    applyTheme(next);
  };

  const setTheme = (mode) => {
    profile.value.themePreference = mode;
    const resolved =
      mode === 'system' ? (preferredDark.value ? 'dark' : 'light') : mode;
    applyTheme(resolved);
  };

  const toggleNotifications = () => {
    profile.value.notificationsEnabled = !profile.value.notificationsEnabled;
  };

  const setToken = (value) => {
    profile.value.token = value;
    setAuthToken(value);
    if (typeof window !== 'undefined') {
      if (value) {
        window.localStorage.setItem('planora_token', value);
      } else {
        window.localStorage.removeItem('planora_token');
      }
    }
  };

  const logout = () => {
    setToken(null);
  };

  init();

  return {
    profile,
    theme,
    themePreference,
    notificationsEnabled,
    token,
    updateProfile,
    toggleTheme,
    setTheme,
    toggleNotifications,
    setToken,
    logout
  };
});
