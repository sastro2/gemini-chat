import { create } from 'zustand';
import { Message } from '../../../_types/Message';

interface IMessagesStore{
  currentMessageHistory: Message[];
  setTemperature: number;
  aiResponseLoading: boolean;
  messageInput: string;
  temperatureInput: number;
  typingOutResponse: boolean;
  changeCurrentMessageHistory: (history: Message[]) => void;
  changeSetTemperature: (temperature: number) => void;
  changeAiReponseLoading: (loading: boolean) => void;
  changeMessageInput:  (input: string) =>  void;
  changeTemperatureInput: (temp: number) => void;
  changeTypingOutResponse: (boolean: boolean) =>  void;
};

export const useMessagesStore = create<IMessagesStore>(set => ({
  currentMessageHistory: [{role: 'model', parts: 'Hello, how can I help you today?', initialPrint: false}],
  setTemperature: 0.2,
  aiResponseLoading: false,
  messageInput: '',
  temperatureInput: 0.2,
  typingOutResponse: false,
  changeCurrentMessageHistory: (history: Message[]) => set(({currentMessageHistory: history})),
  changeSetTemperature: (temperature: number) => set(({setTemperature: temperature})),
  changeAiReponseLoading: (loading: boolean) => set(({aiResponseLoading: loading})),
  changeMessageInput: (input: string) => set(({messageInput: input})),
  changeTemperatureInput: (temp: number) => set(({temperatureInput: temp})),
  changeTypingOutResponse: (boolean: boolean) => set(({typingOutResponse: boolean})),
}));