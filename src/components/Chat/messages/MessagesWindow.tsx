import 'simplebar-react/dist/simplebar.min.css';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import { Container } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import SimpleBar from 'simplebar-react';
import { useMessagesStore } from '../../../_state/Chat/messageWindow/messagesStore';
import { StyleSheet } from '../../../styleSheet';

interface IMessagesWindow {}

export const MessagesWindow: React.FC<IMessagesWindow> = () => {
  const {currentMessageHistory, aiResponseLoading} = useMessagesStore();

  return(
    <SimpleBar style={{height: '100%', border: `${StyleSheet.background.base} 0.01px solid`, borderRadius: '20px', padding: '5% 20% 5% 20%', overflow: 'auto', overflowX: 'hidden', backgroundColor: StyleSheet.background.messages.messageWindowContainer}}>
      <Container style={{height: '100%', display: 'flex', flexDirection: 'column'}} maxWidth={false}>
      {currentMessageHistory.map((message, index) => {
        if((index === currentMessageHistory.length - 1) && message.role === 'model' && aiResponseLoading){
          console.log('hi')
          return <AutorenewOutlinedIcon key={message.parts + index} />
        };

        return(
          <Container key={message.parts + index} style={{display: 'flex', justifyContent: message.role === 'model'? 'start':  'end', padding: '0.5%'}} maxWidth={false}>
            <Container style={{border: `${StyleSheet.background.messages.message} 0.01px solid`, borderRadius: message.role === 'model'? '3px 15px 15px 15px':  '15px 3px 15px 15px', width: 'auto', padding: '0 3% 0 3%', margin: 0, color: StyleSheet.characters, backgroundColor: StyleSheet.background.messages.message, letterSpacing: '0.3px'}} maxWidth={false}>
              <ReactMarkdown>{message.parts}</ReactMarkdown>
            </Container>
          </Container>
          )
        })}
      </Container>
    </SimpleBar>
  );
};
