import { Message } from '../../_types/Message';
import { messageGemini } from './messageGemini';

export const sendUserMessageToGemini = (aiResponseLoading: boolean, messageInput: string, currentMessageHistory: Message[], temp: number, changeMessageInput: (input: string) => void, ChangeCurrentMessageHistory: (history: Message[]) => void, keyCode: string, changeAiResponseLoading: (loading: boolean) => void, changeHistory: (history: Message[][]) => void, history: Message[][], typingOutResponse: boolean) => {
  if(messageInput === '' || aiResponseLoading || keyCode !== 'Enter' || typingOutResponse) return;

  if(currentMessageHistory.length === 1){
    const newHistory = history;
    newHistory.push([...currentMessageHistory, {role: 'user', parts: messageInput, initialPrint: true}])
    changeHistory(newHistory)
  }

  ChangeCurrentMessageHistory([...currentMessageHistory, {role: 'user', parts: messageInput, initialPrint: true}]);
  messageGemini(messageInput, temp, currentMessageHistory, history, changeHistory, ChangeCurrentMessageHistory, changeAiResponseLoading);
  changeMessageInput('');
};