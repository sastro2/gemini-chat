import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Container } from '@mui/material';
import { useHistoryStore } from '../../_state/Chat/historyWindow/historyStore';
import { useMessagesStore } from '../../_state/Chat/messageWindow/messagesStore';
import styles from './_styles/generalStyles.module.css';

interface IThreeDotMenu {
  historyId: number
}

export const ThreeDotMenu: React.FC<IThreeDotMenu> = (props) => {
  const { changeMenuAnchorEl, changeMenuHistoryId } = useHistoryStore()
  const {aiResponseLoading, typingOutResponse} = useMessagesStore();

  return(
    <Container id={styles.verticalMenuContainer} maxWidth={false} onClick={(e) => [(aiResponseLoading || typingOutResponse)? null: changeMenuAnchorEl(e.currentTarget), changeMenuHistoryId(props.historyId), e.stopPropagation()]}>
      <MoreVertIcon id={styles.verticalMenuButton} fontSize='small' />
    </Container>
  )
};