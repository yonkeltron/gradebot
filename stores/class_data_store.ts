import { defineStore } from 'pinia';
import { ClassLabRecords } from '~~/lib/class_data';

export const useClassDataStore = defineStore('classData', {
  state: () => ({ classData: {} as ClassLabRecords }),
  getters: {
    studentNames: (state): string[] => Object.keys(state.classData),
  },
});
