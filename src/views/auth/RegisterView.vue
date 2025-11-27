<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div class="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center">Join Planora</h1>
      <button class="w-full py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">Register</button>
      <p class="mt-4 text-center text-sm text-gray-500">
        Already have an account? <RouterLink to="/auth/login" class="text-primary-600 hover:underline">Login</RouterLink>
      </p>
    </div>
  </div>
</template>
