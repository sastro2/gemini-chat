import MenuIcon from '@mui/icons-material/Menu';
import {
  Container,
  IconButton,
  IconButtonProps,
  SwipeableDrawer,
} from '@mui/material';
import SimpleBar from 'simplebar-react';
import { useMediaQueryStore } from '../../_state/Page/mediaQueryStore';
import { usePageStore } from '../../_state/Page/pageStore';
import { useLoginStore } from '../../_state/Session/loginStore';
import styles from '../Chat/_styles/chatStyles.module.css';
import { HistoriesList } from '../Chat/history/components/historiesList';
import { LoginButton } from '../Session/LoginButton';
import { LoginDialog } from '../Session/LoginDialog';
import genStyles from './_styles/generalStyles.module.css';

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
  const { drawerOpen, changeDrawerOpen } = usePageStore();
  const { loggedIn } = useLoginStore();

  return (
    // move login styles to genStyles at some point
    <Container id={frameSize === 'desktop'? styles.loginDialogContainer: styles.loginDialogContainerTablet} maxWidth={false} disableGutters>
      <LoginDialog />
      <LoginButton />
      <IconButton {...iconButtonProps} onClick={() => changeDrawerOpen(true)}>
        <MenuIcon />
      </IconButton>
        <SwipeableDrawer anchor='right' swipeAreaWidth={frameSize !== 'desktop'? 25: 0} open={drawerOpen} onClose={() => changeDrawerOpen(false)} onOpen={() => changeDrawerOpen(true)}>
          <SimpleBar id={genStyles.simplebar}>
            <Container id={genStyles.drawerContainer}>
              {loggedIn? <DrawerContent />: <DrawerContentLogin />}
            </Container>
          </SimpleBar>
        </SwipeableDrawer>
    </Container>
  );
};

interface IDrawerContent {}

const DrawerContent: React.FC<IDrawerContent> = () => {
  const { frameSize } = useMediaQueryStore();

  if(frameSize !== 'desktop') return <HistoriesList />;

  return null;
};

interface IDrawerContentLogin {}

const DrawerContentLogin: React.FC<IDrawerContentLogin> = () => {
  // quick inline styles for deploy change later
  return (
    <Container style={{display: 'flex', justifyContent: 'end', margin: 0, paddingTop: '15px'}} maxWidth={false} disableGutters>
      <Container style={{width: 'auto', margin: 0}} disableGutters>
        <LoginButton />
      </Container>
    </Container>
  )
};