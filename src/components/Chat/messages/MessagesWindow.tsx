import 'simplebar-react/dist/simplebar.min.css';
import { Container } from '@mui/material';
import { useRef } from 'react';
import SimpleBar from 'simplebar-react';
import { useMessagesStore } from '../../../_state/Chat/messageWindow/messagesStore';
import { useMediaQueryStore } from '../../../_state/Page/mediaQueryStore';
import styles from './_styles/messageStyles.module.css';
import { TextBox } from './components/TextBox';
import { TextBoxInitPrint } from './components/TextBoxInitPrint';
import { TypingIndicator } from './components/TypingIndicator';

interface IMessagesWindow {}

export const MessagesWindow: React.FC<IMessagesWindow> = () => {
  const {currentMessageHistory, aiResponseLoading} = useMessagesStore();
  const { frameSize } = useMediaQueryStore();

  const scrollableNodeRef = useRef<HTMLDivElement>(null);

  return(
    <SimpleBar id={frameSize !== 'desktop'? styles.simpleBarMobile: styles.simpleBar} scrollableNodeProps={{ ref: scrollableNodeRef }}>
        <Container id={styles.messagesWindow} maxWidth={false}>
        {currentMessageHistory.messages.map((message, index) => {
          // if message hasnt been printed type it out
          if(!message.initialPrint){
            return <TextBoxInitPrint key={message.parts + index} message={message} index={index} scrollableNodeRef={scrollableNodeRef} />
          }

          // if model response is currently loading render typing indicator below last message
          if(index === currentMessageHistory.messages.length - 1 && aiResponseLoading && message.role === 'user'){
            return(
              <Container id={styles.typingIndicatorTextBoxContainer} key={message.parts + index}>
                <TextBox message={message} index={index} />
                <TypingIndicator />
              </Container>
            )
          }

          return <TextBox key={message.parts + index} message={message} index={index} />
        })}
      </Container>
    </SimpleBar>
  );
};
