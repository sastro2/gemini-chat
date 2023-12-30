import { Button, ButtonOwnProps } from '@mui/material';
import { useLoginStore } from '../../_state/Session/loginStore';

interface ILoginButton {}

const buttonProps: ButtonOwnProps = {
  variant: "contained",
  color: "primary",
  size: 'small',
  sx: {backgroundColor: '#363538', ':hover': {opacity: '90%', backgroundColor: '#363538'}}
}

export const LoginButton: React.FC<ILoginButton> = () => {
  const {loggedIn, changeLoginDialogOpen} = useLoginStore();

  if(loggedIn) return null;

  return (
    <Button {...buttonProps} onClick={() => changeLoginDialogOpen(true)}>
      Login
    </Button>
  );
}