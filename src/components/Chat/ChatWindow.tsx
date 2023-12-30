import BugReportIcon from '@mui/icons-material/BugReport';
import CloseIcon from '@mui/icons-material/Close';
import {
  Alert,
  AlertProps,
  Container,
  Grid,
  IconButton,
  Link,
  LinkProps,
  Snackbar,
} from '@mui/material';
import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';
import { defaultError, useErrorStore } from '../../_state/Error/errorStore';
import { Error } from '../../_types/Error';
import { LoginButton } from '../Session/LoginButton';
import { LoginDialog } from '../Session/LoginDialog';
import styles from './_styles/chatStyles.module.css';
import { HistoryWindow } from './history/HistoryWindow';
import { MessageInput } from './messages/MessageInput';
import { MessagesWindow } from './messages/MessagesWindow';

interface IChatWindow {}

const handleErrorClose = (changeErrorSnackbarOpen: (boolean: boolean) => void, changeError: (error: Error) => void, event?: React.SyntheticEvent | Event, reason?: string) => {
  if (reason === 'clickaway') {
    return;
  }

  changeError(defaultError);
  changeErrorSnackbarOpen(false);
};

// #region Props
const alertProps: AlertProps = {
  variant: 'filled',
  severity: 'error',
};
const alertLinkProps: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> = {
  target: '_blank',
  href: `https://docs.google.com/forms/d/e/1FAIpQLSdeYGmzArgg5yrtOgAGf9bDxvIHQIpZ_EfeEluEPOQVy-jfzg/viewform#`,
}
const bugLinkProps: LinkProps = {
  target: '_blank',
  href: 'https://docs.google.com/forms/d/e/1FAIpQLSdeYGmzArgg5yrtOgAGf9bDxvIHQIpZ_EfeEluEPOQVy-jfzg/viewform?usp=sf_link'
}
// #endregion

export const ChatWindow: React.FC<IChatWindow> = () => {
  const { errorSnackbarOpen, error, changeErrorSnackbarOpen, changeError } = useErrorStore();

  return (
    <Grid id={styles.grid} columns={2} >
      <HistoryWindow />
      <Container id={styles.chatWindow} disableGutters maxWidth={false} >
        <Container id={styles.loginDialogContainer} maxWidth={false} disableGutters>
          <LoginDialog />
          <LoginButton />
        </Container>
        <MessagesWindow />
        <MessageInput />
        <Snackbar open={errorSnackbarOpen} autoHideDuration={6000} onClose={(event, reason) => handleErrorClose(changeErrorSnackbarOpen, changeError, event, reason)}>
          <Alert {...alertProps}>
            <Container id={styles.errorContainer}>
              <span>
                An error has occured ID: {error.errorId}{error.errorCode}. Please grab the id and report it <a {...alertLinkProps} href={`${alertLinkProps.href}${error.errorId}${error.errorCode}`}>here</a>
              </span>
              <IconButton id={styles.closeIcon} onClick={() => handleErrorClose(changeErrorSnackbarOpen, changeError)}>
                <CloseIcon />
              </IconButton>
            </Container>
          </Alert>
        </Snackbar>
         <Container id={styles.bugReportContainer}>
          <Link id={styles.bugReportLink} {...bugLinkProps}>
            <BugReportIcon id={styles.bugReportIcon} />
          </Link>
        </Container>
      </Container>
    </Grid>
  );
};