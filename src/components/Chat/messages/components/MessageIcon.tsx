import { SmartToyOutlined } from '@mui/icons-material';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import { useMessagesStore } from '../../../../_state/Chat/messageWindow/messagesStore';

interface IMessageIcon {
  index: number;
  role: 'model' | 'user'
}

export const MessageIcon: React.FC<IMessageIcon> = (props) => {
  const {currentMessageHistory} = useMessagesStore();

  if((props.index !== currentMessageHistory.messages.length - 1) && (props.index !== currentMessageHistory.messages.length - 2)) return null;

  if(props.role === 'model'){
    return <SmartToyOutlined fontSize='large' style={{position: 'absolute', left: -40, top: 5}} />
  }

  return <SentimentSatisfiedAltOutlinedIcon fontSize='large' style={{position: 'absolute', right: -40, top: 5}} />
}