import { Button, Container } from '@mui/material';
import { useMediaQueryStore } from '../../../_state/Page/mediaQueryStore';
import { usePageStore } from '../../../_state/Page/pageStore';
import { HistoriesList } from '../../Chat/history/components/historiesList';
import { NewChatButton } from '../../Chat/history/components/NewChatButton';
import genStyles from '../_styles/generalStyles.module.css';

interface IDrawerContent {}

export const DrawerContentChat: React.FC<IDrawerContent> = () => {
  const { frameSize } = useMediaQueryStore();
  const { changeDrawerOpen } = usePageStore();

  if(frameSize !== 'desktop'){
    return(
      <Container style={{height: "100%"}} disableGutters>
        <Container id={genStyles.newChatButtonContainerMobile} onClick={() => changeDrawerOpen(false)} disableGutters>
          <NewChatButton />
        </Container>
        <HistoriesList />
      </Container>
    )
  }

  return (
    <Container style={{height: "100%"}} id={genStyles.profileButton} disableGutters>
      <Button variant='contained' color='inherit' sx={{backgroundColor: '#232326', width: '100%', ':hover': {opacity: '90%', backgroundColor: 'inherit'}}} onClick={() => window.location.href = './profile'}>Profile</Button>
    </Container>
  );
};