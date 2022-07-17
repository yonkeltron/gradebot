<template>
  <div>
    <table class="table w-full">
      <thead>
        <tr>
          <th>Name</th>
          <th>Sample Count</th>
          <td>Overall Mean</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(data, name) in studentData" :key="name">
          <td>
            <span @click="() => selectStudent(data, name)" class="link">
              {{ name }}
            </span>
          </td>
          <td>{{ data.length }} records</td>
          <td>{{ meanForData(data) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import * as ss from 'simple-statistics'

import { ClassLabRecords } from "~~/lib/class_data";
import { LabRecord } from "~~/lib/lab_record";

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

    const meanForData = (labRecords: LabRecord[]) => {
      const averages = labRecords.map(labRecord => labRecord['average']);

      return ss.mean(averages).toFixed(2);
    }

    return { meanForData, selectStudent };

  }
});
</script>