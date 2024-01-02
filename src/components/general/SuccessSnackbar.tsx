import CloseIcon from '@mui/icons-material/Close';
import {
  Alert,
  AlertProps,
  Container,
  IconButton,
  Snackbar,
} from '@mui/material';
import { useSuccessStore } from '../../_state/InputResponse/successStore';
import styles from './_styles/generalStyles.module.css';

interface ISuccessSnackbar {}

const handleSuccessSnackbarClose = (changeSuccessSnackbarOpen: (boolean: boolean) => void, reason?: string) => {
  if (reason === 'clickaway') {
    return;
  }

  changeSuccessSnackbarOpen(false);
}

const alertProps: AlertProps = {
  variant: 'filled',
  severity: 'success',
};

export const SuccessSnackbar: React.FC<ISuccessSnackbar> = () => {
  const { successSnackbarOpen, successMessage: message, changeSuccessSnackbarOpen } = useSuccessStore();

  return(
    <Snackbar open={successSnackbarOpen} autoHideDuration={6000} onClose={(_, reason) => handleSuccessSnackbarClose(changeSuccessSnackbarOpen, reason)}>
        <Alert {...alertProps}>
            <Container id={styles.successContainer}>
              {message}
            <IconButton id={styles.successCloseIcon} onClick={() => handleSuccessSnackbarClose(changeSuccessSnackbarOpen)}>
              <CloseIcon />
            </IconButton>
          </Container>
        </Alert>
      </Snackbar>
  )
};