export type Message = {
  role: 'user' | 'model';
  parts: string;
  initialPrint: boolean;
  historyId: number;
  created: Date;
}