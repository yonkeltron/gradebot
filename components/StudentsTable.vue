<template>
  <div>
    <table class="table w-full">
      <thead>
        <tr>
          <th>Name</th>
          <th>Mean Score</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, name) in studentData" :key="name">
          <td>
            <span @click="() => selectStudent(data, name)" class="link">
              {{ name }}
            </span>
          </td>
          <td>{{ data }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { ClassLabRecords } from "~~/lib/class_data";

export default defineComponent({
  props: {
    studentData: Object as PropType<ClassLabRecords>,
  },
  setup(props) {
    const selectStudent = (labRecords, studentName) => {
      navigateTo({
        path: '/student',
        query: {
          labRecords: JSON.stringify(labRecords),
          studentName,
        },
      });
    };

    return { selectStudent };

  }
});
</script>