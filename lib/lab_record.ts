import * as ss from 'simple-statistics';
import { z } from 'zod';

export const RawRowSchema = z.object({
  'Basic Mechanics': z.string().min(1).max(1),
  'Introduction and Purpose': z.string().min(1).max(1),
  'Lab Name': z.string().min(3),
  'Questions and Conclusions': z.string().min(1).max(1),
  'Results and Data Analysis': z.string().min(1).max(1),
  Data: z.string().min(1).max(1),
  Date: z.string().min(8).max(10),
  Name: z.string().min(3),
  average: z.string().min(1),
});

export type RawRow = Readonly<Required<z.infer<typeof RawRowSchema>>>;

export const LabRecordSchema = z
  .object({
    'Basic Mechanics': z.number().positive().int(),
    'Introduction and Purpose': z.number().positive().int(),
    'Lab Name': z.string().min(3),
    'Questions and Conclusions': z.number().positive().int(),
    'Results and Data Analysis': z.number().positive().int(),
    Data: z.number().positive().int(),
    Date: z.date(),
    Name: z.string().min(3),
  })
  .strict();

export type LabRecord = Readonly<Required<z.infer<typeof LabRecordSchema>>>;

export const labRecordFromRow = z
  .function()
  .args(RawRowSchema)
  .returns(LabRecordSchema)
  .implement((row: RawRow) => {
    const labRecord = {
      'Basic Mechanics': parseInt(row['Basic Mechanics'], 10),
      'Introduction and Purpose': parseInt(row['Introduction and Purpose'], 10),
      'Lab Name': row['Lab Name'],
      'Questions and Conclusions': parseInt(
        row['Questions and Conclusions'],
        10
      ),
      'Results and Data Analysis': parseInt(
        row['Results and Data Analysis'],
        10
      ),
      Data: parseInt(row.Data, 10),
      Date: new Date(Date.parse(row.Date)),
      Name: row.Name,
    };

    return labRecord;
  });

export const computeMean = (labRecord: LabRecord): number => {
  const values: number[] = [
    'Basic Mechanics',
    'Introduction and Purpose',
    'Data',
    'Results and Data Analysis',
    'Questions and Conclusions',
  ].map((column) => labRecord[column]);

  return ss.mean(values);
};
