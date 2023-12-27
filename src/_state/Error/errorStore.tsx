import { create } from 'zustand';

interface IErrorStore{
  errorSnackbarOpen: boolean;
  errorId: number;
  errorCode: number;
  changeErrorSnackbarOpen: (boolean: boolean) => void;
  changeErrorId: (id: number) => void;
  changeErrorCode: (code: number) => void;
};

export const useErrorStore = create<IErrorStore>(set => ({
  errorSnackbarOpen: false,
  errorId: 0,
  errorCode: 0,
  changeErrorSnackbarOpen: (boolean: boolean) => set({errorSnackbarOpen: boolean}),
  changeErrorId: (id: number) => set({errorId: id}),
  changeErrorCode: (code: number) => set({errorCode: code}),
}));