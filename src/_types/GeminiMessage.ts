export type GeminiMessage = {
  role: 'user' | 'model';
  parts: string;
}