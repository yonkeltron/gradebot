<template>
  <div>
    <DataFileUploader @csv-uploaded="setCsvRows" />

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const csvRows = ref([]);
    const setCsvRows = (rows: Record<string, string>[]) => {
      csvRows.value = rows;
    };

    const log = console.log;

    return { csvRows, log, setCsvRows }
  }
});
</script>