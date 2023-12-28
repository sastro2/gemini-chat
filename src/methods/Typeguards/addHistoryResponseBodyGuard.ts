import { AddHistoryResponseBody } from '../../pages/api/endpoints/histories/addHistory';

export const addHistoryResponseBodyGuard = (x: unknown): x is AddHistoryResponseBody => {
  const obj = x as AddHistoryResponseBody;

  return typeof obj.error === 'object' && typeof obj.history === 'object';
};