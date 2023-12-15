import { create } from 'zustand';
import { Message } from '../../../_types/Message';

interface IMessagesStore{
  currentMessageHistory: Message[];
  setTemperature: number;
  aiResponseLoading: boolean;
  changeCurrentMessageHistory: (history: Message[]) => void;
  changeSetTemperature: (temperature: number) => void;
  changeAiReponseLoading: (loading: boolean) => void;
};

export const useMessagesStore = create<IMessagesStore>(set => ({
  currentMessageHistory: [],
  setTemperature: 0.2,
  aiResponseLoading: false,
  changeCurrentMessageHistory: (history: Message[]) => set(({currentMessageHistory: history})),
  changeSetTemperature: (temperature: number) => set(({setTemperature: temperature})),
  changeAiReponseLoading: (loading: boolean) => set(({aiResponseLoading: loading}))
}));