<template>
  <div class="card flex flex-col gap-4 p-6">
    <div class="flex items-start justify-between gap-4">
      <div>
        <h3 class="text-base font-semibold text-slate-900 dark:text-white">
          Daily notifications
        </h3>
        <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Receive a gentle reminder with your tasks at your chosen time.
        </p>
      </div>
      <label class="relative inline-flex cursor-pointer items-center">
        <input
          class="peer sr-only"
          type="checkbox"
          :checked="settingsStore.notificationsEnabled"
          @change="handleToggle"
        />
        <div class="peer h-6 w-11 rounded-full bg-slate-300 after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition peer-checked:bg-primary-500 peer-checked:after:translate-x-full dark:bg-slate-700">
        </div>
      </label>
    </div>

    <div class="flex items-center gap-3 rounded-2xl bg-primary-50/80 px-4 py-3 text-sm text-primary-700 dark:bg-primary-500/10 dark:text-primary-200">
      <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
        <path d="m9 12 2 2 4-4" stroke-linecap="round" stroke-linejoin="round" />
        <circle cx="12" cy="12" r="9" />
      </svg>
      <span>
        {{ settingsStore.notificationsEnabled ? 'Notifications enabled. You will receive reminders at 8:00 AM.' : 'Notifications are disabled. Turn them on to stay on track.' }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { useSettingsStore } from '@/stores/settings';

const settingsStore = useSettingsStore();

const handleToggle = () => {
  settingsStore.toggleNotifications();
  if (settingsStore.notificationsEnabled) {
    window.localStorage.setItem('planora_notifications', 'enabled');
  } else {
    window.localStorage.removeItem('planora_notifications');
  }
};
</script>
