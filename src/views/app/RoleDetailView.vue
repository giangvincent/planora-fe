<template>
  <div class="h-[calc(100vh-80px)] flex flex-col md:flex-row gap-6 overflow-hidden">
    <!-- Left: Timeline (Sticky/Scrollable) -->
    <aside class="w-full md:w-64 flex-shrink-0 flex flex-col bg-white border-2 border-pixel-border h-full">
        <div class="bg-pixel-primary p-3 text-white border-b-2 border-pixel-border">
             <button @click="$router.push({name: 'roles'})" class="text-xs uppercase hover:underline mb-1">&lt; Back to Library</button>
             <h2 class="font-pixel text-sm uppercase">{{ role?.title || 'Loading...' }}</h2>
             <div class="mt-2 w-full bg-blue-800 h-2 rounded-full overflow-hidden">
                 <div class="bg-yellow-400 h-full" :style="{ width: `${role?.progress || 0}%` }"></div>
             </div>
        </div>
        <div class="flex-1 overflow-y-auto p-4 custom-scrollbar">
             <PhaseTimelinePixel
                v-if="role"
                :phases="role.phases"
                :active-phase-id="activePhaseId"
                @select-phase="activePhaseId = $event"
             />
        </div>
    </aside>

    <!-- Center: Content -->
    <main class="flex-1 overflow-y-auto pr-2 custom-scrollbar" v-if="activePhase">
        <!-- Header -->
        <div class="mb-6">
            <h1 class="font-pixel text-2xl uppercase text-pixel-text mb-2">{{ activePhase.title }}</h1>
            <p class="text-slate-600">{{ activePhase.description }}</p>
        </div>

        <!-- Steps -->
        <StepListPixel :steps="activePhase.steps" />

        <!-- Mock Empty State or End of Phase -->
        <div v-if="activePhase.isCompleted" class="mt-8 p-6 bg-green-50 border-2 border-pixel-success text-center">
            <h3 class="font-pixel text-green-700">Phase Complete!</h3>
            <p class="text-sm mt-2 text-green-800">You have mastered this section. Claim your reward to unlock the next phase.</p>
            <BaseButtonPixel variant="success" class="mt-4" size="sm">Claim Reward 🎁</BaseButtonPixel>
        </div>
    </main>
    <div v-else class="flex-1 flex items-center justify-center">
        <p>Select a phase to begin.</p>
    </div>

    <!-- Right: Notes / Stats (Optional, collapsible) -->
    <aside class="hidden xl:block w-72 bg-pixel-background border-l-2 border-dotted border-pixel-border p-4">
        <h3 class="font-pixel text-sm uppercase mb-4">Quest Log</h3>
        <div class="bg-white border-2 border-pixel-border p-3 min-h-[200px] font-mono text-sm shadow-pixel">
            <p class="text-slate-400 italic">No notes for this phase yet...</p>
        </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useRolesStore } from '@/stores/roles.store';
import PhaseTimelinePixel from '@/components/content/PhaseTimelinePixel.vue';
import StepListPixel from '@/components/content/StepListPixel.vue';
import BaseButtonPixel from '@/components/ui/pixel/BaseButtonPixel.vue';

const route = useRoute();
const rolesStore = useRolesStore();

const roleId = route.params.id as string;
const activePhaseId = ref<string>('');

const role = computed(() => rolesStore.currentRoleDetails);
const activePhase = computed(() => role.value?.phases.find(p => p.id === activePhaseId.value));

onMounted(() => {
    rolesStore.fetchRoleDetails(roleId);
});

watch(role, (newRole) => {
    if (newRole && newRole.phases.length > 0 && !activePhaseId.value) {
        // Default to first incomplete or first phase
        const firstActive = newRole.phases.find(p => !p.isCompleted && p.isUnlocked) || newRole.phases[0];
        activePhaseId.value = firstActive.id;
    }
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f5f9;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border: 2px solid #f1f5f9;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
}
</style>
