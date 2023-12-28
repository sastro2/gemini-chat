import { create } from 'zustand';
import { History } from '../../../_types/History';

interface IMessagesStore{
  currentMessageHistory: History;
  aiResponseLoading: boolean;
  messageInput: string;
  showTempInput: boolean;
  typingOutResponse: boolean;
  changeCurrentMessageHistory: (history: History) => void;
  changeAiReponseLoading: (loading: boolean) => void;
  changeMessageInput:  (input: string) =>  void;
  changeShowTempInput: (boolean: boolean) => void;
  changeTypingOutResponse: (boolean: boolean) =>  void;
}

export const defaultCurrentMessageHistory: History = {
  id: 0,
  temperature: 0.2,
  created: new Date(),
  messages: [
    {
      role: 'model',
      parts: 'Hello, how can I help you today?',
      initialPrint: false,
      historyId: 0
    }
  ]
};

export const useMessagesStore = create<IMessagesStore>(set => ({
  currentMessageHistory: defaultCurrentMessageHistory,
  aiResponseLoading: false,
  messageInput: '',
  typingOutResponse: false,
  showTempInput: false,
  changeCurrentMessageHistory: (history: History) => set(({currentMessageHistory: history})),
  changeAiReponseLoading: (loading: boolean) => set({aiResponseLoading: loading}),
  changeMessageInput: (input: string) => set({messageInput: input}),
  changeShowTempInput: (boolean: boolean) => set({showTempInput: boolean}),
  changeTypingOutResponse: (boolean: boolean) => set({typingOutResponse: boolean}),
}));