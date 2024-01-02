import { Container } from '@mui/material';
import { RefObject, useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { useMessagesStore } from '../../../../_state/Chat/messageWindow/messagesStore';
import { Message } from '../../../../_types/Message';
import styles from '../_styles/messageStyles.module.css';
import { MessageIcon } from './MessageIcon';

interface ITextBoxInitPrint {
  message: Message;
  index: number;
  scrollableNodeRef: RefObject<HTMLDivElement>;
}

export const TextBoxInitPrint: React.FC<ITextBoxInitPrint> = (props) => {
  const [textToRender, setTextToRender] = useState<string>('');
  const [userScrolling, setUserScrolling] = useState<boolean>(false);
  const {currentMessageHistory, typingOutResponse, changeCurrentMessageHistory, changeTypingOutResponse} = useMessagesStore();
  const {message, index, scrollableNodeRef} = props;

  if(message.parts.length === textToRender.length) message.initialPrint = true;

  let scrollbarInAutoScrollRange: boolean = false;

  //calc distance from bottom of messages window if the last message is an ai message or initial is true
  if(scrollableNodeRef.current && typingOutResponse){
    const distanceFromBottom = scrollableNodeRef.current.scrollHeight - (scrollableNodeRef.current.scrollTop + scrollableNodeRef.current.clientHeight);
    scrollbarInAutoScrollRange = (distanceFromBottom < 50) && (distanceFromBottom > 0);
  }

  //scroll messageWindow if the distance to bottom has changed and is in the autoscroll range
  useEffect(() => {
    const scrollbarElement = scrollableNodeRef.current;

    //add event listener to detect if user is scrolling
    if(scrollbarElement){
      const handleUserScroll = () => {
        setUserScrolling(true);

        setTimeout(() => setUserScrolling(false), 200);
      };
      scrollbarElement.addEventListener('wheel', () => handleUserScroll);
    }

    //if user isnt scrolling and is close to bottom of messages window scroll to bottom
    if(scrollbarInAutoScrollRange && scrollbarElement && !userScrolling){
      scrollbarElement.scrollTo({
        top: scrollbarElement.scrollHeight,
        behavior: 'instant'
      });
    }

    return () => {
       if(scrollbarElement) scrollbarElement.removeEventListener('wheel', () => setUserScrolling(true));
    }
  }, [scrollbarInAutoScrollRange, userScrolling, scrollableNodeRef]);

  //type out Ai response
  useEffect(() => {
    if((currentMessageHistory.messages[currentMessageHistory.messages.length - 1].role === 'user') || (currentMessageHistory.messages[currentMessageHistory.messages.length - 1].initialPrint)) return;
    changeTypingOutResponse(true)
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      setTextToRender((prevText) => prevText  + currentMessageHistory.messages[currentMessageHistory.messages.length - 1].parts[currentIndex]);

      currentIndex += 1;

      if (currentIndex === currentMessageHistory.messages[currentMessageHistory.messages.length - 1].parts.length) {
        clearInterval(intervalId);
        setTextToRender('')

        const newMessage = currentMessageHistory.messages[currentMessageHistory.messages.length - 1];
        newMessage.initialPrint = true;
        const newHistory = currentMessageHistory;
        currentMessageHistory.messages[currentMessageHistory.messages.length - 1] = newMessage;

        changeCurrentMessageHistory(newHistory);
        changeTypingOutResponse(false);
      }
    }, 0.4);
  }, [currentMessageHistory, changeCurrentMessageHistory, changeTypingOutResponse]);

  return(
    <Container id={message.role === 'model'? styles.textBoxModel: styles.textBoxUser}>
      {message.role === 'model'? <MessageIcon index={index} role='model' />: null}
        <Container id={message.role === 'model'? styles.textBoxTextModel: styles.textBoxTextUser}>
          <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
            {textToRender}
          </Markdown>
        </Container>
      {message.role === 'user'? <MessageIcon index={index} role='user' />: null}
    </Container>
  )
};