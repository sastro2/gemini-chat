import { Container } from '@mui/material';
import { LoginButton } from '../../Session/LoginButton';

interface IDrawerContentLogin {}

export const DrawerContentLogin: React.FC<IDrawerContentLogin> = () => {
  // quick inline styles for deploy change later
  return (
    <Container style={{display: 'flex', justifyContent: 'end', margin: 0, paddingTop: '15px'}} maxWidth={false} disableGutters>
      <Container style={{width: 'auto', margin: 0}} disableGutters>
        <LoginButton />
      </Container>
    </Container>
  )
}