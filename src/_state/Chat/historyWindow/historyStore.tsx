import { create } from 'zustand';
import { History } from '../../../_types/History';
import { Message } from '../../../_types/Message';

interface IHistoryStore{
  histories: History[];
  addHistory: (history: History) => void;
  addMessageToHistory: (message: Message) => void;
  changeHistoryTemp: (historyId: number, temperature: number) => void;
  changeHistories: (histories: History[]) => void;
  clearHistories: () => void;
}

const changeHistoryTemp = (historyId: number, temperature: number, histories: History[]): History[] => {
  const newHistories = histories.map((history) => {
    if(history.id === historyId) {
      return {
        ...history,
        temperature: temperature
      }
    }
    return history;
  });

  if(!newHistories) return histories;
  return newHistories
}

const addMessageToHistory = (message: Message, histories: History[]): History[] => {
  const newHistory = histories.map((history) => {
    if(history.id === message.historyId) {
      return {
        ...history,
        messages: [...history.messages, message]
      }
    }
    return history;
  });

  if(!newHistory) return histories;
  return newHistory
};

const addHistory = (history: History, histories: History[]): History[] => {
  const newHistories = [...histories, history];
  const sortedHistories = newHistories.sort((a, b) => {
    return new Date(b.created).getTime() - new Date(a.created).getTime();
  });

  return sortedHistories
}

export const useHistoryStore = create<IHistoryStore>(set => ({
histories: [],
addHistory: (history: History) => set(state => ({histories: addHistory(history, state.histories)})),
addMessageToHistory: (message: Message) => set(state => ({histories: addMessageToHistory(message, state.histories)})),
changeHistories: (histories: History[]) => set({histories}),
changeHistoryTemp: (historyId: number, temperature: number) => set(state => ({histories: changeHistoryTemp(historyId, temperature, state.histories)})),
clearHistories: () => set({histories: []})
}));