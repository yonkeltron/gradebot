<template>
  <div>
    <DataFileUploader @csv-uploaded="setCsvRows" />
    <StudentsTable :student-data="studentData" />
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




    return { studentData, setCsvRows }
  }
});
</script>