<template>
  <div class="space-y-4">
    <div
        v-for="(step, index) in steps"
        :key="step.id"
        class="bg-white border-2 border-pixel-border p-4 transition-all"
        :class="{ 'opacity-50 grayscale': step.isLocked }"
    >
        <!-- Step Header -->
        <div class="flex justify-between items-start mb-3">
             <div class="flex gap-3">
                 <div class="bg-slate-100 h-8 w-8 place-items-center grid border-2 border-pixel-border font-bold">
                     {{ index + 1 }}
                 </div>
                 <div>
                     <h4 class="font-pixel text-sm uppercase">{{ step.title }}</h4>
                     <p class="text-xs text-slate-500">{{ step.description }}</p>
                 </div>
             </div>
             <div>
                 <BaseTagPixel v-if="step.isCompleted" variant="success">Done</BaseTagPixel>
             </div>
        </div>

        <!-- Checkbox / Tasks -->
        <div v-if="!step.isLocked" class="pl-11 space-y-2">
            <div
                v-for="task in step.tasks"
                :key="task.id"
                class="flex items-center gap-3 p-2 hover:bg-slate-50 rounded cursor-pointer group"
                @click="toggleTask(task)"
            >
                <div
                    class="w-5 h-5 border-2 border-pixel-border flex items-center justify-center bg-white transition-colors"
                    :class="task.isCompleted ? 'bg-pixel-primary border-pixel-primary' : 'group-hover:border-pixel-primary'"
                >
                    <span v-if="task.isCompleted" class="text-white text-xs">✓</span>
                </div>
                <span :class="{'line-through text-slate-400': task.isCompleted}">{{ task.title }}</span>
                <span class="ml-auto text-xs text-pixel-xp font-pixel" v-if="!task.isCompleted">+{{ task.xpReward }} XP</span>
            </div>

            <!-- Mastery Check (Mock) -->
            <div class="mt-4 pt-2 border-t border-slate-100" v-if="step.tasks.every(t => t.isCompleted) && !step.isCompleted">
                 <BaseButtonPixel size="sm" variant="accent" class="w-full">
                    Verify Mastery: Quiz
                 </BaseButtonPixel>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RoleStep, GamifiedTask } from '@/types/gamification.types';
import BaseTagPixel from '@/components/ui/pixel/BaseTagPixel.vue';
import BaseButtonPixel from '@/components/ui/pixel/BaseButtonPixel.vue';

defineProps<{
    steps: RoleStep[]
}>();

const emit = defineEmits(['toggle-task']);

function toggleTask(task: GamifiedTask) {
    // In real app, emit event to store
    task.isCompleted = !task.isCompleted;
}
</script>
