import { create } from 'zustand';

interface ILoginStore{
  loggedIn: boolean;
  loginDialogOpen: boolean;
  usernameInput: string;
  passwordInput: string;
  changeLoggedIn: (loggedIn: boolean) => void;
  changeLoginDialogOpen: (loginDialogOpen: boolean) => void;
  changeUsernameInput: (username: string) => void;
  changePasswordInput: (password: string) => void;
}

export const useLoginStore = create<ILoginStore>(set => ({
  loggedIn: true,
  loginDialogOpen: false,
  usernameInput: '',
  passwordInput: '',
  changeLoggedIn: (loggedIn: boolean) => set({loggedIn: loggedIn}),
  changeLoginDialogOpen: (loginDialogOpen: boolean) => set({loginDialogOpen: loginDialogOpen}),
  changeUsernameInput: (username: string) => set({usernameInput: username}),
  changePasswordInput: (password: string) => set({passwordInput: password})
}));