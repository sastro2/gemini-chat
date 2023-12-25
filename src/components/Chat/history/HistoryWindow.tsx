import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Button, Container, Typography } from '@mui/material';
import { useHistoryStore } from '../../../_state/Chat/historyWindow/historyStore';
import { useMessagesStore } from '../../../_state/Chat/messageWindow/messagesStore';
import { StyleSheet } from '../../../styleSheet';

interface IHistoryWindow {};

export const HistoryWindow: React.FC<IHistoryWindow> = () => {
  const {aiResponseLoading, typingOutResponse, currentMessageHistory, changeCurrentMessageHistory} = useMessagesStore();
  const {histories} = useHistoryStore();

  return (
    <Container style={{width: '15%', minWidth: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start', padding: '0.5%', gap: '2%'}} maxWidth='xs'>
      <Button onClick={() => (!aiResponseLoading && !typingOutResponse)? [changeCurrentMessageHistory({id: 0, temperature: currentMessageHistory.temperature, created: new Date() , messages: [{role: 'model', parts: 'Hello, how can I help you today?', initialPrint: false, historyId: 0}]}), console.log('history change')]: null} style={{justifyContent: 'center', alignItems: 'center', lineHeight: 0, minHeight: '35px'}} variant='contained' size='small'>New Chat &nbsp; <AddCircleOutlineOutlinedIcon /></Button>
      <Container style={{gap: '5px', display: 'flex', justifyContent: 'start', alignItems: 'start', flexDirection: 'column', width: '100%', padding: 0}} maxWidth={false}>
        {histories.map((history, index) => {
          return (
            <Container key={history.messages[1].parts + index} onClick={() => (!aiResponseLoading && !typingOutResponse)? [changeCurrentMessageHistory(history)]: null} style={{border: `${StyleSheet.background.history.historyContainer} 0.01px solid`, borderRadius: '50px', padding: '0.5% 3.5% 0.5% 3.5%', display: 'flex', whiteSpace: 'nowrap', overflow: 'hidden', backgroundColor: StyleSheet.background.history.historyContainer, minWidth: 0, cursor: 'pointer'}}>
              <Typography>{history.messages[1].parts}</Typography>
            </Container>
          )
        })};
      </Container>
    </Container>
  );
};