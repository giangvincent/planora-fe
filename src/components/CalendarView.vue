<template>
  <div class="card p-4">
    <VueCal
      class="planora-calendar"
      :disable-views="['years']"
      :events="calendarEvents"
      :time="false"
      default-view="month"
      hide-weekends="false"
      small
      @cell-click="handleCellClick"
      @event-click="handleEventClick"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import VueCal from 'vue-cal';
import 'vue-cal/dist/vuecal.css';

const props = defineProps({
  tasks: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['date-select', 'event-select']);

const toDateOnlyString = (value) => {
  if (!value) return new Date().toISOString().slice(0, 10);
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return new Date().toISOString().slice(0, 10);
  return date.toISOString().slice(0, 10);
};

const calendarEvents = computed(() =>
  props.tasks.map((task) => ({
    start: `${task.dueDate} 08:00`,
    end: `${task.dueDate} 09:00`,
    title: task.title,
    content: task.description,
    class: task.completed ? 'event-completed' : 'event-active',
    task
  }))
);

const handleCellClick = (payload) => {
  const date = payload?.date ?? payload?.startDate ?? payload;
  emit('date-select', toDateOnlyString(date));
};

const handleEventClick = (event) => {
  emit('event-select', event?.task ?? event);
};
</script>

<style scoped>
.planora-calendar :deep(.vuecal__header) {
  @apply border-none text-slate-900 dark:text-white;
}

.planora-calendar :deep(.vuecal__menu) {
  @apply rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300;
}

.planora-calendar :deep(.vuecal__cell) {
  @apply border-none text-sm text-slate-600 dark:text-slate-300;
}

.planora-calendar :deep(.vuecal__cell--today) {
  @apply bg-primary-50/70 text-primary-700 dark:bg-primary-500/10 dark:text-primary-200;
}

.planora-calendar :deep(.vuecal__event.event-active) {
  @apply rounded-xl border-none bg-primary-500 text-xs font-semibold text-white;
}

.planora-calendar :deep(.vuecal__event.event-completed) {
  @apply rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-500 line-through dark:border-slate-700 dark:bg-slate-900;
}
</style>
