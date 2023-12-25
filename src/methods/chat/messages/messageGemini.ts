import { History } from '../../../_types/History';
import { Message } from '../../../_types/Message';
import changeTemperatureById from '../../../pages/api/endpoints/histories/changeTemperatureById';
import { callGemini } from './callGemini';
import { saveMessageToDb } from './saveMessageToDb';

export const messageGemini = async(messageInput: string, temp: number, currentMessageHistory: History, changeCurrentMessageHistory: (history: History) => void, changeAiResponseLoading: (loading: boolean) => void, addMessageToHistory: (message: Message) => void) => {
  changeAiResponseLoading(true);
  changeCurrentMessageHistory({...currentMessageHistory, messages: [...currentMessageHistory.messages, {role: 'user', parts: messageInput, initialPrint: true, historyId: currentMessageHistory.id}]});
  addMessageToHistory({role: 'user', parts: messageInput, initialPrint: true, historyId: currentMessageHistory.id});

  const geminiResponse = await callGemini(currentMessageHistory, messageInput, temp);

  //if not logged in, send not logged in message
  if(!geminiResponse.auth){
    changeCurrentMessageHistory({...currentMessageHistory, messages: [{role: 'user', parts: messageInput, initialPrint: true, historyId: 0}, {role: 'model', parts: 'Please login to use Chat Gemini', initialPrint: false, historyId: 0}]})
    changeAiResponseLoading(false);

    return;
  };

  saveMessageToDb({role: 'model', parts: geminiResponse.message, initialPrint: true, historyId: currentMessageHistory.id});
  changeCurrentMessageHistory({...currentMessageHistory, messages: [...currentMessageHistory.messages, {role: 'user', parts: messageInput, initialPrint: true, historyId: currentMessageHistory.id}, {role: 'model', parts: geminiResponse.message, initialPrint: false, historyId: currentMessageHistory.id}]})
  addMessageToHistory({role: 'model', parts: geminiResponse.message, initialPrint: true, historyId: currentMessageHistory.id});
  changeAiResponseLoading(false);
  return;
};