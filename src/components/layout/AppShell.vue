<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
    <Navbar />
    <Sidebar />

    <main
      class="pt-16 transition-all duration-300"
      :class="{ 'pl-64': uiStore.sidebarOpen, 'pl-0': !uiStore.sidebarOpen }"
    >
      <div class="container mx-auto p-4 md:p-6 lg:p-8">
        <RouterView v-slot="{ Component }">
          <Transition name="fade" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import Navbar from './Navbar.vue';
import Sidebar from './Sidebar.vue';
import { useUIStore } from '@/stores/ui.store';

const uiStore = useUIStore();
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
