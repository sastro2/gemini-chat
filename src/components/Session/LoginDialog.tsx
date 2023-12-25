import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useLoginStore } from '../../_state/Session/loginStore';
import { LoginData } from '../../methods/_Bundles/login/LoginData';
import { LoginMethods } from '../../methods/_Bundles/login/LoginMethods';
import { login } from '../../methods/login/login';

export const LoginDialog = () => {
  const {loginDialogOpen, passwordInput, usernameInput, changeLoginDialogOpen, changePasswordInput, changeUsernameInput, changeLoggedIn} = useLoginStore();

  const loginData: LoginData = {usernameInput, passwordInput};
  const loginDataMethods: LoginMethods = {changeLoggedIn, changeLoginDialogOpen};

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
          <Button onClick={async() => [await login(loginData, loginDataMethods)]}>Sign In</Button>
        </DialogActions>
      </Dialog>
  );
};