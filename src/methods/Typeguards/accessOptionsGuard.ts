import { AccessOptions } from '../../_types/AccessOptions';

export const accessOptionsGuard = (x: unknown): x is AccessOptions => {
  const obj = x as AccessOptions;

  return typeof obj.accessToken === 'string' && typeof obj.username === 'string';
};