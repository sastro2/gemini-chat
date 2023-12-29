import { Container } from '@mui/material';
import styles from './_styles/messageStyles.module.css';
import { MessageInputTextField } from './components/MessageInputTextField';
import { SendButton } from './components/SendButton';
import { TemperatureSlider } from './components/TemperatureSlider';

interface IMessageInput {}

export const MessageInput: React.FC<IMessageInput> = () => {

  return (
    <Container className={styles.messageInput} maxWidth={false}>
      <MessageInputTextField />
      <TemperatureSlider />
      <SendButton />
    </Container>
  );
};
