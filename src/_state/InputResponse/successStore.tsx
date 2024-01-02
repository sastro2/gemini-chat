import { create } from 'zustand';

interface IPageStore{
  successSnackbarOpen: boolean;
  successMessage: string;
  changeSuccessSnackbarOpen: (successSnackbarOpen: boolean) => void;
  changeSuccessMessage: (message: string) => void;
}

export const useSuccessStore = create<IPageStore>(set => ({
  successSnackbarOpen: false,
  successMessage: '',
  changeSuccessSnackbarOpen: (successSnackbarOpen: boolean) => set({ successSnackbarOpen }),
  changeSuccessMessage: (message: string) => set({ successMessage: message }),
}));