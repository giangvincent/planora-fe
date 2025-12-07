<template>
  <aside
    class="z-20 flex h-screen flex-col border-r-4 border-pixel-border bg-pixel-background transition-all duration-300"
    :class="collapsed ? 'w-24' : 'w-72'"
  >
    <!-- Logo Area -->
    <div class="flex items-center gap-3 px-6 py-6 border-b-4 border-pixel-border bg-pixel-primary text-white">
      <div class="grid h-10 w-10 place-items-center bg-white text-pixel-primary border-2 border-pixel-border shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]">
        <span class="text-xl">👾</span>
      </div>
      <span v-if="!collapsed" class="font-pixel text-lg uppercase tracking-wider shadow-black drop-shadow-md">
        Planora
      </span>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 space-y-4 px-4 py-6 overflow-y-auto">
      <RouterLink
        v-for="item in navigation"
        :key="item.name"
        :to="item.to"
        class="group flex items-center gap-3 px-4 py-3 font-pixel text-xs uppercase transition-all border-2 border-transparent hover:border-pixel-border hover:shadow-pixel hover:bg-white"
        :class="isActive(item.to)
          ? 'bg-pixel-accent text-white border-pixel-border shadow-pixel'
          : 'text-pixel-text hover:text-pixel-primary'"
      >
        <!-- Icon Placeholder or Pixel Icon -->
        <span class="text-lg">{{ item.iconChar }}</span>
        <span v-if="!collapsed">{{ item.label }}</span>
      </RouterLink>
    </nav>

    <!-- Footer / Toggle -->
    <div class="p-4 border-t-4 border-pixel-border bg-slate-200">
        <button @click="$emit('toggle', !collapsed)" class="w-full pixel-btn text-xs">
            {{ collapsed ? '>>' : '<< Collapse' }}
        </button>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

defineProps({
  collapsed: {
    type: Boolean,
    default: false
  }
});

defineEmits(['toggle']);

const route = useRoute();

const navigation = computed(() => [
  { name: 'dashboard', label: 'Dashboard', to: { name: 'dashboard' }, iconChar: '🏰' },
  { name: 'calendar', label: 'Calendar', to: { name: 'calendar' }, iconChar: '📅' },
  { name: 'roles', label: 'Quests', to: { name: 'roles' }, iconChar: '📜' },
  { name: 'notifications', label: 'Updates', to: { name: 'notifications' }, iconChar: '🔔' },
  { name: 'profile', label: 'Hero', to: { name: 'profile' }, iconChar: '👤' }
]);

const isActive = (to) => route.name === to.name;
</script>
