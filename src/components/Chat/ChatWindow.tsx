import { Container, Grid } from '@mui/material';
import { StyleSheet } from '../../styleSheet';
import { LoginButton } from '../Session/LoginButton';
import { LoginDialog } from '../Session/LoginDialog';
import { HistoryWindow } from './history/HistoryWindow';
import { MessageInput } from './messages/components/MessageInput';
import { MessagesWindow } from './messages/MessagesWindow';

interface IChatWindow {}

export const ChatWindow: React.FC<IChatWindow> = () => {
  return (
    <Grid columns={2} style={{ height: '100vh', width: '100vw', padding: '3% 1.5% 1.5% 1.5%', gap: '1%', display: 'flex', backgroundColor: StyleSheet.background.base }} >
      <HistoryWindow />
      <Container style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', gap: '1%' }} disableGutters maxWidth={false} >
        <Container style={{display: 'flex', justifyContent: 'end', width: '100%', margin: 0,  padding: 0}} maxWidth={false}>
          <LoginDialog />
          <LoginButton />
        </Container>
        <MessagesWindow />
        <MessageInput />
      </Container>
    </Grid>
  );
};
