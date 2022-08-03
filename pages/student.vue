<template>
  <div>
    <h3 class="text-3xl">{{ studentName }}</h3>

    <div class="my-5">
      <StudentOverviewChart :lab-records="labRecords" />
    </div>

    <section class="my-5">
      <StudentOverviewTable :lab-records="labRecords" />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useClassDataStore } from '~/stores/class_data_store';

import { LabRecord } from '~/lib/lab_record';

export default defineComponent({
  setup() {
    const route = useRoute();
    let studentName;

    if (typeof route.query.studentName === 'string') {
      studentName = route.query.studentName;
    } else {
      studentName = route.query.studentName[0];
    }

    const classDataStore = useClassDataStore();

    const labRecords = classDataStore.classData[studentName] as LabRecord[];

    return { labRecords, studentName };
  },
});
</script>
