import { z } from 'zod';
import { LabRecordSchema } from './lab_record';

export const ClassLabRecordsSchema = z.record(
  z.string().min(3),
  z.array(LabRecordSchema)
);

export type ClassLabRecords = z.infer<typeof ClassLabRecordsSchema>;
