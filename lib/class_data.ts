import { z } from 'zod';
import { LabRecord, LabRecordSchema } from './lab_record';

export const ClassLabRecordsSchema = z.record(
  z.string().min(3),
  z.array(LabRecordSchema)
);

export type ClassLabRecords = z.infer<typeof ClassLabRecordsSchema>;

export const assembleClassData = (labRecords: LabRecord[]): ClassLabRecords => {
  return labRecords.reduce((obj, labRecord) => {
    const name = labRecord.Name;

    if (obj[name]) {
      obj[name].push(labRecord);
    } else {
      obj[name] = [labRecord];
    }

    return obj;
  }, {});
};
