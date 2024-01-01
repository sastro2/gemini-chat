import { SmartToyOutlined } from '@mui/icons-material';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import { useMessagesStore } from '../../../../_state/Chat/messageWindow/messagesStore';
import { useMediaQueryStore } from '../../../../_state/Page/mediaQueryStore';
import styles from '../_styles/messageStyles.module.css';

interface IMessageIcon {
  index: number;
  role: 'model' | 'user'
}

export const MessageIcon: React.FC<IMessageIcon> = (props) => {
  const {currentMessageHistory, aiResponseLoading} = useMessagesStore();
  const { frameSize } = useMediaQueryStore();

  if((props.index !== currentMessageHistory.messages.length - 1) && (props.index !== currentMessageHistory.messages.length - 2)) return null;
  if(aiResponseLoading && props.role === 'model') return null;

  if(props.role === 'model'){
    return <SmartToyOutlined id={frameSize !== 'desktop'? styles.messageIconModelMobile: styles.messageIconModel} fontSize={frameSize !== 'desktop'? 'small': 'large'}  sx={{fontSize: frameSize === 'tablet'? '26px': {}}} />
  }

  return <SentimentSatisfiedAltOutlinedIcon id={frameSize !== 'desktop'? styles.messageIconUserMobile: styles.messageIconUser} fontSize={frameSize !== 'desktop'? 'small': 'large'}  sx={{fontSize: frameSize === 'tablet'? '26px': {}}} />
}