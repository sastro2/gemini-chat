import { Button, Container } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useMessagesStore } from '../../../_state/Chat/messageWindow/messagesStore';
import { Message } from '../../../_types/Message';

interface IMessageInput {}

export const messageGemini = async(message: string, temp: number, currentMessageHistory: Message[], changeCurrentMessageHistory: (history: Message[]) => void) => {
  const res = await fetch('/api/geminiCalls/handleMessageGemini', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body:  JSON.stringify({
      message: message,
      history:  [],
      temp: temp
    })
  });

  const jsonRes = await res.json()

  changeCurrentMessageHistory([...currentMessageHistory, {role: 'model', parts: jsonRes.text}]);
};

const handleSendClick = (messageInput: string, currentMessageHistory: Message[], changeMessageInput: (input: string) => void, ChangeCurrentMessageHistory: (history: Message[]) => void) => {
  messageGemini(messageInput, 0.2, currentMessageHistory, ChangeCurrentMessageHistory);
  changeMessageInput('');
};

export const MessageInput: React.FC<IMessageInput> = () => {
  const {messageInput, currentMessageHistory, aiResponseLoading, changeCurrentMessageHistory, changeMessageInput} = useMessagesStore();

  return (
    <Container style={{ width: '100%', display: 'flex', padding: 0, margin: 0, gap: '0.5%' }} maxWidth={false}>
      <TextField onChange={(e) => {changeMessageInput(e.currentTarget.value)}} value={messageInput} style={{ width: '100%' }} autoFocus placeholder='Message Gemini' />
      <Button onClick={() => handleSendClick(messageInput, currentMessageHistory, changeMessageInput, changeCurrentMessageHistory)} style={{justifyContent: 'center', alignItems: 'center', lineHeight: 0}} variant='contained' disabled={aiResponseLoading}>Send</Button>
    </Container>
  );
};
