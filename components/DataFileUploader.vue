<template>
  <div>
    <h2 class="text-3xl">Upload a data file</h2>
    <p><input type="file" @change="handleCsv" /></p>
    <p>CSV: {{ csvData }}</p>
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    const csvData = ref();
    const handleCsv = (event) => {
      if (event.target.files[0]) {
        const reader = new FileReader();

        reader.onload = (e) => (csvData.value = e.target.result);

        reader.readAsText(event.target.files[0]);

      }
    };

    return { handleCsv, csvData };
  }
});
</script>