import { Error } from '../../../_types/Error';
import { History } from '../../../_types/History';
import { Message } from '../../../_types/Message';

export type MessageGeminiMethods = {
  changeCurrentMessageHistory: (history: History) => void;
  changeAiResponseLoading: (loading: boolean) => void;
  addMessageToHistory: (message: Message) => void;
  clearHistories: () => void;
  changeLoggedIn: (loggedIn: boolean) => void;
  changeError: (error: Error) => void;
  changeErrorSnackbarOpen: (errorSnackbarOpen: boolean) => void;
};