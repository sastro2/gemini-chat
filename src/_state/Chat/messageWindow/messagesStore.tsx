import { create } from 'zustand';
import { Message } from '../../../_types/Message';

interface IMessagesStore{
  currentMessageHistory: Message[];
  aiResponseLoading: boolean;
  messageInput: string;
  temperatureInput: number;
  showTempInput: boolean;
  typingOutResponse: boolean;
  changeCurrentMessageHistory: (history: Message[]) => void;
  changeAiReponseLoading: (loading: boolean) => void;
  changeMessageInput:  (input: string) =>  void;
  changeTemperatureInput: (temp: number) => void;
  changeShowTempInput: (boolean: boolean) => void;
  changeTypingOutResponse: (boolean: boolean) =>  void;
};

export const useMessagesStore = create<IMessagesStore>(set => ({
  currentMessageHistory: [{role: 'model', parts: 'Hello, how can I help you today?', initialPrint: false}],
  aiResponseLoading: false,
  messageInput: '',
  temperatureInput: 0.2,
  typingOutResponse: false,
  showTempInput: false,
  changeCurrentMessageHistory: (history: Message[]) => set(({currentMessageHistory: history})),
  changeAiReponseLoading: (loading: boolean) => set(({aiResponseLoading: loading})),
  changeMessageInput: (input: string) => set(({messageInput: input})),
  changeTemperatureInput: (temp: number) => set(({temperatureInput: temp})),
  changeShowTempInput: (boolean: boolean) => set(({showTempInput: boolean})),
  changeTypingOutResponse: (boolean: boolean) => set(({typingOutResponse: boolean})),
}));