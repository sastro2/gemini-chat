import TextField from '@mui/material/TextField';

interface IMessageInput {}

export const MessageInput: React.FC<IMessageInput> = () => {
  return <TextField style={{ width: '100%' }} autoFocus placeholder='Message Gemini' />;
};
