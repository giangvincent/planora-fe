<template>
  <header class="h-20 border-b-4 border-pixel-border bg-pixel-background px-6 flex items-center justify-between">
    <!-- Left: Breadcrumbs or Title -->
    <div>
        <h1 class="font-pixel text-xl uppercase text-pixel-text">
            {{ route.meta.title || route.name || 'World Map' }}
        </h1>
    </div>

    <!-- Right: Stats & User -->
    <div class="flex items-center gap-6">
        <!-- Stats -->
        <div class="hidden md:flex gap-4">
            <div class="flex items-center gap-2 bg-white px-3 py-1 border-2 border-pixel-border shadow-pixel">
                <span class="text-xl">🪙</span>
                <span class="font-pixel text-sm">{{ 1250 }}</span>
            </div>
            <div class="flex items-center gap-2 bg-white px-3 py-1 border-2 border-pixel-border shadow-pixel">
                <span class="text-xl">✨</span>
                <span class="font-pixel text-sm">{{ 450 }} XP</span>
            </div>
        </div>

        <!-- Avatar -->
        <div class="relative cursor-pointer hover:scale-105 transition-transform">
             <div class="h-10 w-10 bg-pixel-primary border-2 border-pixel-border shadow-pixel flex items-center justify-center overflow-hidden">
                <img src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Vincent" alt="Avatar" class="h-full w-full" />
             </div>
        </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>
