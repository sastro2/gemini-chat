import { History } from '../../_types/History';

export const historyGuard = (x: unknown): x is History => {
  const obj = x as History;

  return typeof obj.id === 'number' && typeof obj.temperature === 'string' && typeof obj.created === 'object' && Array.isArray(obj.messages);
};