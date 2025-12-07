<template>
  <!-- Main Container -->
  <div
    class="flex min-h-screen transition-colors duration-300"
    :class="userStore.preferences.pixelMode ? 'bg-pixel-background font-pixel selection:bg-pixel-accent selection:text-white' : 'bg-slate-100 dark:bg-slate-950'"
  >
    <!-- Pixel Layout -->
    <template v-if="userStore.preferences.pixelMode">
        <SidebarPixel
          :collapsed="isSidebarCollapsed"
          @toggle="(value) => (isSidebarCollapsed = value)"
        />
        <div class="flex flex-1 flex-col relative">
           <NavbarPixel />
           <main class="flex-1 overflow-y-auto p-6">
             <slot />
           </main>

           <!-- Floating Toggle (Temporary) -->
           <div class="fixed bottom-4 right-4 z-50">
                <button
                  @click="userStore.togglePixelMode()"
                  class="bg-white border-2 border-slate-900 shadow-pixel p-2 text-xs font-bold hover:bg-slate-200"
                >
                    Switch to Flat UI
                </button>
           </div>
        </div>
    </template>

    <!-- Flat Layout (Existing) -->
    <template v-else>
        <Sidebar
          :collapsed="isSidebarCollapsed"
          @toggle="(value) => (isSidebarCollapsed = value)"
        />
        <div class="flex flex-1 flex-col">
          <Navbar @toggle-sidebar="isSidebarCollapsed = !isSidebarCollapsed" />
          <main class="flex-1 overflow-y-auto bg-slate-100 p-6 transition-colors duration-300 dark:bg-slate-900">
            <slot />
          </main>

           <!-- Floating Toggle (Temporary) -->
           <div class="fixed bottom-4 right-4 z-50">
                <button
                  @click="userStore.togglePixelMode()"
                  class="bg-white shadow-lg rounded-full px-4 py-2 text-xs font-bold hover:bg-slate-50 transition-all border"
                >
                    Switch to Pixel UI
                </button>
           </div>
        </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import SidebarPixel from '@/components/layout/SidebarPixel.vue';
import NavbarPixel from '@/components/layout/NavbarPixel.vue';
import { useGamificationStore } from '@/stores/gamification.store';
import { useUserStore } from '@/stores/user.store';

const isSidebarCollapsed = ref(false);
const gamificationStore = useGamificationStore();
const userStore = useUserStore();

onMounted(() => {
  // Check daily login / streak
  gamificationStore.checkDailyStreak();
  gamificationStore.claimDailySpark();
});
</script>
