import CloseIcon from '@mui/icons-material/Close';
import { Alert, Container, Grid, IconButton, Snackbar } from '@mui/material';
import { defaultError, useErrorStore } from '../../_state/Error/errorStore';
import { Error } from '../../_types/Error';
import { StyleSheet } from '../../styleSheet';
import { LoginButton } from '../Session/LoginButton';
import { LoginDialog } from '../Session/LoginDialog';
import { HistoryWindow } from './history/HistoryWindow';
import { MessageInput } from './messages/MessageInput';
import { MessagesWindow } from './messages/MessagesWindow';

interface IChatWindow {}

const handleClose = (changeErrorSnackbarOpen: (boolean: boolean) => void, changeError: (error: Error) => void, event?: React.SyntheticEvent | Event, reason?: string) => {
  if (reason === 'clickaway') {
    return;
  }

  changeError(defaultError);
  changeErrorSnackbarOpen(false);
};

export const ChatWindow: React.FC<IChatWindow> = () => {
  const { errorSnackbarOpen, error, changeErrorSnackbarOpen, changeError } = useErrorStore();

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
        <Snackbar open={errorSnackbarOpen} autoHideDuration={6000} onClose={(event, reason) => handleClose(changeErrorSnackbarOpen, changeError, event, reason)}>
          <Alert variant='filled' severity='error'>
            <Container style={{margin: 0, padding: 0, gap: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <span>An error has occured ID: {error.errorId}{error.errorCode}. Please grab the id and report it <a about='_blanc' href={`https://docs.google.com/forms/d/e/1FAIpQLSdeYGmzArgg5yrtOgAGf9bDxvIHQIpZ_EfeEluEPOQVy-jfzg/viewform#${error.errorId}${error.errorCode}`}>here</a></span>
              <IconButton style={{margin: 0, padding: 0}} onClick={() => handleClose(changeErrorSnackbarOpen, changeError)}>
                <CloseIcon />
              </IconButton>
            </Container>
          </Alert>
        </Snackbar>
      </Container>
    </Grid>
  );
};
