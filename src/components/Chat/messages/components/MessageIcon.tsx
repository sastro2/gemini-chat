import { SmartToyOutlined } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { useMessagesStore } from '../../../../_state/Chat/messageWindow/messagesStore';
import { useMediaQueryStore } from '../../../../_state/Page/mediaQueryStore';
import { useUserDataStore } from '../../../../_state/Profile/userDataStore';
import styles from '../_styles/messageStyles.module.css';

interface IMessageIcon {
  index: number;
  role: 'model' | 'user'
}

export const MessageIcon: React.FC<IMessageIcon> = (props) => {
  const {currentMessageHistory, aiResponseLoading} = useMessagesStore();
  const { frameSize } = useMediaQueryStore();
  const { profileImg } = useUserDataStore();

  if((props.index !== currentMessageHistory.messages.length - 1) && (props.index !== currentMessageHistory.messages.length - 2)) return null;
  if(aiResponseLoading && props.role === 'model') return null;

  if(props.role === 'model'){
    return <SmartToyOutlined id={frameSize !== 'desktop'? styles.messageIconModelMobile: styles.messageIconModel} fontSize={frameSize !== 'desktop'? 'small': 'large'}  sx={{fontSize: frameSize === 'tablet'? '26px': {}}} />
  }

  return <Avatar id={frameSize !== 'desktop'? styles.messageIconUserMobile: styles.messageIconUser} src={profileImg} sx={{height: frameSize === 'tablet'? '26px': frameSize === 'desktop'? {}: '20px', width: frameSize === 'tablet'? '26px': frameSize === 'desktop'? {}: '20px'}} />
}