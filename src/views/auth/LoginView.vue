<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div class="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Login to Planora</h1>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Password</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
            placeholder="••••••••"
          />
        </div>

        <div v-if="error" class="text-red-500 text-sm text-center">{{ error }}</div>

        <button
          type="submit"
          class="w-full py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="loading"
        >
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>

      <p class="mt-4 text-center text-sm text-gray-500">
        Don't have an account? <RouterLink to="/auth/register" class="text-primary-600 hover:underline">Register</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

async function handleLogin() {
  error.value = '';
  loading.value = true;

  try {
    await authStore.login({ email: email.value, password: password.value });
    router.push('/app/dashboard');
  } catch (err: any) {
    error.value = err.message || 'Failed to login. Please check your credentials.';
  } finally {
    loading.value = false;
  }
}
</script>
