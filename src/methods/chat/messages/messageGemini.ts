import { Message } from '../../../_types/Message';
import { MessageGeminiData } from '../../_Bundles/chat/MessageGeminiData';
import { MessageGeminiMethods } from '../../_Bundles/chat/MessageGeminiMethods';
import { callGemini } from './callGemini';
import { saveMessageToDb } from './saveMessageToDb';

export const messageGemini = async(messageGeminiData: MessageGeminiData, messageGeminiMethods: MessageGeminiMethods) => {
  const { currentMessageHistory, messageInput } = messageGeminiData;
  const { changeCurrentMessageHistory, changeAiResponseLoading, addMessageToHistory, clearHistories, changeLoggedIn } = messageGeminiMethods;

   //all the messages to add in the following functions to make it more readable
   const newMessages: Message[] = [
    //0 - user message
    {
      role: 'user',
      parts: messageInput,
      initialPrint: true,
      historyId: currentMessageHistory.id
    },
    //1 - model response to user
    {
      role: 'model',
      parts: '',
      initialPrint: true, historyId:
      currentMessageHistory.id
    },
  ];

  changeAiResponseLoading(true);
  changeCurrentMessageHistory({...currentMessageHistory, messages: [...currentMessageHistory.messages, newMessages[0]]});
  addMessageToHistory(newMessages[0]);

  const apiFetchFunctions = {
    changeLoggedIn: changeLoggedIn,
    clearHistories: clearHistories,
    changeCurrentMessageHistory: changeCurrentMessageHistory,
  };
  const geminiResponse = await callGemini(currentMessageHistory, messageInput, currentMessageHistory.temperature, apiFetchFunctions);

  //if not logged in, send not logged in message
  if(!geminiResponse.auth){
    changeCurrentMessageHistory({...currentMessageHistory, messages: [{role: 'user', parts: messageInput, initialPrint: true, historyId: 0}, {role: 'model', parts: 'Please login to use Chat Gemini', initialPrint: false, historyId: 0}]})
    changeAiResponseLoading(false);

    return;
  };

  newMessages[1].parts = geminiResponse.message;

  saveMessageToDb(newMessages[1], apiFetchFunctions);
  changeCurrentMessageHistory({...currentMessageHistory, messages: [...currentMessageHistory.messages, newMessages[0], newMessages[1]]})
  addMessageToHistory(newMessages[1]);
  changeAiResponseLoading(false);
  return;
};