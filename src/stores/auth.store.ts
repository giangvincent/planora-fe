import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useStorage } from '@vueuse/core';
import { authApi } from '@/services/api/auth.api';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<any>(null);
  const loading = ref(true);

  const isAuthenticated = computed(() => !!user.value);

  // Initialize auth state listener
  authApi.onAuthStateChanged((currentUser) => {
    user.value = currentUser;
    loading.value = false;
    if (currentUser) {
      useStorage('planora_token', currentUser.uid); // Persist UID as token for now
    } else {
      localStorage.removeItem('planora_token');
    }
  });

  async function login(credentials: any) {
    try {
      await authApi.login(credentials);
      // User state is updated via onAuthStateChanged
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  async function register(data: any) {
    try {
      await authApi.register(data);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }

  async function logout() {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  return {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
  };
});
