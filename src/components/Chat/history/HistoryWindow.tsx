import { Container, Typography } from '@mui/material';
import { Chats } from '../../../_mockData/Chats';

interface IHistoryWindow {}

export const HistoryWindow: React.FC<IHistoryWindow> = () => {
  return (
    <Container style={{width: '15%', minWidth: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start', padding: '0.5%', border: 'gray 1px solid', gap: '0.5%'}} maxWidth='xs'>
      {Chats.history.map((chat) => {
        return (
          <Container key={chat.messages.reduce((prev, curr) => {return prev + curr})} style={{border: 'gray 0.5px solid', borderRadius: '3px', padding: '0.5% 2% 0.5% 2%', display: 'flex', whiteSpace: 'nowrap', overflow: 'hidden'}}>
            <Typography>{chat.messages[0]}</Typography>
          </Container>
        )
      })}
    </Container>
  );
};
