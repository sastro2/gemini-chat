import { Container, Typography } from '@mui/material';
import { Chats } from '../../../_mockData/Chats';

interface IHistoryWindow {}

export const HistoryWindow: React.FC<IHistoryWindow> = () => {
  return (
    <Container style={{width: '15%', minWidth: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start', padding: '0.5%', border: 'gray 1px solid', gap: '0.5%'}} maxWidth='xs'>
      {Chats.history.map((chat) => {
        return (
          <Container style={{border: 'gray 0.5px solid', padding: '0.5% 2% 0.5% 2%', display: 'flex'}}>
            <Typography>{chat.messages[0]}</Typography>
          </Container>
        )
      })}
    </Container>
  );
};
