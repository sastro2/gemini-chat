import { Alert, Container, Grid, Snackbar } from '@mui/material';
import { useErrorStore } from '../../_state/Error/errorStore';
import { StyleSheet } from '../../styleSheet';
import { LoginButton } from '../Session/LoginButton';
import { LoginDialog } from '../Session/LoginDialog';
import { HistoryWindow } from './history/HistoryWindow';
import { MessageInput } from './messages/MessageInput';
import { MessagesWindow } from './messages/MessagesWindow';

interface IChatWindow {}

const handleClose = (changeErrorSnackbarOpen: (boolean: boolean) => void, changeErrorCode: (code: number) => void, changeErrorId: (id: number) => void, event?: React.SyntheticEvent | Event, reason?: string) => {
  if (reason === 'clickaway') {
    return;
  }

  changeErrorCode(0);
  changeErrorId(0);
  changeErrorSnackbarOpen(false);
};

export const ChatWindow: React.FC<IChatWindow> = () => {
  const { errorSnackbarOpen, changeErrorSnackbarOpen, changeErrorCode, changeErrorId } = useErrorStore();

  return (
    <Grid columns={2} style={{ height: '100vh', width: '100vw', padding: '1.5% 1.5% 1.5% 1.5%', display: 'flex', backgroundColor: StyleSheet.background.base }} >
      <HistoryWindow />
      <Container style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', gap: '1%' }} disableGutters maxWidth={false} >
        <Container style={{display: 'flex', justifyContent: 'end', width: '100%', margin: 0,  padding: 0}} maxWidth={false}>
          <LoginDialog />
          <LoginButton />
        </Container>
        <MessagesWindow />
        <MessageInput />
        <Snackbar open={errorSnackbarOpen} onClose={(event, reason) => handleClose(changeErrorSnackbarOpen, changeErrorCode, changeErrorId, event, reason)}>
          <Alert severity='error'>This is an error message!</Alert>
        </Snackbar>
      </Container>
    </Grid>
  );
};
