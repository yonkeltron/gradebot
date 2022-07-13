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
        <tr v-for="(data, name) in studentData" :key="name">
          <td>{{ name }}</td>
          <td>{{ data }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    studentData: Object as PropType<Record<string, Record<string, string>[]>>,
  },
  setup(props) {
  }
});
</script>