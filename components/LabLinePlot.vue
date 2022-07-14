<template>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    labRecords: { type: Array as PropType<Record<string, string>[]>, required: true },
  },
  setup() { }
});
</script>