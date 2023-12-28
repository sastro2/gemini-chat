import { ApiFetchFunctions } from '../../../_types/ApiFetchFunctions';
import { ApiMethods } from '../../../_types/ApiMethods';
import { GeminiMessage } from '../../../_types/GeminiMessage';
import { History } from '../../../_types/History';
import { StartGeminiChatResponseBody } from '../../../pages/api/endpoints/gemini/handleMessageGemini';
import apiFetch, { ApiFetchBody } from '../../general/apiFetch';
import { clientStartGeminiChatResponseBodyGuard } from '../../Typeguards/clientStartGeminiChatResponseBodyGuard';

export const callGemini = async(currentMessageHistory: History, messageInput: string, temp: number, apiFetchFunctions: ApiFetchFunctions): Promise<Omit<StartGeminiChatResponseBody, 'error'>> => {
  const geminiHistory: GeminiMessage[] = currentMessageHistory.messages.map((message) => {

    return {role: message.role, parts: message.parts};
  });
  if(geminiHistory[0].role === 'model') geminiHistory.shift();

  const res: ApiFetchBody = await apiFetch('/api/endpoints/gemini/handleMessageGemini', ApiMethods.POST, {body: {message: messageInput, history:  geminiHistory, temp: temp}, functions: apiFetchFunctions});

  if(!clientStartGeminiChatResponseBodyGuard(res)){

    return {message: 'Sorry there has been an error please relog.', auth: false};
  }

  return res;
};