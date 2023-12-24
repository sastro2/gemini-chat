import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useLoginStore } from '../../_state/Session/loginStore';

const login = async(usernameInput: string, passwordInput: string, changeLoggedIn: (loggedIn: boolean) => void): Promise<undefined>=> {
  if(!usernameInput || !passwordInput) return;

  const res = await fetch('http://localhost:3000/api/endpoints/auth/authenticateUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      usernameInput: usernameInput,
      passwordInput: passwordInput
    })
  });

  const parsedRes = await res.json();

  changeLoggedIn(parsedRes.auth);

  return;
};

export const LoginDialog = () => {
  const {loginDialogOpen, passwordInput, usernameInput, changeLoginDialogOpen, changePasswordInput, changeUsernameInput, changeLoggedIn} = useLoginStore();

  return (
      <Dialog open={loginDialogOpen} onClose={() => changeLoginDialogOpen(false)}>
        <DialogTitle>
            Login
        </DialogTitle>
        <DialogContent>
          <Container style={{display: 'flex', flexDirection: 'column', gap: 2}}>
            <TextField onChange={(e) => [changeUsernameInput(e.currentTarget.value)]} autoFocus placeholder='Username' />
            <TextField onChange={(e) => [changePasswordInput(e.currentTarget.value)]} placeholder='Password' type='password' />
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={async() => [await login(usernameInput, passwordInput, changeLoggedIn), changeLoginDialogOpen(false)]}>Sign In</Button>
        </DialogActions>
      </Dialog>
  );
};