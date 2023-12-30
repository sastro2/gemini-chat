import 'simplebar-react/dist/simplebar.min.css';
import { Container } from '@mui/material';
import { createRef, useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';
import { useMessagesStore } from '../../../_state/Chat/messageWindow/messagesStore';
import styles from './_styles/messageStyles.module.css';
import { TextBox } from './components/TextBox';
import { TextBoxInitPrint } from './components/TextBoxInitPrint';
import { TypingIndicator } from './components/TypingIndicator';

interface IMessagesWindow {}

export const MessagesWindow: React.FC<IMessagesWindow> = () => {
  const [text, setText] = useState<string>('');
  const {currentMessageHistory, aiResponseLoading, changeCurrentMessageHistory, changeTypingOutResponse} = useMessagesStore();

  const scrollableNodeRef = createRef();

  //type out Ai response
  useEffect(() => {
    if((currentMessageHistory.messages[currentMessageHistory.messages.length - 1].role === 'user') || (currentMessageHistory.messages[currentMessageHistory.messages.length - 1].initialPrint)) return;
    changeTypingOutResponse(true);

    let currentIndex = 0;

    const intervalId = setInterval(() => {
      setText((prevText) => prevText  + currentMessageHistory.messages[currentMessageHistory.messages.length - 1].parts[currentIndex]);

      currentIndex += 1;

      if (currentIndex === currentMessageHistory.messages[currentMessageHistory.messages.length - 1].parts.length) {
        clearInterval(intervalId);
        setText('')

        const newMessage = currentMessageHistory.messages[currentMessageHistory.messages.length - 1];
        newMessage.initialPrint = true;
        const newHistory = currentMessageHistory;
        currentMessageHistory.messages[currentMessageHistory.messages.length - 1] = newMessage;

        changeCurrentMessageHistory(newHistory);
        changeTypingOutResponse(false);
      }
    }, 800 / currentMessageHistory.messages[currentMessageHistory.messages.length - 1].parts.length);
  }, [currentMessageHistory, changeCurrentMessageHistory, changeTypingOutResponse]);

  return(
    <SimpleBar id={styles.simpleBar} scrollableNodeProps={{ ref: scrollableNodeRef }}>
        <Container id={styles.messagesWindow} maxWidth={false}>
        {currentMessageHistory.messages.map((message, index) => {
          // if message hasnt been printed type it out
          if(!message.initialPrint){
            if(message.parts.length === text.length) message.initialPrint = true;

            const textToRender = text;
            return <TextBoxInitPrint key={message.parts + index} message={message} index={index} textToRender={textToRender} />
          }

          // if model response is currently loading render typing indicator below last message
          if(index === currentMessageHistory.messages.length - 1 && aiResponseLoading){
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
