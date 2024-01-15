import MenuIcon from '@mui/icons-material/Menu';
import { Container, IconButton, IconButtonProps } from '@mui/material';
import { useMediaQueryStore } from '../../_state/Page/mediaQueryStore';
import { usePageStore } from '../../_state/Page/pageStore';
import styles from '../Chat/_styles/chatStyles.module.css';
import { LoginButton } from '../Session/LoginButton';
import { LoginDialog } from '../Session/LoginDialog';
import { NavDrawer } from './components/NavDrawer';

interface IHeader {}

const iconButtonProps: IconButtonProps = {
  size: "large",
  edge: "start",
  color: "inherit",
  'aria-label': "menu",
  sx: { ml: 1 },
}

export const Header: React.FC<IHeader> = () => {
  const { frameSize } = useMediaQueryStore();
  const { changeDrawerOpen } = usePageStore();

  return (
    // move login styles to genStyles at some point
    <Container id={frameSize === 'desktop'? styles.loginDialogContainer: styles.loginDialogContainerTablet} maxWidth={false} disableGutters>
      <LoginDialog />
      <LoginButton />
      <IconButton {...iconButtonProps} onClick={() => changeDrawerOpen(true)}>
        <MenuIcon />
      </IconButton>
      <NavDrawer />
    </Container>
  );
};