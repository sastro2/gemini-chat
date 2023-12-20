import { create } from 'zustand';
import { Message } from '../../../_types/Message';

interface IHistoryStore{
  history: Message[][];
  changeHistory: (history: Message[][]) => void;
};

export const useHistoryStore = create<IHistoryStore>(set => ({
history: [],
changeHistory: (history: Message[][]) => set(({history: history})),
}));