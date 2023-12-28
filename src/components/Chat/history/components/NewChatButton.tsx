import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Button } from '@mui/material';
import {
  defaultCurrentMessageHistory,
  useMessagesStore,
} from '../../../../_state/Chat/messageWindow/messagesStore';

interface INewChatButton {}

export const NewChatButton: React.FC<INewChatButton> = () => {
  const {changeCurrentMessageHistory, aiResponseLoading, typingOutResponse} = useMessagesStore();

  return (
    <Button onClick={() => (!aiResponseLoading && !typingOutResponse)? changeCurrentMessageHistory(defaultCurrentMessageHistory): null} style={{justifyContent: 'center', alignItems: 'center', lineHeight: 0, minHeight: '35px'}} variant='contained' size='small'>New Chat &nbsp; <AddCircleOutlineOutlinedIcon /></Button>
  )
};