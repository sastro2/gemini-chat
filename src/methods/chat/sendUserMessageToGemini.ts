import { Message } from '../../_types/Message';
import { messageGemini } from './messageGemini';

export const sendUserMessageToGemini = (aiResponseLoading: boolean, messageInput: string, currentMessageHistory: Message[], changeMessageInput: (input: string) => void, ChangeCurrentMessageHistory: (history: Message[]) => void, keyCode: string, changeAiResponseLoading: (loading: boolean) => void) => {
  if(messageInput === '' || aiResponseLoading || keyCode !== 'Enter') return;

  ChangeCurrentMessageHistory([...currentMessageHistory, {role: 'user', parts: messageInput, initialPrint: true}]);
  messageGemini(messageInput, 0.2, currentMessageHistory, ChangeCurrentMessageHistory, changeAiResponseLoading);
  changeMessageInput('');
};