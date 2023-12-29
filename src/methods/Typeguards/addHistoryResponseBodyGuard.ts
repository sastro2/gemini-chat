import { AddHistoryResponseBody } from '../../pages/api/endpoints/histories/addHistory';

export const addHistoryResponseBodyGuard = (x: unknown): x is AddHistoryResponseBody => {
  const obj = x as AddHistoryResponseBody;
  if(typeof obj !== 'object' || !('error' in obj) || !('history' in obj)) return false;

  return typeof obj.error === 'object' && typeof obj.history === 'object';
};