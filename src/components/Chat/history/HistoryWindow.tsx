import { Container, Typography } from '@mui/material';
import { useHistoryStore } from '../../../_state/Chat/historyWindow/historyStore';
import { HistorySingle } from './components/HistorySingle';
import { NewChatButton } from './components/NewChatButton';

interface IHistoryWindow {};

export const HistoryWindow: React.FC<IHistoryWindow> = () => {
  const {histories} = useHistoryStore();

  return (
    <Container style={{width: '15%', minWidth: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start', padding: '0.5%', gap: '2%'}} maxWidth='xs'>
      <NewChatButton />
      <Container style={{gap: '5px', display: 'flex', justifyContent: 'start', alignItems: 'start', flexDirection: 'column', width: '100%', padding: 0}} maxWidth={false}>
        {histories.map((history, index) => {
          return (
            <HistorySingle key={history.id} history={history} index={index} />
          )
        })};
      </Container>
    </Container>
  );
};
