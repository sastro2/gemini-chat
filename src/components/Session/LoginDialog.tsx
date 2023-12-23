import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useLoginStore } from '../../_state/Session/loginStore';

export const LoginDialog = () => {
  const {loginDialogOpen, changeLoginDialogOpen} = useLoginStore();

  return (
      <Dialog open={loginDialogOpen} onClose={() => changeLoginDialogOpen(false)}>
        <DialogTitle>
            Login
        </DialogTitle>
        <DialogContent>
          <Container style={{display: 'flex', flexDirection: 'column', gap: 2}}>
            <TextField autoFocus placeholder='Username' />
            <TextField placeholder='Password' type='password' />
          </Container>
        </DialogContent>
        <DialogActions>
          <Button>Sign In</Button>
        </DialogActions>
      </Dialog>
  );
}