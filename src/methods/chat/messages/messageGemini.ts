import { GeminiMessage } from '../../../_types/GeminiMessage';
import { History } from '../../../_types/History';
import { Message } from '../../../_types/Message';

export const messageGemini = async(messageInput: string, temp: number, currentMessageHistory: History, changeCurrentMessageHistory: (history: History) => void, changeAiResponseLoading: (loading: boolean) => void, addMessageToHistory: (message: Message) => void) => {
  changeAiResponseLoading(true);
  changeCurrentMessageHistory({...currentMessageHistory, messages: [...currentMessageHistory.messages, {role: 'user', parts: messageInput, initialPrint: true, historyId: currentMessageHistory.id}]});
  addMessageToHistory({role: 'user', parts: messageInput, initialPrint: true, historyId: currentMessageHistory.id});

  const geminiHistory: GeminiMessage[] = currentMessageHistory.messages.map((message) => {

    return {role: message.role, parts: message.parts};
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

  const parsedRes: { message: string, auth: boolean } = await res.json();

  if(!parsedRes.auth){
    changeCurrentMessageHistory({...currentMessageHistory, messages: [{role: 'user', parts: messageInput, initialPrint: true, historyId: 0}, {role: 'model', parts: 'Please login to use Chat Gemini', initialPrint: false, historyId: 0}]})
    changeAiResponseLoading(false);

    return;
  };

  changeCurrentMessageHistory({...currentMessageHistory, messages: [...currentMessageHistory.messages, {role: 'user', parts: messageInput, initialPrint: true, historyId: currentMessageHistory.id}, {role: 'model', parts: parsedRes.message, initialPrint: false, historyId: currentMessageHistory.id}]})
  addMessageToHistory({role: 'model', parts: parsedRes.message, initialPrint: true, historyId: currentMessageHistory.id});
  changeAiResponseLoading(false);
  return;
};