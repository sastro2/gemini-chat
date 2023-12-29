import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Button } from '@mui/material';
import {
  defaultCurrentMessageHistory,
  useMessagesStore,
} from '../../../../_state/Chat/messageWindow/messagesStore';
import styles from '../_styles/historyStyles.module.css';

interface INewChatButton {}

export const NewChatButton: React.FC<INewChatButton> = () => {
  const {changeCurrentMessageHistory, aiResponseLoading, typingOutResponse} = useMessagesStore();

  return (
    <Button id={styles.newChatButton} onClick={() => (!aiResponseLoading && !typingOutResponse)? changeCurrentMessageHistory(defaultCurrentMessageHistory): null}variant='contained' size='small'>New Chat &nbsp; <AddCircleOutlineOutlinedIcon /></Button>
  )
};