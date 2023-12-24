import { Message } from '../../_types/Message';
import { messageGemini } from './messageGemini';

export const sendUserMessageToGemini = (aiResponseLoading: boolean, messageInput: string, currentMessageHistory: Message[], temp: number, changeMessageInput: (input: string) => void, changeCurrentMessageHistory: (history: Message[]) => void, keyCode: string, changeAiResponseLoading: (loading: boolean) => void, changeHistory: (history: Message[][]) => void, history: Message[][], typingOutResponse: boolean, loggedIn: boolean) => {
  if(messageInput === '' || aiResponseLoading || keyCode !== 'Enter' || typingOutResponse) return;

  console.log(loggedIn)

  if(!loggedIn){
    changeCurrentMessageHistory([...currentMessageHistory, {role: 'user', parts: messageInput, initialPrint: true},  {role: 'model', parts: 'Please login to use Chat Gemini', initialPrint: false}]);
    changeMessageInput('');
    return;
  };

  if(currentMessageHistory.length === 1){
    const newHistory = history;
    newHistory.push([...currentMessageHistory, {role: 'user', parts: messageInput, initialPrint: true}])
    changeHistory(newHistory)
  };

  changeCurrentMessageHistory([...currentMessageHistory, {role: 'user', parts: messageInput, initialPrint: true}]);
  messageGemini(messageInput, temp, currentMessageHistory, history, changeHistory, changeCurrentMessageHistory, changeAiResponseLoading);
  changeMessageInput('');
};