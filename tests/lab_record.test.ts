import { describe, expect, test } from 'vitest';
import { labRecordFromRow } from '~/lib/lab_record';

describe('LabRecord', () => {
  describe('labRecordFromRaw', () => {
    describe('given a valid row', () => {
      const validRow = {
        'Basic Mechanics': '3',
        'Introduction and Purpose': '2',
        'Lab Name': 'Density',
        'Questions and Conclusions': '3',
        'Results and Data Analysis': '4',
        average: '2.9',
        Data: '2',
        Date: '9/8/0022',
        Name: 'Aaron',
      };

      const cases = [
        { property: 'Basic Mechanics', expected: 3 },
        { property: 'Introduction and Purpose', expected: 2 },
        { property: 'Lab Name', expected: 'Density' },
        { property: 'Questions and Conclusions', expected: 3 },
        { property: 'Results and Data Analysis', expected: 4 },
        { property: 'average', expected: 2.9 },
        { property: 'Data', expected: 2 },
        { property: 'Date', expected: new Date(2022, 8, 8) },
        { property: 'Name', expected: 'Aaron' },
      ];

      const labRecord = labRecordFromRow(validRow);

      test.each(cases)('sets $property properly', ({ property, expected }) => {
        expect(labRecord[property]).toEqual(expected);
      });
    });

    describe('given an invalid row', () => {
      const invalidRow = {
        'Basic Mechanics': '3',
        'Introduction and Purpose': '2',
        'Lab Name': '', // missing title!
        'Questions and Conclusions': '3',
        'Results and Data Analysis': '4',
        average: '2.9',
        Data: '2',
        Date: '9/8/0022',
        Name: 'Aaron',
      };

      test('returns an errorful LabRecord', () => {
        expect(() => labRecordFromRow(invalidRow)).toThrow();
      });
    });
  });
});
