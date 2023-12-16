import { create } from 'zustand';
import { Message } from '../../../_types/Message';

interface IMessagesStore{
  currentMessageHistory: Message[];
  setTemperature: number;
  aiResponseLoading: boolean;
  messageInput: string;
  temperatureInput: number;
  changeCurrentMessageHistory: (history: Message[]) => void;
  changeSetTemperature: (temperature: number) => void;
  changeAiReponseLoading: (loading: boolean) => void;
  changeMessageInput:  (input: string) =>  void;
  changeTemperatureInput: (temp: number) => void;
};

export const useMessagesStore = create<IMessagesStore>(set => ({
  currentMessageHistory: [],
  setTemperature: 0.2,
  aiResponseLoading: false,
  messageInput: '',
  temperatureInput: 0.2,
  changeCurrentMessageHistory: (history: Message[]) => set(({currentMessageHistory: history})),
  changeSetTemperature: (temperature: number) => set(({setTemperature: temperature})),
  changeAiReponseLoading: (loading: boolean) => set(({aiResponseLoading: loading})),
  changeMessageInput: (input: string) => set(({messageInput: input})),
  changeTemperatureInput: (temp: number) => set(({temperatureInput: temp})),
}));