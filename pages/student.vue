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
    const studentName = computed(() => {
      let output;
      if (typeof route.query.studentName === 'string') {
        output = route.query.studentName;
      } else {
        output = route.query.studentName[0];
      }

      return output;
    });
    const classDataStore = useClassDataStore();

    const labRecords = computed(
      () => classDataStore.classData[studentName.value]
    );

    return { labRecords, studentName };
  },
});
</script>
