<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label class="block text-sm font-medium mb-1">Title</label>
      <input
        v-model="form.title"
        type="text"
        required
        class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none"
        placeholder="What needs to be done?"
      />
    </div>

    <div>
      <label class="block text-sm font-medium mb-1">Description</label>
      <textarea
        v-model="form.description"
        rows="3"
        class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none"
        placeholder="Add details..."
      ></textarea>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium mb-1">Due Date</label>
        <input
          v-model="form.dueDate"
          type="date"
          required
          class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none"
        />
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">Priority</label>
        <select
          v-model="form.priority"
          class="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-500 outline-none"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
    </div>

    <div class="flex justify-end gap-3 pt-2">
      <button
        type="button"
        @click="$emit('cancel')"
        class="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
      >
        Cancel
      </button>
      <button
        type="submit"
        class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
      >
        {{ isEdit ? 'Update Task' : 'Create Task' }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Task } from '@/stores/task.store';

const props = defineProps<{
  initialData?: Partial<Task>;
  isEdit?: boolean;
}>();

const emit = defineEmits(['submit', 'cancel']);

const form = ref({
  title: '',
  description: '',
  dueDate: new Date().toISOString().slice(0, 10),
  priority: 'medium' as 'low' | 'medium' | 'high',
});

onMounted(() => {
  if (props.initialData) {
    form.value = { ...form.value, ...props.initialData };
  }
});

function handleSubmit() {
  emit('submit', form.value);
}
</script>
