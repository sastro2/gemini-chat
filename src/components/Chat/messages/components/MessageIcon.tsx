import { SmartToyOutlined } from '@mui/icons-material';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import { useMessagesStore } from '../../../../_state/Chat/messageWindow/messagesStore';
import styles from '../_styles/messageStyles.module.css';

interface IMessageIcon {
  index: number;
  role: 'model' | 'user'
}

export const MessageIcon: React.FC<IMessageIcon> = (props) => {
  const {currentMessageHistory, aiResponseLoading} = useMessagesStore();

  if((props.index !== currentMessageHistory.messages.length - 1) && (props.index !== currentMessageHistory.messages.length - 2)) return null;
  if(aiResponseLoading && props.role === 'model') return null;

  if(props.role === 'model'){
    return <SmartToyOutlined id={styles.messageIconModel} fontSize='large'/>
  }

  return <SentimentSatisfiedAltOutlinedIcon id={styles.messageIconUser} fontSize='large' />
}