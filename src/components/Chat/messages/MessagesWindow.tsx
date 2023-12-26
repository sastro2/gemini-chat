import 'simplebar-react/dist/simplebar.min.css';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import { Container } from '@mui/material';
import { createRef, useEffect, useRef, useState } from 'react';
import SimpleBar from 'simplebar-react';
import { useMessagesStore } from '../../../_state/Chat/messageWindow/messagesStore';
import { StyleSheet } from '../../../styleSheet';
import { TextBox } from './components/TextBox';
import { TextBoxInitPrint } from './components/textBoxInitPrint';

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
    }, 1000/(currentMessageHistory.messages[currentMessageHistory.messages.length - 1].parts.length * 3));
  }, [currentMessageHistory]);

  return(
    <SimpleBar scrollableNodeProps={{ ref: scrollableNodeRef }} style={{height: '100%', border: `${StyleSheet.background.messages.messageWindowContainer} 0.01px solid`, borderRadius: '20px', padding: '5% 17% 5% 17%', overflow: 'auto', overflowX: 'hidden', backgroundColor: StyleSheet.background.messages.messageWindowContainer}}>
      <Container style={{height: '100%', display: 'flex', flexDirection: 'column'}} maxWidth={false}>
      {currentMessageHistory.messages.map((message, index) => {
        if((index === currentMessageHistory.messages.length - 1) && message.role === 'model' && aiResponseLoading){
          return <AutorenewOutlinedIcon key={message.parts + index} />
        };

        if(!message.initialPrint){
          if(message.parts.length === text.length){
            message.initialPrint = true;
          };

          const textToRender = text;
          return <TextBoxInitPrint key={message.parts + index} message={message} index={index} textToRender={textToRender} />
        };

        return <TextBox key={message.parts + index} message={message} index={index} />
        })}
      </Container>
    </SimpleBar>
  );
};
