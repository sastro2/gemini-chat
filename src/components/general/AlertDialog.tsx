import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useErrorStore } from '../../_state/InputResponse/errorStore';

interface IAlertDialog {
}

export const AlertDialog: React.FC<IAlertDialog> = () => {
  const { alertDialogOpen, alertDialog, changeAlertDialogOpen } = useErrorStore();
  const { title, content, confirm, disagreeBtnText, agreeBtnText } = alertDialog;

  return(
    <Dialog
        open={alertDialogOpen}
        onClose={() => changeAlertDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      <DialogTitle id="alert-dialog-title">
          {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={() => changeAlertDialogOpen(false)}>
          {disagreeBtnText}
        </Button>
        <Button color='error' variant='contained' onClick={() => [changeAlertDialogOpen(false), confirm? confirm(): null]} autoFocus>
          {agreeBtnText}
        </Button>
      </DialogActions>
    </Dialog>
  )
};