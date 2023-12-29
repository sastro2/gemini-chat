import { ApiFetchResult } from '../general/apiFetch';

export const apiFetchResultGuard = (body: unknown): body is ApiFetchResult => {
  if(typeof body !== 'object' || body === null || !('error' in body)) return false;
  const val = typeof (body as ApiFetchResult).error.errorId === 'number';

  return val;
};