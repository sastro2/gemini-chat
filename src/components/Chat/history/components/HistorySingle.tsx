import { Container, Typography } from '@mui/material';
import { useMessagesStore } from '../../../../_state/Chat/messageWindow/messagesStore';
import { History } from '../../../../_types/History';
import { StyleSheet } from '../../../../styleSheet';

interface IHistory {
  history: History;
  index: number;
}

export const HistorySingle: React.FC<IHistory> = (props) => {
  const {history, index} = props;
  const {aiResponseLoading, typingOutResponse, currentMessageHistory, changeCurrentMessageHistory} = useMessagesStore();

  return(
    <Container key={history.messages[1].parts + index} onClick={() => (!aiResponseLoading && !typingOutResponse)? [changeCurrentMessageHistory(history)]: null} style={{border: `${currentMessageHistory.id === history.id? '#2196F3': StyleSheet.background.history.historyContainer} 2px solid`, borderRadius: '10px', padding: '0.5% 3.5% 0.5% 3.5%', display: 'flex', whiteSpace: 'nowrap', overflow: 'hidden', backgroundColor: StyleSheet.background.history.historyContainer, minWidth: 0, cursor: 'pointer'}}>
      <Typography style={{color: StyleSheet.background.history.historyColor}}>{history.messages[0].role === 'user'? history.messages[0].parts: history.messages[1].parts}</Typography>
    </Container>
  )
};