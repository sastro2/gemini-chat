import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Button, ButtonOwnProps } from '@mui/material';
import {
  defaultCurrentMessageHistory,
  useMessagesStore,
} from '../../../../_state/Chat/messageWindow/messagesStore';
import styles from '../_styles/historyStyles.module.css';

interface INewChatButton {}

const buttonProps: ButtonOwnProps = {
  variant: 'contained',
  size: 'small'
}

export const NewChatButton: React.FC<INewChatButton> = () => {
  const {changeCurrentMessageHistory, aiResponseLoading, typingOutResponse} = useMessagesStore();

  return (
    <Button id={styles.newChatButton} {...buttonProps} onClick={() => (!aiResponseLoading && !typingOutResponse)? changeCurrentMessageHistory(defaultCurrentMessageHistory): null}>
      New Chat &nbsp; <AddCircleOutlineOutlinedIcon />
    </Button>
  )
};