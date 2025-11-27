<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div class="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center">Login to Planora</h1>
      <button class="w-full py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">Login</button>
      <p class="mt-4 text-center text-sm text-gray-500">
        Don't have an account? <RouterLink to="/auth/register" class="text-primary-600 hover:underline">Register</RouterLink>
      </p>
    </div>
  </div>
</template>
