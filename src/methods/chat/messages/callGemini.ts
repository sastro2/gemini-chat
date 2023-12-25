import { GeminiMessage } from '../../../_types/GeminiMessage';
import { History } from '../../../_types/History';

export const callGemini = async(currentMessageHistory: History, messageInput: string, temp: number): Promise<{ message: string, auth: boolean }> => {
  const geminiHistory: GeminiMessage[] = currentMessageHistory.messages.map((message) => {

    return {role: message.role, parts: message.parts};
  });
  if(geminiHistory[0].role === 'model') geminiHistory.shift();

  const res = await fetch('/api/endpoints/gemini/handleMessageGemini', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body:  JSON.stringify({
      message: messageInput,
      history:  geminiHistory,
      temp: temp
    })
  });

  const parsedRes = await res.json();

  return parsedRes;
}