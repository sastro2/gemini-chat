import { Container } from '@mui/material';
import { MessageInputTextField } from './components/MessageInputTextField';
import { SendButton } from './components/SendButton';
import { TemperatureSlider } from './components/TemperatureSlider';

interface IMessageInput {};

export const MessageInput: React.FC<IMessageInput> = () => {

  return (
    <Container style={{ width: '100%', display: 'flex', padding: 0, margin: 0, gap: '0.5%'}} maxWidth={false}>
      <MessageInputTextField />
      <TemperatureSlider />
      <SendButton />
    </Container>
  );
};
