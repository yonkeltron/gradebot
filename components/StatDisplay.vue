<template>
  <div class="stats shadow">

    <div class="stat">
      <div class="stat-title">{{ column }} {{ name }}</div>
      <div class="stat-value">{{ calculated }}</div>
      <div class="stat-desc">n = {{ labRecords.length }}</div>
    </div>

  </div>
</template>

<script lang="ts">
import * as ss from 'simple-statistics'
import { match, P } from 'ts-pattern';
import { defineComponent, PropType } from "vue";
import { LabRecord } from '~~/lib/lab_record';

type Stat = 'mean' | 'sd' | 'var';

export default defineComponent({
  props: {
    labRecords: { type: Array as PropType<LabRecord[]>, required: true },
    column: { type: String, required: true },
    stat: { type: String as PropType<Stat>, required: true },
  },
  setup(props) {
    const extracted = props
      .labRecords
      .map((labRecord) => labRecord[props.column])
      .map(parseFloat);

    let name = '';

    const calculated = match(props.stat)
      .with('mean', () => {
        name = 'Mean';
        return ss.mean(extracted);
      })
      .with('sd', () => {
        name = 'StdDev';
        return ss.standardDeviation(extracted);
      })
      .with('var', () => {
        name = 'Variance'
        return ss.variance(extracted);
      })
      .exhaustive()
      .toFixed(3);

    return { calculated, extracted, name };
  }
});
</script>
