import CloseIcon from '@mui/icons-material/Close';
import {
  Alert,
  AlertProps,
  Container,
  IconButton,
  Snackbar,
} from '@mui/material';
import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';
import { useErrorStore } from '../../_state/InputResponse/errorStore';
import styles from './_styles/generalStyles.module.css';

interface IErrorSnackbar {}

const handleErrorClose = (changeErrorSnackbarOpen: (boolean: boolean) => void, reason?: string) => {
  if (reason === 'clickaway') {
    return;
  }

  changeErrorSnackbarOpen(false);
};

const alertProps: AlertProps = {
  variant: 'filled',
  severity: 'error',
};

const alertLinkProps: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> = {
  target: '_blank',
  href: `https://docs.google.com/forms/d/e/1FAIpQLSdeYGmzArgg5yrtOgAGf9bDxvIHQIpZ_EfeEluEPOQVy-jfzg/viewform#`,
}

export const ErrorSnackbar: React.FC<IErrorSnackbar> = () => {
  const { errorSnackbarOpen, error, changeErrorSnackbarOpen } = useErrorStore();

  return(
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
  )
}