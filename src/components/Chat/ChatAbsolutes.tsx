import BugReportIcon from '@mui/icons-material/BugReport';
import CloseIcon from '@mui/icons-material/Close';
import {
  Alert,
  AlertProps,
  Container,
  IconButton,
  Link,
  LinkProps,
  Snackbar,
} from '@mui/material';
import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';
import { useErrorStore } from '../../_state/Error/errorStore';
import { useMediaQueryStore } from '../../_state/Page/mediaQueryStore';
import styles from './_styles/chatStyles.module.css';

interface IChatAbsolutes {}

const handleErrorClose = (changeErrorSnackbarOpen: (boolean: boolean) => void, reason?: string) => {
  if (reason === 'clickaway') {
    return;
  }

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
  href: 'https://docs.google.com/forms/d/e/1FAIpQLSdeYGmzArgg5yrtOgAGf9bDxvIHQIpZ_EfeEluEPOQVy-jfzg/viewform?usp=sf_link#'
}
// #endregion

export const ChatAbsolutes: React.FC<IChatAbsolutes> = () => {
  const { errorSnackbarOpen, error, changeErrorSnackbarOpen } = useErrorStore();
  const { frameSize } = useMediaQueryStore();

  return(
    <>
      <Snackbar open={errorSnackbarOpen} autoHideDuration={6000} onClose={(_, reason) => handleErrorClose(changeErrorSnackbarOpen, reason)}>
        <Alert {...alertProps}>
            <Container id={styles.errorContainer}>
            <span>
              An error has occured ID: {error.errorId}{error.errorCode}. Please grab the id and report it <a {...alertLinkProps} href={`${alertLinkProps.href}${error.errorId}${error.errorCode}`}>here</a>
            </span>
            <IconButton id={styles.closeIcon} onClick={() => handleErrorClose(changeErrorSnackbarOpen)}>
              <CloseIcon />
            </IconButton>
          </Container>
        </Alert>
      </Snackbar>
      {frameSize === 'desktop'?
      <Container id={styles.bugReportContainer}>
        <Link id={styles.bugReportLink} {...bugLinkProps} href={`${bugLinkProps.href}${error.errorId}${error.errorCode}`}>
          <BugReportIcon id={styles.bugReportIcon} />
        </Link>
      </Container>: null}
    </>
  )
};