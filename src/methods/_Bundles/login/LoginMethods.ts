import { History } from '../../../_types/History';

export type LoginMethods = {
  changeLoginDialogOpen: (loginDialogOpen: boolean) => void,
  changeLoggedIn: (loggedIn: boolean) => void
  changeCurrentMessageHistory: (history: History) => void;
  changeHistories: (histories: History[]) => void;
};