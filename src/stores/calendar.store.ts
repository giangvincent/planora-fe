import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useStorage } from '@vueuse/core';

export interface CalendarEntry {
  id: string;
  title: string;
  start: string; // ISO date string
  end: string;
  type: 'task' | 'event';
  referenceId?: number; // ID of task or goal
}

export const useCalendarStore = defineStore('calendar', () => {
  const entries = useStorage<CalendarEntry[]>('planora_calendar', []);
  const currentView = ref<'week' | 'month'>('week');
  const currentDate = ref(new Date().toISOString().slice(0, 10));

  function addEntry(entry: CalendarEntry) {
    entries.value.push(entry);
  }

  function removeEntry(id: string) {
    entries.value = entries.value.filter(e => e.id !== id);
  }

  return {
    entries,
    currentView,
    currentDate,
    addEntry,
    removeEntry,
  };
});
