import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Container, Typography } from '@mui/material';
import { useMessagesStore } from '../../../../_state/Chat/messageWindow/messagesStore';
import { usePageStore } from '../../../../_state/Page/pageStore';
import { History } from '../../../../_types/History';
import styles from '../_styles/historyStyles.module.css';

interface IHistory {
  history: History;
  index: number;
}

export const HistorySingle: React.FC<IHistory> = (props) => {
  const {history, index} = props;
  const {aiResponseLoading, typingOutResponse, currentMessageHistory, changeCurrentMessageHistory} = useMessagesStore();
  const { changeDrawerOpen } = usePageStore()

  return(
    <Container key={history.messages[1].parts + index} onClick={() => (!aiResponseLoading && !typingOutResponse)? [changeCurrentMessageHistory(history), changeDrawerOpen(false)]: null} id={currentMessageHistory.id === history.id? styles.historySingleSelected: styles.historySingle}>
      <Typography id={styles.text}>
        {history.messages[0].role === 'user'? history.messages[0].parts: history.messages[1].parts}
      </Typography>
      <Container id={styles.fadeContainer} maxWidth={false}>
        <Container id={styles.fade}>
          {currentMessageHistory.id === history.id
            ? <Container id={styles.verticalMenuContainer} maxWidth={false}>
                <MoreVertIcon id={styles.verticalMenu} fontSize='small' />
              </Container>
            : null}
        </Container>
      </Container>
    </Container>
  )
};