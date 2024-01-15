import { create } from 'zustand';

interface IuserDataStore{
  username: string;
  profileImg: string;
  menuAnchorEl: HTMLElement | null;
  changeUsername: (username: string) => void;
  changeProfileImg: (profileImg: string) => void;
  changeMenuAnchorEl: (anchorEl: HTMLElement | null) => void;
}

export const useUserDataStore = create<IuserDataStore>(set => ({
  username: '',
  profileImg: '',
  menuAnchorEl: null,
  changeUsername: (username: string) => set({username: username}),
  changeProfileImg: (profileImg: string) => set({profileImg: profileImg}),
  changeMenuAnchorEl: (anchorEl: HTMLElement | null) => set({menuAnchorEl: anchorEl}),
}));