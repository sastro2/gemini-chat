import { create } from 'zustand';

interface IPageStore{
  page: 'chat' | 'functions' | 'profile'
  drawerOpen: boolean;
  changeDrawerOpen: (drawerOpen: boolean) => void;
  changePage: (page: 'chat' | 'functions' | 'profile') => void;
}

export const usePageStore = create<IPageStore>(set => ({
  page: 'chat',
  drawerOpen: false,
  changeDrawerOpen: (drawerOpen: boolean) => set({ drawerOpen }),
  changePage: (page: 'chat' | 'functions' | 'profile') => set({ page }),
}));