import { Container, SwipeableDrawer } from '@mui/material';
import SimpleBar from 'simplebar-react';
import { useMediaQueryStore } from '../../../_state/Page/mediaQueryStore';
import { usePageStore } from '../../../_state/Page/pageStore';
import { useLoginStore } from '../../../_state/Session/loginStore';
import genStyles from '../_styles/generalStyles.module.css';
import { DrawerContentChat } from './DrawerContentChat';
import { DrawerContentLogin } from './DrawerContentLogin';

interface INavDrawer {}

export const NavDrawer: React.FC<INavDrawer> = () => {
  const { frameSize } = useMediaQueryStore();
  const { drawerOpen, changeDrawerOpen } = usePageStore();
  const { loggedIn } = useLoginStore();

  return(
    <SwipeableDrawer anchor='right' sx={{zIndex: 0}} swipeAreaWidth={frameSize !== 'desktop'? 15: 0} open={drawerOpen} onClose={() => changeDrawerOpen(false)} onOpen={() => changeDrawerOpen(true)}>
      <Container style={{height: "100vh", backgroundColor: "#1A1A1D"}} disableGutters>
        <SimpleBar id={genStyles.simplebar}>
          <Container id={genStyles.drawerContainer}>
            {loggedIn? <DrawerContentChat />: <DrawerContentLogin />}
          </Container>
        </SimpleBar>
      </Container>
    </SwipeableDrawer>
  )
};