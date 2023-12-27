import { Container } from '@mui/material';
import { HistoriesList } from './components/historiesList';
import { NewChatButton } from './components/NewChatButton';

interface IHistoryWindow {};

export const HistoryWindow: React.FC<IHistoryWindow> = () => {
  return (
    <Container style={{width: '15%', minWidth: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start', padding: '0.5%', gap: '2%'}} maxWidth='xs'>
      <NewChatButton />
      <HistoriesList />
    </Container>
  );
};
