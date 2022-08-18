import * as ss from 'simple-statistics';

import { LabRecord } from './lab_record';

export interface LabSummary {
  'Basic Mechanics': number;
  'Introduction and Purpose': number;
  'Lab Name': number;
  'Questions and Conclusions': number;
  'Results and Data Analysis': number;
  Data: number;
  Date: string;
}

export const assembleLabSummaries = (labRecords: LabRecord[]): LabSummary[] => {
  const labRecordsByDate = labRecords.reduce((obj, labRecord) => {
    const date = labRecord.Date.toLocaleDateString();

    if (obj[date]) {
      obj[date].push(labRecord);
    } else {
      obj[date] = [labRecord];
    }

    return obj;
  }, {});

  const labSummaries = Object.entries(labRecordsByDate).map(
    ([date, labRecords]: [string, LabRecord[]]) => {
      const meanMap: LabSummary = [
        'Basic Mechanics',
        'Introduction and Purpose',
        'Lab Name',
        'Questions and Conclusions',
        'Results and Data Analysis',
        'Data',
      ]
        .map((column) => {
          const values = labRecords.map((labRecord) => labRecord[column]);

          return { [column]: ss.mean(values) };
        })
        .reduce(Object.assign, {} as LabSummary);

      meanMap.Date = date;

      return meanMap;
    }
  );

  return labSummaries;
};

const makeDataset = (
  labSummaries: LabSummary[],
  column: string,
  borderColor: string
) => {
  const data: number[] = labSummaries.map((labSummary) => labSummary[column]);

  return {
    label: column,
    data,
    fill: false,
    borderColor,
    borderDash: [] as number[],
    tension: 0.1,
  };
};

export const computeMean = (labSummary: LabSummary): number => {
  const values: number[] = [
    'Basic Mechanics',
    'Introduction and Purpose',
    'Data',
    'Results and Data Analysis',
    'Questions and Conclusions',
  ].map((column) => labSummary[column]);

  return ss.mean(values);
};

export const makeChartData = (labSummaries: LabSummary[]) => {
  const labels = labSummaries.map((labRecord) => labRecord.Date);

  const columnDatasets = [
    { column: 'Basic Mechanics', borderColor: '#0000FF' },
    { column: 'Introduction and Purpose', borderColor: '#00FF00' },
    { column: 'Data', borderColor: '#FF0000' },
    { column: 'Results and Data Analysis', borderColor: '#FF00FF' },
    { column: 'Questions and Conclusions', borderColor: '#00FFFF' },
  ].map((spec) => makeDataset(labSummaries, spec.column, spec.borderColor));

  const meanDataSet = {
    label: 'Mean',
    data: labSummaries.map(computeMean),
    fill: false,
    borderColor: '#000000',
    borderDash: [5, 15],
    tension: 0.1,
  };

  const datasets = [columnDatasets, meanDataSet].flat();

  return { labels, datasets };
};
