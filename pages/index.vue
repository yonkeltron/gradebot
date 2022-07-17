<template>
  <div>
    <div v-if="labRecords.length === 0">
      <DataFileUploader @csv-uploaded="setCsvRows" />
    </div>
    <section v-else>
      <div>
        <div class="stats shadow">
          <StatDisplay stat="max" column="average" :lab-records="labRecords" />
          <StatDisplay stat="mean" column="average" :lab-records="labRecords" />
          <StatDisplay stat="min" column="average" :lab-records="labRecords" />
          <StatDisplay stat="sd" column="average" :lab-records="labRecords" />
          <StatDisplay stat="var" column="average" :lab-records="labRecords" />
        </div>
      </div>

      <div>
        <StudentsTable :student-data="studentData" />
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