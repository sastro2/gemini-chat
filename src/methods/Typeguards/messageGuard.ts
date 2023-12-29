import { Message } from '../../_types/Message';

export const messageGuard = (x: unknown): x is Message => {
  const obj = x as Message;
  if(typeof x !== 'object' || !('historyId' in obj) || !('parts' in obj) || !('role' in obj) || !('initialPrint' in obj)) return false;

  return typeof obj.historyId === 'number' && typeof obj.parts === 'string' && typeof obj.role === 'string' && typeof obj.initialPrint === 'boolean';
};