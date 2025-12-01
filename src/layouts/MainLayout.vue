<template>
  <div class="flex min-h-screen bg-slate-100 transition-colors duration-300 dark:bg-slate-950">
    <Sidebar
      :collapsed="isSidebarCollapsed"
      @toggle="(value) => (isSidebarCollapsed = value)"
    />
    <div class="flex flex-1 flex-col">
      <Navbar @toggle-sidebar="isSidebarCollapsed = !isSidebarCollapsed" />
      <main class="flex-1 overflow-y-auto bg-slate-100 p-6 transition-colors duration-300 dark:bg-slate-900">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import { useGamificationStore } from '@/stores/gamification.store';

const isSidebarCollapsed = ref(false);
const gamificationStore = useGamificationStore();

onMounted(() => {
  // Check daily login / streak
  gamificationStore.checkDailyStreak();
  gamificationStore.claimDailySpark();
});
</script>
