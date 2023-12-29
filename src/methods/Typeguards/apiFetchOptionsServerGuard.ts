import { ApiFetchOptionsServer, FetchOptions } from '../general/apiFetch';

export const apiFetchOptionsServerGuard = (options: FetchOptions): options is ApiFetchOptionsServer => {
  if(typeof options !== 'object' || options === null || !('username' in options)) return false;
  const prefetch = typeof options.username === 'string';

  return prefetch;
};