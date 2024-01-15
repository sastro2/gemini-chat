import { create } from 'zustand';
import { Error } from '../../_types/Error';

interface IErrorStore{
  errorSnackbarOpen: boolean;
  error: Error
  alertDialogOpen: boolean;
  alertDialog: AlertDialogType;
  changeErrorSnackbarOpen: (boolean: boolean) => void;
  changeError: (error: Error) => void;
  changeAlertDialogOpen: (boolean: boolean) => void;
  changeAlertDialog: (alertDialog: AlertDialogType) => void;
}

export type AlertDialogType = {
  title: string;
  content?: string;
  confirm?: () => Promise<void>;
  changeState?: () => void;
  disagreeBtnText: string;
  agreeBtnText: string;
  fontSize?: number;
}

export const defaultAlertDialog: AlertDialogType = {
  title: '',
  disagreeBtnText: '',
  agreeBtnText: '',
}

export const defaultError: Error = {errorCode: 0, errorId: 0};

export const useErrorStore = create<IErrorStore>(set => ({
  errorSnackbarOpen: false,
  error: defaultError,
  alertDialogOpen: false,
  alertDialog: defaultAlertDialog,
  changeErrorSnackbarOpen: (boolean: boolean) => set({errorSnackbarOpen: boolean}),
  changeError: (error: Error) => set({error: error}),
  changeAlertDialogOpen: (boolean: boolean) => set({alertDialogOpen: boolean}),
  changeAlertDialog: (alertDialog: AlertDialogType) => set({alertDialog: alertDialog}),
}));