import { Records } from '../types/types';

const useCreateRecords = (records: Records, target: HTMLElement, turn: string) => {
  const newRecords = records.slice();
  newRecords[Number(target.dataset.space)] = turn;
  return newRecords;
};

export default useCreateRecords;
