import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useStorage } from '@vueuse/core';

export const useAuthStore = defineStore('auth', () => {
  const token = useStorage<string | null>('planora_token', null);
  const user = useStorage<any>('planora_user', null); // Replace 'any' with User type later

  const isAuthenticated = computed(() => !!token.value);

  function setToken(newToken: string | null) {
    token.value = newToken;
  }

  function setUser(newUser: any) {
    user.value = newUser;
  }

  function login(newToken: string, newUser: any) {
    setToken(newToken);
    setUser(newUser);
  }

  function logout() {
    setToken(null);
    setUser(null);
  }

  return {
    token,
    user,
    isAuthenticated,
    login,
    logout,
  };
});
