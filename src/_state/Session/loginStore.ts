import { create } from 'zustand';

interface ILoginStore{
  loggedIn: boolean;
  loginDialogOpen: boolean;
  changeLoggedIn: (loggedIn: boolean) => void;
  changeLoginDialogOpen: (loginDialogOpen: boolean) => void;
};

export const useLoginStore = create<ILoginStore>(set => ({
  loggedIn: false,
  loginDialogOpen: false,
  changeLoggedIn: (loggedIn: boolean) => set({loggedIn: loggedIn}),
  changeLoginDialogOpen: (loginDialogOpen: boolean) => set({loginDialogOpen: loginDialogOpen}),
}));