import { Button } from '@mui/material';
import { useLoginStore } from '../../_state/Session/loginStore';

interface ILoginButton {

}

export const LoginButton: React.FC<ILoginButton> = () => {
  const {changeLoginDialogOpen} = useLoginStore();

  return (
    <Button variant="contained" color="primary" onClick={() => changeLoginDialogOpen(true)}>
      Login
    </Button>
  );
}