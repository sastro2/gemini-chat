import { Message } from './Message';

export type History = {
  id: number;
  temperature: number;
  messages: Message[];
  created: Date;
}