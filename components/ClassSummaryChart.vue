<template>
  <section>
    <LineChart :chartData="chartData" :options="options" />
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { Chart, registerables } from 'chart.js';
import { LineChart } from 'vue-chart-3';

import { LabRecord } from '~/lib/lab_record';
import { assembleLabSummaries, makeChartData } from '~~/lib/lab_summary';

Chart.register(...registerables);

export default defineComponent({
  props: { classLabRecords: Array as PropType<LabRecord[]> },
  components: { LineChart },
  setup(props) {
    const chartData = computed(() => {
      const labSummaries = assembleLabSummaries(props.classLabRecords);

      return makeChartData(labSummaries);
    });

    const options = {
      scales: {
        y: {
          min: 1,
          max: 5,
          ticks: {
            stepSize: 1,
          },
        },
      },
    };

    return { chartData, options };
  },
});
</script>
