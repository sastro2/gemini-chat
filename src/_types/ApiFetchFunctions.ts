import { Error } from './Error';
import { History } from './History';

export type ApiFetchFunctions = {
  changeLoggedIn: (loggedIn: boolean) => void;
  clearHistories: () => void;
  changeCurrentMessageHistory: (currentMessageHistory: History) => void;
  changeError: (error: Error) => void;
  changeErrorSnackbarOpen: (errorSnackbarOpen: boolean) => void;
};