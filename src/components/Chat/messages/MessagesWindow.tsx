import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import { Container } from '@mui/material';
import { useMessagesStore } from '../../../_state/Chat/messageWindow/messagesStore';

interface IMessagesWindow {}

export const MessagesWindow: React.FC<IMessagesWindow> = () => {
  const {currentMessageHistory, aiResponseLoading} = useMessagesStore();

  return(
    <Container style={{ height: '100%', display: 'flex', border: 'gray 1px solid', padding: 0 }} maxWidth={false}>
      {currentMessageHistory.map((message, index) => {
        if((index === currentMessageHistory.length + 1) && message.role === 'model' && aiResponseLoading){
          <AutorenewOutlinedIcon key={message.parts + index} />
        }

        return(
          <Container key={message.parts + index} style={{width: '100%', display: 'flex', border: 'gray 1px solid', padding: 0}} maxWidth={false}>
            {message.role} {message.parts}
          </Container>
        )
      })}
    </Container>
  );
};
