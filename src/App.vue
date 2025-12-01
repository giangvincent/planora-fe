<template>
  <RouterView />
  <RewardsModal
    v-if="gamificationStore.currentReward"
    :show="!!gamificationStore.currentReward"
    :title="gamificationStore.currentReward.title"
    :message="gamificationStore.currentReward.message"
    :icon="gamificationStore.currentReward.icon"
    @close="gamificationStore.clearReward()"
  />
</template>

<script setup lang="ts">
import { useGamificationStore } from '@/stores/gamification.store';
import RewardsModal from '@/components/gamification/RewardsModal.vue';

const gamificationStore = useGamificationStore();
</script>
