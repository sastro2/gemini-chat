import { DbHistory } from '../dataAccess/_models/dbHistory';

export const dbHistoryGuard = (x: unknown): x is DbHistory => {
  const obj = x as DbHistory;

  return typeof obj.id === 'number' && typeof obj.temperature === 'string' && (typeof obj.created === 'object' || typeof obj.created === 'string');
};