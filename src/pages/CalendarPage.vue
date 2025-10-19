<template>
  <div class="grid gap-6 lg:grid-cols-3">
    <div class="lg:col-span-2 space-y-4">
      <CalendarView
        :tasks="tasksStore.tasks"
        @date-select="handleDateSelect"
        @event-select="handleEventSelect"
      />
      <div class="card p-6">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-slate-900 dark:text-white">
            Tasks on {{ formattedSelectedDate }}
          </h3>
          <button
            class="rounded-full bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            type="button"
            @click="openTaskModal"
          >
            Add task
          </button>
        </div>
        <TaskList
          class="mt-4"
          :tasks="tasksForSelectedDate"
          @edit="handleEditTask"
          @remove="handleDeleteTask"
          @toggle="handleToggleTask"
        />
      </div>
    </div>

    <div class="space-y-4">
      <div class="card p-6">
        <h3 class="text-lg font-semibold text-slate-900 dark:text-white">
          Upcoming tasks
        </h3>
        <TaskList
          class="mt-4"
          :tasks="tasksStore.upcomingTasks"
          @edit="handleEditTask"
          @remove="handleDeleteTask"
          @toggle="handleToggleTask"
        />
      </div>
    </div>

    <AddTaskModal
      :default-date="selectedDate"
      :goals="goalsStore.goals"
      :open="showTaskModal"
      :task="editingTask"
      @close="closeTaskModal"
      @save="handleSaveTask"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import CalendarView from '@/components/CalendarView.vue';
import TaskList from '@/components/TaskList.vue';
import AddTaskModal from '@/components/AddTaskModal.vue';
import { useTasksStore } from '@/stores/tasks';
import { useGoalsStore } from '@/stores/goals';

const tasksStore = useTasksStore();
const goalsStore = useGoalsStore();

const selectedDate = ref(new Date().toISOString().slice(0, 10));
const showTaskModal = ref(false);
const editingTask = ref(null);

const formattedSelectedDate = computed(() => {
  try {
    return new Intl.DateTimeFormat(undefined, {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    }).format(new Date(selectedDate.value));
  } catch (error) {
    return selectedDate.value;
  }
});

const tasksForSelectedDate = computed(() =>
  tasksStore.tasks.filter((task) => task.dueDate === selectedDate.value)
);

const handleDateSelect = (date) => {
  selectedDate.value = date;
  showTaskModal.value = true;
  editingTask.value = null;
};

const handleEventSelect = (task) => {
  editingTask.value = task;
  selectedDate.value = task.dueDate;
  showTaskModal.value = true;
};

const openTaskModal = () => {
  editingTask.value = null;
  showTaskModal.value = true;
};

const closeTaskModal = () => {
  showTaskModal.value = false;
  editingTask.value = null;
};

const handleSaveTask = async (task) => {
  if (task.id) {
    await tasksStore.updateTask(task.id, task);
  } else {
    await tasksStore.addTask({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      goalId: task.goalId,
      completed: task.completed
    });
  }
};

const handleToggleTask = async (task) => {
  await tasksStore.toggleTaskCompletion(task.id);
};

const handleDeleteTask = async (task) => {
  await tasksStore.removeTask(task.id);
};

const handleEditTask = (task) => {
  editingTask.value = task;
  selectedDate.value = task.dueDate;
  showTaskModal.value = true;
};
</script>
