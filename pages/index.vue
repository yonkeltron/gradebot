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
import { defineComponent } from 'vue';
import { useClassDataStore } from '~/stores/class_data_store';

import { assembleClassData, ClassLabRecords } from '~~/lib/class_data';
import { labRecordFromRow, RawRow } from '~~/lib/lab_record';

export default defineComponent({
  setup() {
    const classDataStore = useClassDataStore();
    const csvRows = ref<RawRow[]>([]);
    const setCsvRows = (rows: RawRow[]) => {
      csvRows.value = rows;
      classDataStore.classData = assembleClassData(rows.map(labRecordFromRow));
    };

    const labRecords = computed(() => csvRows.value.map(labRecordFromRow));

    const studentData = computed(() => classDataStore.classData);

    return { labRecords, studentData, setCsvRows };
  },
});
</script>
