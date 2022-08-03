<template>
  <div>
    <h3 class="text-3xl">{{ studentName }}</h3>
    <div class="grid grid-cols-2 gap-5">
      <div class="stats shadow">
        <StatDisplay stat="mean" column="Data" :lab-records="labRecords" />
        <StatDisplay stat="max" column="Data" :lab-records="labRecords" />
        <StatDisplay stat="min" column="Data" :lab-records="labRecords" />
        <StatDisplay stat="sd" column="Data" :lab-records="labRecords" />
        <StatDisplay stat="var" column="Data" :lab-records="labRecords" />
      </div>

      <section></section>
    </div>

    <section>
      <StudentOverviewTable :lab-records="labRecords" />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const route = useRoute();

    let labRecords;

    if (typeof route.query.labRecords === 'string') {
      labRecords = JSON.parse(route.query.labRecords);
    } else {
      labRecords = JSON.parse(route.query.labRecords[0]);
    }
    const studentName = route.query.studentName;

    return { labRecords, studentName };
  },
});
</script>
