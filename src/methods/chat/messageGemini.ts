import { GeminiMessage } from '../../_types/GeminiMessage';
import { Message } from '../../_types/Message';

export const messageGemini = async(messageInput: string, temp: number, currentMessageHistory: Message[], history: Message[][], changeHistory: (history: Message[][]) => void, changeCurrentMessageHistory: (history: Message[]) => void, changeAiResponseLoading: (loading: boolean) => void) => {
  changeAiResponseLoading(true);

  const geminiHistory: GeminiMessage[] = currentMessageHistory.map((message) => {

    return {role: message.role, parts: message.parts}
  });
  geminiHistory.shift();

  const res = await fetch('/api/geminiCalls/handleMessageGemini', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body:  JSON.stringify({
      message: messageInput,
      history:  geminiHistory,
      temp: temp
    })
  });


  const reader = res.body!.getReader();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const decoder = new TextDecoder('utf-8');
    const chunk = decoder.decode(value);

    changeCurrentMessageHistory([...currentMessageHistory, {role: 'user', parts: messageInput, initialPrint: true}, {role: 'model', parts: chunk, initialPrint: false}])
  }

  changeAiResponseLoading(false);
};