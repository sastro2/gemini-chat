export type Message = {
  role: 'user' | 'model';
  parts: string;
  initialPrint: boolean;
}