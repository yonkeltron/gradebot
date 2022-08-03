<template>
  <section>
    <LineChart :chartData="chartData" :options="options" />
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import * as ss from 'simple-statistics';
import { Chart, registerables } from 'chart.js';
import { LineChart } from 'vue-chart-3';

import { LabRecord } from '~~/lib/lab_record';

Chart.register(...registerables);

export default defineComponent({
  props: {
    labRecords: Object as PropType<LabRecord[]>,
  },
  components: { LineChart },
  setup(props) {
    const makeDataset = (
      labRecords: LabRecord[],
      column: string,
      borderColor: string
    ) => {
      const data: number[] = labRecords.map((labRecord) => labRecord[column]);

      return {
        label: column,
        data,
        fill: false,
        borderColor,
        tension: 0.1,
      };
    };

    const makeChartData = (labRecords: LabRecord[]) => {
      const labels = labRecords.map((labRecord) => labRecord.Date);

      const datasets = [
        { column: 'Basic Mechanics', borderColor: '#0000FF' },
        { column: 'Introduction and Purpose', borderColor: '#00FF00' },
        { column: 'Data', borderColor: '#FF0000' },
        { column: 'Results and Data Analysis', borderColor: '#FF00FF' },
        { column: 'Questions and Conclusions', borderColor: '#00FFFF' },
      ].map((spec) => makeDataset(labRecords, spec.column, spec.borderColor));

      return { labels, datasets };
    };

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

    return { chartData: makeChartData(props.labRecords), options };
  },
});
</script>
