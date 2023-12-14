import { Container, Grid } from '@mui/material';
import { HistoryWindow } from './history/HistoryWindow';
import { MessageInput } from './input/MessageInput';
import { MessagesWindow } from './messages/MessagesWindow';

interface IChatWindow {}

export const ChatWindow: React.FC<IChatWindow> = () => {
  return (
    <Grid columns={2} direction='row' style={{ height: '100%', width: '100%', padding: '1%', gap: '1%', display: 'flex' }} >
      <HistoryWindow />
      <Container style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', gap: '1%' }} disableGutters maxWidth={false} >
        <MessagesWindow />
        <MessageInput />
      </Container>
    </Grid>
  );
};
