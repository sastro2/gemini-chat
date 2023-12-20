import { Message } from '../../_types/Message';

export const messageGemini = async(messageInput: string, temp: number, currentMessageHistory: Message[], changeCurrentMessageHistory: (history: Message[]) => void, changeAiResponseLoading: (loading: boolean) => void) => {
  changeAiResponseLoading(true);
  const res = await fetch('/api/geminiCalls/handleMessageGemini', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body:  JSON.stringify({
      message: messageInput,
      history:  [],
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