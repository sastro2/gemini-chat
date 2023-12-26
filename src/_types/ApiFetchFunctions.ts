import { History } from './History';

export type ApiFetchFunctions = {
  changeLoggedIn: (loggedIn: boolean) => void;
  clearHistories: () => void;
  changeCurrentMessageHistory: (currentMessageHistory: History) => void;
};