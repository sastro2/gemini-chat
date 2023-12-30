import { create } from 'zustand';

interface IMediaQueryStore{
  frameSize: 'desktop' | 'tablet' | 'mobile';
  changeFrameSize: (frameSize: 'desktop' | 'tablet' | 'mobile') => void;
}

export const useMediaQueryStore = create<IMediaQueryStore>(set => ({
  frameSize: 'desktop',
  changeFrameSize: (frameSize: 'desktop' | 'tablet' | 'mobile') => set({ frameSize })
}));