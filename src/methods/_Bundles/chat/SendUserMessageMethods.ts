import { Error } from '../../../_types/Error';
import { History } from '../../../_types/History';
import { Message } from '../../../_types/Message';

export type SendUserMessageMethods = {
  changeMessageInput: (message: string) => void;
  changeCurrentMessageHistory: (history: History) => void;
  changeAiReponseLoading: (loading: boolean) => void;
  addHistory: (history: History) => void;
  addMessageToHistory: (message: Message) => void,
  clearHistories: () => void;
  changeLoggedIn: (loggedIn: boolean) => void;
  changeError: (error: Error) => void;
  changeErrorSnackbarOpen: (errorSnackbarOpen: boolean) => void;
};