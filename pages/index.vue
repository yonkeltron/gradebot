<template>
  <div>
    <div v-if="labRecords.length === 0">
      <DataFileUploader @csv-uploaded="setCsvRows" />
    </div>
    <section v-else class="grid grid-cols-2 gap-3">
      <div>
        <StudentsTable :student-data="studentData" />
      </div>

      <div>
        <div class="stats shadow">
          <StatDisplay stat="mean" column="Data" :lab-records="labRecords" />
          <StatDisplay stat="sd" column="Data" :lab-records="labRecords" />
          <StatDisplay stat="var" column="Data" :lab-records="labRecords" />
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ClassLabRecords } from "~~/lib/class_data";
import { labRecordFromRow, RawRow } from "~~/lib/lab_record";

export default defineComponent({
  setup() {
    const csvRows = ref<RawRow[]>([]);
    const setCsvRows = (rows: RawRow[]) => {
      csvRows.value = rows;
      console.log(csvRows);
    };

    const labRecords = computed(() => csvRows.value.map(labRecordFromRow));

    const studentData = computed(() => labRecords.value.reduce((obj, labRecord) => {
      const name = labRecord.Name;

      if (obj[name]) {
        obj[name].push(labRecord);
      } else {
        obj[name] = [labRecord];
      }

      return obj;
    }, {} as ClassLabRecords));




    return { labRecords, studentData, setCsvRows }
  }
});
</script>