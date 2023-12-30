import { ApiFetchFunctions } from '../../../_types/ApiFetchFunctions';
import { ApiMethods } from '../../../_types/ApiMethods';
import { GeminiMessage } from '../../../_types/GeminiMessage';
import { History } from '../../../_types/History';
import { StartGeminiChatResponseBody } from '../../../pages/api/endpoints/gemini/handleMessageGemini';
import apiFetch, { ApiFetchBody } from '../../general/apiFetch';
import { clientStartGeminiChatResponseBodyGuard } from '../../Typeguards/clientStartGeminiChatResponseBodyGuard';

export const callGemini = async(currentMessageHistory: History, messageInput: string, temp: number, apiFetchFunctions: ApiFetchFunctions): Promise<Omit<StartGeminiChatResponseBody, 'error'> | 'logout'> => {
  const geminiHistory: GeminiMessage[] = currentMessageHistory.messages.map((message) => {

    return {role: message.role, parts: message.parts};
  });
  if(geminiHistory[0].role === 'model') geminiHistory.shift();

  const res: ApiFetchBody = await apiFetch('/api/endpoints/gemini/handleMessageGemini', ApiMethods.POST, {body: {message: messageInput, history:  geminiHistory, temp: temp}, functions: apiFetchFunctions});

  if(res.error?.errorCode === 800)  return 'logout';

  if(!clientStartGeminiChatResponseBodyGuard(res)){
    if(res.error){
      if(res.error.errorCode !== 10) return {message: `Sorry there has been an error please relog and consider reporting it in the bug report form in the bottom left. ${res.error.errorId? `ID: ${res.error.errorId}`: ''}`, auth: false};

      return {message: 'Sorry, we are having trouble communicating with Gemini please try sending your message again.', auth: true};
    }

    return {message: 'Sorry there has been an unknown error please relog.', auth: false};
  }

  return res;
};