<template>
  <div>
    <h2 class="text-3xl">Upload a data file</h2>
    <p><input type="file" @change="handleCsv" /></p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { parse } from 'csv-parse/browser/esm/sync';

export default defineComponent({
  setup(props, { emit }) {
    const handleCsv = (event) => {
      if (event.target.files[0]) {
        const reader = new FileReader();

        reader.onload = (e) => {
          const parsed = parse(e.target.result.toString(), {
            columns: true,
            skip_empty_lines: true
          });

          emit('csvUploaded', parsed);

        };

        reader.readAsText(event.target.files[0]);
      }
    };

    return { handleCsv };
  }
});
</script>