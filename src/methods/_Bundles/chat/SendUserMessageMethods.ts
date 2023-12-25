import { History } from '../../../_types/History';
import { Message } from '../../../_types/Message';

export type SendUserMessageMethods = {
  changeMessageInput: (message: string) => void;
  changeCurrentMessageHistory: (history: History) => void;
  changeAiReponseLoading: (loading: boolean) => void;
  addHistory: (history: History) => void;
  addMessageToHistory: (message: Message) => void
};