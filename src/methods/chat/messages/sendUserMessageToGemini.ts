import { ApiFetchFunctions } from '../../../_types/ApiFetchFunctions';
import { ApiMethods } from '../../../_types/ApiMethods';
import { MessageGeminiProps } from '../../_Bundles/chat/MessageGeminiProps';
import { SendUserMessageData } from '../../_Bundles/chat/SendUserMessageData';
import { SendUserMessageMethods } from '../../_Bundles/chat/SendUserMessageMethods';
import apiFetch from '../../general/apiFetch';
import { changeDbTemperatureById } from './changeDbTemperatureById';
import { messageGemini } from './messageGemini';
import { saveMessageToDb } from './saveMessageToDb';

export const sendUserMessageToGemini = async(sendUserMessageData: SendUserMessageData, sendUserMessageMethods: SendUserMessageMethods, keyCode: string) => {
  const { currentMessageHistory, aiResponseLoading, messageInput, typingOutResponse, loggedIn } = sendUserMessageData;
  const { changeCurrentMessageHistory, changeAiReponseLoading, changeMessageInput, addHistory, addMessageToHistory, clearHistories, changeLoggedIn } = sendUserMessageMethods;

  if(messageInput === '' || aiResponseLoading || keyCode !== 'Enter' || typingOutResponse) return;

  //if not logged in, send not logged in message
  if(!loggedIn){
    changeCurrentMessageHistory({...currentMessageHistory, messages: [...currentMessageHistory.messages, {role: 'user', parts: messageInput, initialPrint: true, historyId: 0},  {role: 'model', parts: 'Please login to use Chat Gemini', initialPrint: false, historyId: 0}]});
    changeMessageInput('');
    changeAiReponseLoading(false);
    return;
  };

  const apiFetchFunctions: ApiFetchFunctions = {
    changeLoggedIn: changeLoggedIn,
    clearHistories: clearHistories,
    changeCurrentMessageHistory: changeCurrentMessageHistory,
  };

  //add new history if there is only the first auto generated message
  if(currentMessageHistory.messages.length === 1){
    const response = await apiFetch('/api/endpoints/histories/addHistory', ApiMethods.POST, {functions: apiFetchFunctions, body: {historyTemperature: currentMessageHistory.temperature}});

    currentMessageHistory.messages[0].historyId = response.history.id;
    currentMessageHistory.id = response.history.id;

    changeCurrentMessageHistory({...currentMessageHistory, id: currentMessageHistory.id});

    response.history.messages = [...currentMessageHistory.messages];
    addHistory(response.history);
  };

  saveMessageToDb({role: 'user', parts: messageInput, initialPrint: true, historyId: currentMessageHistory.id}, apiFetchFunctions);
  changeDbTemperatureById(currentMessageHistory.id, currentMessageHistory.temperature, apiFetchFunctions);

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
    },
  };
  messageGemini(messageGeminiProps.messageGeminiData, messageGeminiProps.messageGeminiMethods);
  changeMessageInput('');
};