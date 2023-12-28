import { StartGeminiChatResponseBody } from '../../pages/api/endpoints/gemini/handleMessageGemini';

export const clientStartGeminiChatResponseBodyGuard = (x: unknown): x is Omit<StartGeminiChatResponseBody, 'error'> => {
  const obj = x as StartGeminiChatResponseBody;

  return typeof obj.message === 'string' && typeof obj.auth === 'boolean';
};