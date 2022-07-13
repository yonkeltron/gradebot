<template>
  <div>
    <div v-if="csvRows.length === 0">
      <DataFileUploader @csv-uploaded="setCsvRows" />
    </div>
    <section v-else class="grid grid-cols-2 gap-3">
      <div>
        <StudentsTable :student-data="studentData" />
      </div>

      <div>
        <div class="stats shadow">
          <StatDisplay stat="mean" column="Data" :lab-records="csvRows" />
          <StatDisplay stat="sd" column="Data" :lab-records="csvRows" />
          <StatDisplay stat="var" column="Data" :lab-records="csvRows" />
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const csvRows = ref<Record<string, string>[]>([]);
    const setCsvRows = (rows: Record<string, string>[]) => {
      csvRows.value = rows;
      console.log(csvRows);
    };

    const studentData = computed(() => csvRows.value.reduce((obj, row) => {
      const name = row['Name'];

      if (obj[name]) {
        obj[name].push(row);
      } else {
        obj[name] = [row];
      }

      return obj;
    }, {} as Record<string, Record<string, string>[]>));




    return { csvRows, studentData, setCsvRows }
  }
});
</script>