import { Button } from '@mui/material';
import { useLoginStore } from '../../_state/Session/loginStore';

interface ILoginButton {

}

export const LoginButton: React.FC<ILoginButton> = () => {
  const {loggedIn, changeLoginDialogOpen} = useLoginStore();

  if(loggedIn) return null;

  return (
    <Button variant="contained" color="primary" onClick={() => changeLoginDialogOpen(true)}>
      Login
    </Button>
  );
}