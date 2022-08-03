<template>
  <form
    @submit.stop.prevent="selectStudent(selectedStudentName)"
    method="get"
    action=""
  >
    <div class="form-control">
      <div class="input-group">
        <input
          type="text"
          placeholder="Jump to student..."
          class="input input-bordered"
          list="student-names"
          v-model="selectedStudentName"
          required
        />

        <datalist id="student-names">
          <option v-for="student in students" :key="student" :value="student" />
        </datalist>

        <button type="submit" class="btn btn-accent">Go!</button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    students: Array as PropType<string[]>,
  },
  setup() {
    const selectedStudentName = ref('');
    const selectStudent = (studentName: string) => {
      selectedStudentName.value = '';
      navigateTo({
        path: '/student',
        query: {
          studentName,
        },
      });
    };

    return { selectStudent, selectedStudentName };
  },
});
</script>
