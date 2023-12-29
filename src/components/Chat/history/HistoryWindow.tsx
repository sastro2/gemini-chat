import { Container } from '@mui/material';
import styles from './_styles/historyStyles.module.css';
import { HistoriesList } from './components/historiesList';
import { NewChatButton } from './components/NewChatButton';

interface IHistoryWindow {}

export const HistoryWindow: React.FC<IHistoryWindow> = () => {
  return (
    <Container className={styles.historyWindow} maxWidth='xs'>
      <NewChatButton />
      <HistoriesList />
    </Container>
  );
};
