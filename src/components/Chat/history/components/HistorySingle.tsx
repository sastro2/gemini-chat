import { Container, Typography } from '@mui/material';
import { useMessagesStore } from '../../../../_state/Chat/messageWindow/messagesStore';
import { useMediaQueryStore } from '../../../../_state/Page/mediaQueryStore';
import { usePageStore } from '../../../../_state/Page/pageStore';
import { History } from '../../../../_types/History';
import { ThreeDotMenu } from '../../../general/ThreeDotMenu';
import styles from '../_styles/historyStyles.module.css';

interface IHistory {
  history: History;
  index: number;
}

export const HistorySingle: React.FC<IHistory> = (props) => {
  const {history, index} = props;
  const {aiResponseLoading, typingOutResponse, currentMessageHistory, changeCurrentMessageHistory} = useMessagesStore();
  const { changeDrawerOpen } = usePageStore();
  const { frameSize } = useMediaQueryStore();

  if(!(0 in history.messages)|| !(1 in history.messages)) return(null);

  return(
    <Container key={history.messages[1].parts + index} onClick={() => (!aiResponseLoading && !typingOutResponse)? [changeCurrentMessageHistory(history), changeDrawerOpen(false)]: null} id={currentMessageHistory.id === history.id? styles.historySingleSelected: styles.historySingle}>
      <Typography id={styles.text}>
        {history.messages[0].role === 'user'? history.messages[0].parts: history.messages[1].parts}
      </Typography>
      <Container id={styles.fadeContainer} maxWidth={false}>
        <Container id={styles.fade}>
          {(currentMessageHistory.id === history.id) && frameSize === 'desktop'
            ?<ThreeDotMenu historyId={history.id} />
            : null}
        </Container>
      </Container>
    </Container>
  )
};