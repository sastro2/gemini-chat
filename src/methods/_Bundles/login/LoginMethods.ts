import { Error } from '../../../_types/Error';
import { History } from '../../../_types/History';

export type LoginMethods = {
  changeLoginDialogOpen: (loginDialogOpen: boolean) => void,
  changeLoggedIn: (loggedIn: boolean) => void
  changeCurrentMessageHistory: (history: History) => void;
  changeHistories: (histories: History[]) => void;
  clearHistories: () => void;
  changeError: (error: Error) => void;
  changeErrorSnackbarOpen: (errorSnackbarOpen: boolean) => void;
};