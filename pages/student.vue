<template>
  <div>
    <h3 class="text-3xl">{{ studentName }}</h3>
    <div class="stats shadow">
      <StatDisplay stat="mean" column="Data" :lab-records="labRecords" />
      <StatDisplay stat="sd" column="Data" :lab-records="labRecords" />
      <StatDisplay stat="var" column="Data" :lab-records="labRecords" />
    </div>
    <p>{{ labRecords }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

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
  }
});
</script>