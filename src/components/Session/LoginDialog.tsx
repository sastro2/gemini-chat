/* eslint-disable @typescript-eslint/no-misused-promises */
import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useHistoryStore } from '../../_state/Chat/historyWindow/historyStore';
import { useMessagesStore } from '../../_state/Chat/messageWindow/messagesStore';
import { useErrorStore } from '../../_state/Error/errorStore';
import { useLoginStore } from '../../_state/Session/loginStore';
import { LoginData } from '../../methods/_Bundles/login/LoginData';
import { LoginMethods } from '../../methods/_Bundles/login/LoginMethods';
import { login } from '../../methods/login/login';

export const LoginDialog = () => {
  const {loginDialogOpen, passwordInput, usernameInput, changeLoginDialogOpen, changePasswordInput, changeUsernameInput, changeLoggedIn} = useLoginStore();
  const {changeCurrentMessageHistory} = useMessagesStore();
  const {changeHistories, clearHistories} = useHistoryStore();
  const { changeError, changeErrorSnackbarOpen } = useErrorStore();

  const loginData: LoginData = {usernameInput, passwordInput};
  const loginMethods: LoginMethods = {changeLoggedIn, changeLoginDialogOpen, changeCurrentMessageHistory, changeHistories, clearHistories, changeError, changeErrorSnackbarOpen};

  return (
      <Dialog open={loginDialogOpen} onClose={() => changeLoginDialogOpen(false)}>
        <DialogTitle>
            Login
        </DialogTitle>
        <DialogContent>
          <Container style={{display: 'flex', flexDirection: 'column', gap: 2}}>
            <TextField onChange={(e) => [changeUsernameInput(e.currentTarget.value)]} autoFocus placeholder='Username' />
            <TextField onChange={(e) => [changePasswordInput(e.currentTarget.value)]} placeholder='Password' type='password' onKeyDown={async(e) => {e.code === 'Enter'? await login(loginData, loginMethods): null}} />
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={async() => [await login(loginData, loginMethods)]}>Sign In</Button>
        </DialogActions>
      </Dialog>
  );
};