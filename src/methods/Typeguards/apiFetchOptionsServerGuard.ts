import { ApiFetchOptionsServer, FetchOptions } from '../general/apiFetch';

export const apiFetchOptionsServerGuard = (options: FetchOptions): options is ApiFetchOptionsServer => {
  const prefetch = typeof (options as ApiFetchOptionsServer).username === 'string';

  return prefetch;
};