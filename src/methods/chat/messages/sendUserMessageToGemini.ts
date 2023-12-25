import { History } from '../../../_types/History';
import { SendUserMessageData } from '../../_Bundles/chat/SendUserMessageData';
import { SendUserMessageMethods } from '../../_Bundles/chat/SendUserMessageMethods';
import { changeDbTemperatureById } from './changeDbTemperatureById';
import { messageGemini } from './messageGemini';
import { saveMessageToDb } from './saveMessageToDb';

export const sendUserMessageToGemini = async(sendUserMessageData: SendUserMessageData, sendUserMessageMethods: SendUserMessageMethods, keyCode: string) => {
  const { currentMessageHistory, aiResponseLoading, messageInput, typingOutResponse, loggedIn } = sendUserMessageData;
  const { changeCurrentMessageHistory, changeAiReponseLoading, changeMessageInput, addHistory, addMessageToHistory } = sendUserMessageMethods;

  if(messageInput === '' || aiResponseLoading || keyCode !== 'Enter' || typingOutResponse) return;

  //if not logged in, send not logged in message
  if(!loggedIn){
    changeCurrentMessageHistory({...currentMessageHistory, messages: [...currentMessageHistory.messages, {role: 'user', parts: messageInput, initialPrint: true, historyId: 0},  {role: 'model', parts: 'Please login to use Chat Gemini', initialPrint: false, historyId: 0}]});
    changeMessageInput('');
    changeAiReponseLoading(false);
    return;
  };

  //add new history if there is only the first auto generated message
  if(currentMessageHistory.messages.length === 1){
    const response = await fetch('/api/endpoints/histories/addHistory', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({historyTemperature: currentMessageHistory.temperature})
    });

    const parsedResponse: {history: History} = await response.json();

    currentMessageHistory.messages[0].historyId = parsedResponse.history.id;
    currentMessageHistory.id = parsedResponse.history.id;

    changeCurrentMessageHistory({...currentMessageHistory, id: currentMessageHistory.id});

    parsedResponse.history.messages = [...currentMessageHistory.messages];
    addHistory(parsedResponse.history);
  };

  saveMessageToDb({role: 'user', parts: messageInput, initialPrint: true, historyId: currentMessageHistory.id});
  changeDbTemperatureById(currentMessageHistory.id, currentMessageHistory.temperature);
  messageGemini(messageInput, currentMessageHistory.temperature, currentMessageHistory, changeCurrentMessageHistory, changeAiReponseLoading, addMessageToHistory);
  changeMessageInput('');
};