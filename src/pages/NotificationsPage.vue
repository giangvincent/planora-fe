<template>
  <div class="space-y-6">
    <section class="grid gap-6 lg:grid-cols-2">
      <NotificationToggle />

      <div class="card p-6">
        <h3 class="text-lg font-semibold text-slate-900 dark:text-white">
          Choose your reminder style
        </h3>
        <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Planora stores your preferences locally and never sends spam.
        </p>
        <ul class="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
          <li class="flex items-center gap-3">
            <span class="grid h-8 w-8 place-items-center rounded-full bg-primary-100 text-primary-600">
              1
            </span>
            Morning summary with today's top 3 tasks.
          </li>
          <li class="flex items-center gap-3">
            <span class="grid h-8 w-8 place-items-center rounded-full bg-primary-100 text-primary-600">
              2
            </span>
            Optional afternoon nudge if tasks remain unchecked.
          </li>
          <li class="flex items-center gap-3">
            <span class="grid h-8 w-8 place-items-center rounded-full bg-primary-100 text-primary-600">
              3
            </span>
            Weekly reflection every Sunday at 6 PM.
          </li>
        </ul>
      </div>
    </section>

    <section class="card grid gap-6 p-6 lg:grid-cols-2">
      <div>
        <h3 class="text-lg font-semibold text-slate-900 dark:text-white">
          Sync Planora with your browser
        </h3>
        <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Allow notifications in your browser settings to receive reminders even when Planora is closed.
        </p>
      </div>
      <div class="flex items-center justify-end gap-3">
        <button
          class="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-200 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          type="button"
          @click="requestPermission"
        >
          Enable browser notifications
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import NotificationToggle from '@/components/NotificationToggle.vue';

const requestPermission = async () => {
  if (typeof window === 'undefined') return;
  if (!('Notification' in window)) {
    alert('Notifications are not supported in this browser.');
    return;
  }

  const status = await Notification.requestPermission();
  if (status === 'granted') {
    new Notification('Notifications enabled', {
      body: 'You will receive gentle reminders each day.'
    });
  }
};
</script>
