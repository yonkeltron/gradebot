<template>
  <div>
    <table class="table w-full">
      <!-- head -->
      <thead>
        <tr>
          <th>Name</th>
          <th>Mean Score</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Miriam</td>
          <td>5</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

defineComponent({
  props: {
    rows: { type: Array, required: true },
  },
  setup() { }
});
</script>