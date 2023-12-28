import { create } from 'zustand';
import { Error } from '../../_types/Error';

interface IErrorStore{
  errorSnackbarOpen: boolean;
  error: Error
  changeErrorSnackbarOpen: (boolean: boolean) => void;
  changeError: (error: Error) => void;
}

export const defaultError: Error = {errorCode: 0, errorId: 0};

export const useErrorStore = create<IErrorStore>(set => ({
  errorSnackbarOpen: false,
  error: defaultError,
  changeErrorSnackbarOpen: (boolean: boolean) => set({errorSnackbarOpen: boolean}),
  changeError: (error: Error) => set({error: error})
}));