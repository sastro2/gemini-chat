import { AccessOptions } from '../../_types/AccessOptions';

export const accessOptionsGuard = (x: unknown): x is AccessOptions => {
  const obj = x as AccessOptions;
  if(typeof x !== 'object' || !('accessToken' in obj) || !('username' in obj)) return false;

  return typeof obj.accessToken === 'string' && typeof obj.username === 'string';
};