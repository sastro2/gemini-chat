import { ApiFetchFunctions } from '../../../_types/ApiFetchFunctions';
import { ApiMethods } from '../../../_types/ApiMethods';
import { GeminiMessage } from '../../../_types/GeminiMessage';
import { History } from '../../../_types/History';
import apiFetch from '../../general/apiFetch';

export const callGemini = async(currentMessageHistory: History, messageInput: string, temp: number, apiFetchFunctions: ApiFetchFunctions): Promise<{ message: string, auth: boolean }> => {
  const geminiHistory: GeminiMessage[] = currentMessageHistory.messages.map((message) => {

    return {role: message.role, parts: message.parts};
  });
  if(geminiHistory[0].role === 'model') geminiHistory.shift();

  const res = await apiFetch('/api/endpoints/gemini/handleMessageGemini', ApiMethods.POST, {body: {message: messageInput, history:  geminiHistory, temp: temp}, functions: apiFetchFunctions});

  return res;
};