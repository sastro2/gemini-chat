import { Message } from '../../../_types/Message';
import { StartGeminiChatResponseBody } from '../../../pages/api/endpoints/gemini/handleMessageGemini';
import { MessageGeminiData } from '../../_Bundles/chat/MessageGeminiData';
import { MessageGeminiMethods } from '../../_Bundles/chat/MessageGeminiMethods';
import { callGemini } from './callGemini';
import { saveMessageToDb } from './saveMessageToDb';

export const messageGemini = async(messageGeminiData: MessageGeminiData, messageGeminiMethods: MessageGeminiMethods): Promise<boolean> => {
  const { currentMessageHistory, messageInput } = messageGeminiData;
  const { changeCurrentMessageHistory, changeAiResponseLoading, addMessageToHistory, clearHistories, changeLoggedIn, changeError, changeErrorSnackbarOpen } = messageGeminiMethods;

   //all the messages to add in the following functions to make it more readable
   const newMessages: Message[] = [
    //0 - user message
    {
      role: 'user',
      parts: messageInput,
      initialPrint: true,
      historyId: currentMessageHistory.id
    },
    //1 - model response to user to be rendered immediately
    {
      role: 'model',
      parts: '',
      initialPrint: false,
      historyId: currentMessageHistory.id
    },
    //2 - model response to user to be saved in db and history
    {
      role: 'model',
      parts: '',
      initialPrint: true,
      historyId: currentMessageHistory.id
    },
    //3 - in case user is not logged in anymore
    {
      role: 'model',
      parts: 'Please login to use Chat Gemini',
      initialPrint: true,
      historyId: 0
    }
  ];

  changeAiResponseLoading(true);
  changeCurrentMessageHistory({...currentMessageHistory, messages: [...currentMessageHistory.messages, newMessages[0]]});
  addMessageToHistory(newMessages[0]);

  const apiFetchFunctions = {
    changeLoggedIn: changeLoggedIn,
    clearHistories: clearHistories,
    changeCurrentMessageHistory: changeCurrentMessageHistory,
    changeError: changeError,
    changeErrorSnackbarOpen: changeErrorSnackbarOpen,
  };
  const geminiResponse: Omit<StartGeminiChatResponseBody, 'error'> | 'logout' = await callGemini(currentMessageHistory, messageInput, currentMessageHistory.temperature, apiFetchFunctions);

  //if the user is not logged in anymore, log them out
  if(geminiResponse === 'logout'){
    changeAiResponseLoading(false);
    changeCurrentMessageHistory({...currentMessageHistory, messages: [newMessages[3]]});

    return false
  }

  newMessages[1].parts = geminiResponse.message? geminiResponse.message: 'Sorry, there has been an unknown error.';
  newMessages[2].parts = geminiResponse.message? geminiResponse.message: 'Sorry, there has been an unknown error.';

  //if not logged in, send not logged in message
  if(!geminiResponse.auth){
    changeCurrentMessageHistory({...currentMessageHistory, messages: [...currentMessageHistory.messages, newMessages[0], newMessages[1]]});
    addMessageToHistory(newMessages[2]);
    changeAiResponseLoading(false);

    return false;
  }

  changeCurrentMessageHistory({...currentMessageHistory, messages: [...currentMessageHistory.messages, newMessages[0], newMessages[1]]})
  addMessageToHistory(newMessages[2]);
  changeAiResponseLoading(false);
  await saveMessageToDb({role: 'user', parts: messageInput, initialPrint: true, historyId: currentMessageHistory.id}, apiFetchFunctions);
  await saveMessageToDb(newMessages[2], apiFetchFunctions);
  return true;
};