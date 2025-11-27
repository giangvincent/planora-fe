<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold">Tasks</h1>
      <button
        @click="showForm = true"
        class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-2"
      >
        <span>+</span> New Task
      </button>
    </div>

    <!-- Filters could go here -->

    <TaskList
      :tasks="taskStore.tasks"
      @delete="taskStore.removeTask"
      @edit="editTask"
    />

    <!-- Modal for Task Form -->
    <div v-if="showForm" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-xl">
        <h2 class="text-xl font-bold mb-4">{{ editingTask ? 'Edit Task' : 'New Task' }}</h2>
        <TaskForm
          :initial-data="editingTask || undefined"
          :is-edit="!!editingTask"
          @submit="handleTaskSubmit"
          @cancel="closeForm"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTaskStore, type Task } from '@/stores/task.store';
import TaskList from '@/components/tasks/TaskList.vue';
import TaskForm from '@/components/tasks/TaskForm.vue';

const taskStore = useTaskStore();
const showForm = ref(false);
const editingTask = ref<Task | null>(null);

function editTask(task: Task) {
  editingTask.value = task;
  showForm.value = true;
}

function closeForm() {
  showForm.value = false;
  editingTask.value = null;
}

async function handleTaskSubmit(data: any) {
  if (editingTask.value) {
    await taskStore.updateTask(editingTask.value.id, data);
  } else {
    await taskStore.addTask(data);
  }
  closeForm();
}
</script>
