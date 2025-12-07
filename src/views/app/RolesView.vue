<template>
  <div class="container mx-auto max-w-5xl">
    <div class="flex justify-between items-center mb-8">
        <h1 class="font-pixel text-2xl uppercase text-pixel-text">Roles Library</h1>
        <BaseButtonPixel variant="primary" @click="$router.push({ name: 'role-create' })">
            <template #icon-left>
                <span>+</span>
            </template>
            New Role
        </BaseButtonPixel>
    </div>

    <!-- Active Roles Section -->
    <section class="mb-12">
        <h2 class="font-pixel text-lg mb-4 text-pixel-text/70 uppercase">Active Quests</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BaseCardPixel
                v-for="role in rolesStore.roles.filter(r => r.isActive)"
                :key="role.id"
                :title="role.title"
                hoverable
                @click="openRole(role.id)"
                class="border-pixel-accent"
            >
                <div class="flex gap-4">
                    <div class="text-4xl bg-slate-100 p-2 border-2 border-pixel-border rounded pixel-shadow h-16 w-16 place-items-center grid">
                        {{ role.icon }}
                    </div>
                    <div class="flex-1">
                        <p class="text-sm mb-3 text-slate-600">{{ role.description }}</p>
                        <BaseProgressPixel :current="role.progress" :max="100" label="Mastery" show-value variant="xp" />
                    </div>
                </div>
                <template #footer>
                    <div class="flex justify-between items-center">
                        <BaseTagPixel variant="accent">Active</BaseTagPixel>
                        <span class="text-xs font-bold text-slate-500">{{ role.completedPhases }} / {{ role.totalPhases }} Phases</span>
                    </div>
                </template>
            </BaseCardPixel>
        </div>
    </section>

    <!-- Available Roles Section -->
    <section>
        <h2 class="font-pixel text-lg mb-4 text-pixel-text/70 uppercase">Available Roles</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BaseCardPixel
                v-for="role in rolesStore.roles.filter(r => !r.isActive)"
                :key="role.id"
                :title="role.title"
                hoverable
                @click="openRole(role.id)"
            >
                 <div class="flex flex-col h-full">
                    <div class="text-4xl mb-4 text-center">{{ role.icon }}</div>
                    <p class="text-sm mb-4 text-slate-600 flex-1">{{ role.description }}</p>
                    <div class="mt-auto pt-4 border-t-2 border-dotted border-pixel-border flex justify-between">
                         <BaseTagPixel variant="neutral">{{ role.level }}</BaseTagPixel>
                         <button class="text-xs font-bold text-pixel-primary hover:underline">View Details >></button>
                    </div>
                 </div>
            </BaseCardPixel>
        </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRolesStore } from '@/stores/roles.store';
import { useRouter } from 'vue-router';
import BaseCardPixel from '@/components/ui/pixel/BaseCardPixel.vue';
import BaseButtonPixel from '@/components/ui/pixel/BaseButtonPixel.vue';
import BaseProgressPixel from '@/components/ui/pixel/BaseProgressPixel.vue';
import BaseTagPixel from '@/components/ui/pixel/BaseTagPixel.vue';

const rolesStore = useRolesStore();
const router = useRouter();

function openRole(id: string) {
    router.push({ name: 'role-detail', params: { id } });
}
</script>
