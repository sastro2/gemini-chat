import { Message } from '../../_types/Message';

export const messageGuard = (x: unknown): x is Message => {
  const obj = x as Message;

  return typeof obj.historyId === 'number' && typeof obj.parts === 'string' && typeof obj.role === 'string' && typeof obj.initialPrint === 'boolean';
};