import { DbHistory } from '../dataAccess/_models/dbHistory';

export const dbHistoryGuard = (x: unknown): x is DbHistory => {
  const obj = x as DbHistory;
  if(typeof obj !== 'object' || !('id' in obj) || !('temperature' in obj) || !('created' in obj)) return false;

  return typeof obj.id === 'number' && typeof obj.temperature === 'string' && (typeof obj.created === 'object' || typeof obj.created === 'string');
};