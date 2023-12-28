import { ApiFetchResult } from '../general/apiFetch';

export const apiFetchResultGuard = (body: unknown): body is ApiFetchResult => {
  const val = typeof (body as ApiFetchResult).error.errorId === 'number';

  return val;
};