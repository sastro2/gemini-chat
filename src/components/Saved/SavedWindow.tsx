import 'simplebar-react/dist/simplebar.min.css';
import { Container } from '@mui/material';
import SimpleBar from 'simplebar-react';
import { useMediaQueryStore } from '../../_state/Page/mediaQueryStore';
import { Message } from '../../_types/Message';
import { TextBox } from '../Chat/messages/components/TextBox';
import styles from './styles/savedStyles.module.css';

interface ISavedWindow {
  messages: Message[];
}

export const SavedWindow: React.FC<ISavedWindow> = (props) => {
  const { frameSize } = useMediaQueryStore();
  const { messages } = props;

  return(
    <SimpleBar id={frameSize !== 'desktop'? styles.simpleBarMobile: styles.simpleBar}>
        <Container id={styles.messagesWindow} maxWidth={false}>
        {messages.map((message, index) => {

          return <TextBox key={message.parts + index} message={message} index={index} />
        })}
      </Container>
    </SimpleBar>
  );
};