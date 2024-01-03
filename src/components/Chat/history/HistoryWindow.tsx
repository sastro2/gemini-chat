import { Container } from '@mui/material';
import { useMediaQueryStore } from '../../../_state/Page/mediaQueryStore';
import styles from './_styles/historyStyles.module.css';
import { HistoriesList } from './components/historiesList';
import { NewChatButton } from './components/NewChatButton';

interface IHistoryWindow {}

export const HistoryWindow: React.FC<IHistoryWindow> = () => {
  const { frameSize } = useMediaQueryStore();

  if (frameSize !== 'desktop') return null;

  return (
    <Container id={styles.historyWindow} maxWidth='xs'>
      <NewChatButton />
      <HistoriesList />
    </Container>
  );
};
