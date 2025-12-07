<template>
  <div class="flex flex-col gap-0 relative">
    <!-- Vertical Line -->
    <div class="absolute left-4 top-4 bottom-4 w-1 bg-slate-200 -z-10"></div>

    <div
        v-for="(phase, index) in phases"
        :key="phase.id"
        class="flex gap-4 items-start mb-6 cursor-pointer group"
        @click="$emit('select-phase', phase.id)"
    >
        <!-- Connector / Status -->
        <div
            class="w-10 h-10 shrink-0 border-4 transition-colors flex items-center justify-center bg-white z-0"
            :class="[
                getPhaseClasses(phase).box,
                activePhaseId === phase.id ? 'scale-110' : ''
            ]"
        >
            <span v-if="phase.isCompleted" class="text-green-600 font-bold">✓</span>
            <span v-else-if="phase.isUnlocked" class="text-pixel-text font-pixel text-xs">{{ index + 1 }}</span>
            <span v-else class="text-slate-300">🔒</span>
        </div>

        <!-- Content -->
        <div class="pt-1 transition-opacity" :class="activePhaseId === phase.id ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'">
            <h4 class="font-pixel text-sm uppercase" :class="activePhaseId === phase.id ? 'text-pixel-primary' : 'text-pixel-text'">{{ phase.title }}</h4>
            <span class="text-xs text-slate-500 font-medium">{{ phase.description }}</span>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RolePhase } from '@/types/gamification.types';
import { computed } from 'vue';

const props = defineProps<{
    phases: RolePhase[],
    activePhaseId: string
}>();

defineEmits(['select-phase']);

function getPhaseClasses(phase: RolePhase) {
    if (phase.isCompleted) {
        return { box: 'border-pixel-success shadow-none' };
    } else if (phase.id === props.activePhaseId) {
        return { box: 'border-pixel-primary bg-blue-50 shadow-pixel' };
    } else if (phase.isUnlocked) {
        return { box: 'border-slate-400 hover:border-pixel-primary' };
    } else {
        return { box: 'border-slate-200 bg-slate-100 text-slate-300' };
    }
}
</script>
