import { Button, Container } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useMessagesStore } from '../../../_state/Chat/messageWindow/messagesStore';
import { sendUserMessageToGemini } from '../../../methods/chat/sendUserMessageToGemini';
import { StyleSheet } from '../../../styleSheet';

interface IMessageInput {}

export const MessageInput: React.FC<IMessageInput> = () => {
  const {messageInput, currentMessageHistory, aiResponseLoading, changeCurrentMessageHistory, changeMessageInput, changeAiReponseLoading} = useMessagesStore();

  return (
    <Container style={{ width: '100%', display: 'flex', padding: 0, margin: 0, gap: '0.5%'}} maxWidth={false}>
      <TextField onKeyDown={(e) => {sendUserMessageToGemini(aiResponseLoading, messageInput, currentMessageHistory, changeMessageInput, changeCurrentMessageHistory, e.code, changeAiReponseLoading)}} onChange={(e) => {changeMessageInput(e.currentTarget.value)}} value={messageInput} style={{ width: '100%', backgroundColor: StyleSheet.background.messages.messageWindowContainer }} sx={{ input: {color: StyleSheet.characters, borderColor: StyleSheet.borders} }} autoFocus placeholder='Message Gemini' />
      <Button onClick={() => sendUserMessageToGemini(aiResponseLoading, messageInput, currentMessageHistory, changeMessageInput, changeCurrentMessageHistory, 'Enter', changeAiReponseLoading)} style={{justifyContent: 'center', alignItems: 'center', lineHeight: 0, backgroundColor: StyleSheet.buttons}} variant='contained'>Send</Button>
    </Container>
  );
};
