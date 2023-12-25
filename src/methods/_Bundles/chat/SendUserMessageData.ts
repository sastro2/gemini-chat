import { History } from '../../../_types/History';

export type SendUserMessageData = {
  aiResponseLoading: boolean;
  messageInput: string;
  currentMessageHistory: History;
  typingOutResponse: boolean;
  loggedIn: boolean;
};