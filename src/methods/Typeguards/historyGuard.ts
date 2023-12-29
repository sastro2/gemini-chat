import { History } from '../../_types/History';

export const historyGuard = (x: unknown): x is History => {
  const obj = x as History;
  if(typeof obj !== 'object' || !('id' in obj) || !('temperature' in obj) || !('created' in obj) || !('messages' in obj)) return false;

  return typeof obj.id === 'number' && typeof obj.temperature === 'string' && typeof obj.created === 'object' && Array.isArray(obj.messages);
};