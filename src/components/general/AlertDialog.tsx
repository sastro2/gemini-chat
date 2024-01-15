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
  const { title, content, confirm, changeState, disagreeBtnText, agreeBtnText, fontSize } = alertDialog;

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
        <DialogContentText id="alert-dialog-description" fontSize={fontSize? fontSize: ''}>
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={() => changeAlertDialogOpen(false)}>
          {disagreeBtnText}
        </Button>
        <Button color='error' variant='contained' onClick={() => [changeAlertDialogOpen(false), confirm? confirm(): null, changeState? changeState(): null]} autoFocus>
          {agreeBtnText}
        </Button>
      </DialogActions>
    </Dialog>
  )
};