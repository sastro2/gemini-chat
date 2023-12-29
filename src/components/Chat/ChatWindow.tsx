import BugReportIcon from '@mui/icons-material/BugReport';
import CloseIcon from '@mui/icons-material/Close';
import {
  Alert,
  Container,
  Grid,
  IconButton,
  Link,
  Snackbar,
} from '@mui/material';
import { defaultError, useErrorStore } from '../../_state/Error/errorStore';
import { Error } from '../../_types/Error';
import { LoginButton } from '../Session/LoginButton';
import { LoginDialog } from '../Session/LoginDialog';
import styles from './_styles/chatStyles.module.css';
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
    <Grid id={styles.grid} columns={2} >
      <HistoryWindow />
      <Container id={styles.chatWindow} disableGutters maxWidth={false} >
        <Container style={{display: 'flex', justifyContent: 'end', width: '100%', margin: 0}} maxWidth={false} disableGutters>
          <LoginDialog />
          <LoginButton />
        </Container>
        <MessagesWindow />
        <MessageInput />
        <Snackbar open={errorSnackbarOpen} autoHideDuration={6000} onClose={(event, reason) => handleClose(changeErrorSnackbarOpen, changeError, event, reason)}>
          <Alert variant='filled' severity='error'>
            <Container id={styles.errorContainer}>
              <span>An error has occured ID: {error.errorId}{error.errorCode}. Please grab the id and report it <a target='_blank' href={`https://docs.google.com/forms/d/e/1FAIpQLSdeYGmzArgg5yrtOgAGf9bDxvIHQIpZ_EfeEluEPOQVy-jfzg/viewform#${error.errorId}${error.errorCode}`}>here</a></span>
              <IconButton id={styles.closeIcon} onClick={() => handleClose(changeErrorSnackbarOpen, changeError)}>
                <CloseIcon />
              </IconButton>
            </Container>
          </Alert>
        </Snackbar>
         <Container id={styles.bugReportContainer}>
          <Link id={styles.bugReportLink} target='_blank' href='https://docs.google.com/forms/d/e/1FAIpQLSdeYGmzArgg5yrtOgAGf9bDxvIHQIpZ_EfeEluEPOQVy-jfzg/viewform?usp=sf_link'>
            <BugReportIcon id={styles.bugReportIcon} />
          </Link>
        </Container>
      </Container>
    </Grid>
  );
};