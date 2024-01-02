import { ApiFetchFunctions } from '../../../_types/ApiFetchFunctions';
import { ApiMethods } from '../../../_types/ApiMethods';
import { History } from '../../../_types/History';
import { MessageGeminiProps } from '../../_Bundles/chat/MessageGeminiProps';
import { SendUserMessageData } from '../../_Bundles/chat/SendUserMessageData';
import { SendUserMessageMethods } from '../../_Bundles/chat/SendUserMessageMethods';
import apiFetch, { ApiFetchBody } from '../../general/apiFetch';
import { dbHistoryGuard } from '../../Typeguards/dbHistoryGuard';
import { changeDbTemperatureById } from './changeDbTemperatureById';
import { messageGemini } from './messageGemini';

export const sendUserMessageToGemini = async(sendUserMessageData: SendUserMessageData, sendUserMessageMethods: SendUserMessageMethods, keyCode: string) => {
  const { currentMessageHistory, aiResponseLoading, messageInput, typingOutResponse, loggedIn } = sendUserMessageData;
  const { changeCurrentMessageHistory, changeAiReponseLoading, changeMessageInput, addHistory, addMessageToHistory, clearHistories, changeLoggedIn, changeError, changeErrorSnackbarOpen } = sendUserMessageMethods;

  if(messageInput === '' || aiResponseLoading || keyCode !== ('Enter' || '66' || '40') || typingOutResponse) return;

  //if not logged in, send not logged in message
  if(!loggedIn){
    changeCurrentMessageHistory({...currentMessageHistory, messages: [...currentMessageHistory.messages, {role: 'user', parts: messageInput, initialPrint: true, historyId: 0, created: new Date()},  {role: 'model', parts: 'Please login to use Chat Gemini', initialPrint: false, historyId: 0, created: new Date()}]});
    changeMessageInput('');
    changeAiReponseLoading(false);
    return;
  }

  const apiFetchFunctions: ApiFetchFunctions = {
    changeLoggedIn: changeLoggedIn,
    clearHistories: clearHistories,
    changeCurrentMessageHistory: changeCurrentMessageHistory,
    changeError: changeError,
    changeErrorSnackbarOpen: changeErrorSnackbarOpen,
  };

  //add new history if there is only the first auto generated message
  if(currentMessageHistory.messages.length === 1){
    const response: ApiFetchBody = await apiFetch('/api/endpoints/histories/addHistory', ApiMethods.POST, {functions: apiFetchFunctions, body: {historyTemperature: currentMessageHistory.temperature}});

    if(!dbHistoryGuard(response.history)){
      if(response.error){
        changeMessageInput('');
        return;
      }

      changeError({errorId: 0, errorCode: 50});
      changeMessageInput('');

      return;
    }

    currentMessageHistory.messages[0].historyId = response.history.id;
    currentMessageHistory.id = response.history.id;

    changeCurrentMessageHistory({...currentMessageHistory, id: currentMessageHistory.id});

    const newHistory: History = {...response.history, messages: [...currentMessageHistory.messages], temperature: parseInt(response.history.temperature)};
    addHistory(newHistory);
  }

  const messageGeminiProps: MessageGeminiProps = {
    messageGeminiData: {
      messageInput: messageInput,
      currentMessageHistory: currentMessageHistory,
    },
    messageGeminiMethods: {
      changeCurrentMessageHistory: changeCurrentMessageHistory,
      changeAiResponseLoading: changeAiReponseLoading,
      addMessageToHistory: addMessageToHistory,
      clearHistories: clearHistories,
      changeLoggedIn: changeLoggedIn,
      changeError: changeError,
      changeErrorSnackbarOpen: changeErrorSnackbarOpen,
    },
  };

  changeMessageInput('');
  const authorized = await messageGemini(messageGeminiProps.messageGeminiData, messageGeminiProps.messageGeminiMethods);
  if(!authorized) return;

  await changeDbTemperatureById(currentMessageHistory.id, currentMessageHistory.temperature, apiFetchFunctions);
};