import { GeminiMessage } from '../../_types/GeminiMessage';
import { Message } from '../../_types/Message';

export const messageGemini = async(messageInput: string, temp: number, currentMessageHistory: Message[], history: Message[][], changeHistory: (history: Message[][]) => void, changeCurrentMessageHistory: (history: Message[]) => void, changeAiResponseLoading: (loading: boolean) => void) => {
  changeAiResponseLoading(true);

  const geminiHistory: GeminiMessage[] = currentMessageHistory.map((message) => {

    return {role: message.role, parts: message.parts}
  });
  geminiHistory.shift();

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

  if(!parsedRes.auth){
    changeCurrentMessageHistory([...currentMessageHistory, {role: 'user', parts: messageInput, initialPrint: true}, {role: 'model', parts: 'Please login to use Chat Gemini', initialPrint: false}])
    changeAiResponseLoading(false);

    return;
  };

  changeCurrentMessageHistory([...currentMessageHistory, {role: 'user', parts: messageInput, initialPrint: true}, {role: 'model', parts: parsedRes.message, initialPrint: false}])
  changeAiResponseLoading(false);
  return;
};