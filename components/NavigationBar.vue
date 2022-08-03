<template>
  <div class="navbar bg-neutral">
    <div class="flex-1 text-neutral-content">
      <NuxtLink to="/" class="btn btn-ghost normal-case text-xl"
        >Gradebot</NuxtLink
      >
    </div>
    <div class="flex-none gap-2">
      <StudentJumper v-if="displayJumper" :students="studentNames" />

      <div class="dropdown dropdown-end"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useClassDataStore } from '~/stores/class_data_store';

export default defineComponent({
  setup() {
    const classDataStore = useClassDataStore();

    const studentNames = computed(() => classDataStore.studentNames);

    const displayJumper = computed(() => studentNames.value.length > 0);

    return { displayJumper, studentNames };
  },
});
</script>
