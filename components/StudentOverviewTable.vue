<template>
  <div>
    <table class="table w-full">
      <thead>
        <tr>
          <th>Basic Mechanics</th>
          <th>Introduction and Purpose</th>
          <th>Data</th>
          <th>Results and Data Analysis</th>
          <th>Questions and Conclusions</th>
          <th>Mean</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="labRecord in labRecords" :key="labRecord.Date.toString()">
          <td>{{ labRecord['Basic Mechanics'] }}</td>
          <td>{{ labRecord['Introduction and Purpose'] }}</td>
          <td>{{ labRecord['Data'] }}</td>
          <td>{{ labRecord['Results and Data Analysis'] }}</td>
          <td>{{ labRecord['Questions and Conclusions'] }}</td>
          <td>{{ computeMean(labRecord) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { LabRecord, computeMean } from '~~/lib/lab_record';

export default defineComponent({
  props: {
    labRecords: Array as PropType<LabRecord[]>,
  },
  setup() {
    return { computeMean };
  },
});
</script>
