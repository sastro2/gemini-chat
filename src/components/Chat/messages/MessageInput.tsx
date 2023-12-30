import { Container } from '@mui/material';
import { useMediaQueryStore } from '../../../_state/Page/mediaQueryStore';
import styles from './_styles/messageStyles.module.css';
import { MessageInputTextField } from './components/MessageInputTextField';
import { SendButton } from './components/SendButton';
import { TemperatureSlider } from './components/TemperatureSlider';

interface IMessageInput {}

export const MessageInput: React.FC<IMessageInput> = () => {
  const { frameSize } = useMediaQueryStore();

  if(frameSize === 'mobile'){
    return(
      <Container id={styles.messageInput} maxWidth={false}>
        <MessageInputTextField />
      </Container>
    )
  }

  return (
    <Container id={styles.messageInput} maxWidth={false}>
      <MessageInputTextField />
      <TemperatureSlider />
      <SendButton />
    </Container>
  );
};
