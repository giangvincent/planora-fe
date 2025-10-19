<template>
  <div class="grid gap-6 lg:grid-cols-2">
    <section class="card p-6">
      <h2 class="text-lg font-semibold text-slate-900 dark:text-white">
        Personal details
      </h2>
      <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Update how Planora addresses you and delivers reminders.
      </p>

      <form class="mt-6 space-y-4" @submit.prevent="handleSubmit">
        <div class="space-y-1">
          <label class="text-sm font-medium text-slate-600 dark:text-slate-300" for="name">
            Name
          </label>
          <input
            id="name"
            v-model="form.name"
            class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            placeholder="Alex Productivity"
            required
            type="text"
          />
        </div>

        <div class="space-y-1">
          <label class="text-sm font-medium text-slate-600 dark:text-slate-300" for="email">
            Email
          </label>
          <input
            id="email"
            v-model="form.email"
            class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            placeholder="alex@example.com"
            required
            type="email"
          />
        </div>

        <div class="space-y-1">
          <label class="text-sm font-medium text-slate-600 dark:text-slate-300" for="timezone">
            Time zone
          </label>
          <select
            id="timezone"
            v-model="form.timeZone"
            class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            <option
              v-for="tz in timezones"
              :key="tz"
              :value="tz"
            >
              {{ tz }}
            </option>
          </select>
        </div>

        <fieldset class="space-y-2">
          <legend class="text-sm font-medium text-slate-600 dark:text-slate-300">
            Theme
          </legend>
          <div class="flex gap-3">
            <label class="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 transition hover:border-primary-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
              <input
                v-model="form.theme"
                class="h-4 w-4 text-primary-500 focus:ring-primary-500"
                type="radio"
                value="light"
              />
              Light
            </label>
            <label class="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 transition hover:border-primary-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
              <input
                v-model="form.theme"
                class="h-4 w-4 text-primary-500 focus:ring-primary-500"
                type="radio"
                value="dark"
              />
              Dark
            </label>
            <label class="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 transition hover:border-primary-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
              <input
                v-model="form.theme"
                class="h-4 w-4 text-primary-500 focus:ring-primary-500"
                type="radio"
                value="system"
              />
              System
            </label>
          </div>
        </fieldset>

        <div class="flex justify-end gap-2">
          <button
            class="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-200 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            type="button"
            @click="resetForm"
          >
            Reset
          </button>
          <button
            class="rounded-full bg-primary-500 px-5 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            type="submit"
          >
            Save changes
          </button>
        </div>
      </form>
    </section>

    <section class="card space-y-4 p-6">
      <h2 class="text-lg font-semibold text-slate-900 dark:text-white">
        Security
      </h2>
      <p class="text-sm text-slate-500 dark:text-slate-400">
        Planora stores your session token securely in your browser. You can clear it anytime.
      </p>
      <div class="rounded-2xl bg-slate-100 p-4 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
        <p><span class="font-semibold">Session:</span> {{ settingsStore.token ? 'Active' : 'Not signed in' }}</p>
        <p class="mt-2 break-all text-xs text-slate-400">
          {{ settingsStore.token || 'No access token stored. Connect to your Laravel API to enable sync.' }}
        </p>
      </div>
      <div class="flex gap-2">
        <button
          class="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
          type="button"
          @click="handleLogout"
        >
          Clear session
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useSettingsStore } from '@/stores/settings';

const settingsStore = useSettingsStore();

const prefersDark = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
};

const form = reactive({
  name: settingsStore.profile.name,
  email: settingsStore.profile.email,
  timeZone: settingsStore.profile.timeZone,
  theme: settingsStore.profile.themePreference ?? (prefersDark() ? 'dark' : 'light')
});

const timezones = (() => {
  if (typeof Intl.supportedValuesOf === 'function') {
    return Intl.supportedValuesOf('timeZone');
  }
  return [
    'UTC',
    'America/Los_Angeles',
    'America/New_York',
    'Europe/London',
    'Europe/Paris',
    'Asia/Singapore',
    'Asia/Ho_Chi_Minh'
  ];
})();

const resetForm = () => {
  form.name = settingsStore.profile.name;
  form.email = settingsStore.profile.email;
  form.timeZone = settingsStore.profile.timeZone;
  form.theme = settingsStore.profile.themePreference ?? (prefersDark() ? 'dark' : 'light');
};

const handleSubmit = () => {
  settingsStore.updateProfile({
    name: form.name,
    email: form.email,
    timeZone: form.timeZone,
    theme: form.theme
  });
  settingsStore.setTheme(form.theme);
};

const handleLogout = () => {
  settingsStore.logout();
};
</script>
