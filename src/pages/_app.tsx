import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '../global.css';
import { useMediaQuery } from '@mui/material';
import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useMediaQueryStore } from '../_state/Page/mediaQueryStore';
import { AppAbsolutes } from '../components/general/AppAbsolutes';

function MyApp({ Component, pageProps }: AppProps) {
  const { changeFrameSize } = useMediaQueryStore();

  const desktopSizeBoolean = useMediaQuery('(min-width: 850px)' );
  const tabletSizeBoolean = useMediaQuery('(min-width: 400px) and (max-width: 849px)');

  useEffect(() => {
    if(desktopSizeBoolean) changeFrameSize('desktop');
    if(tabletSizeBoolean) changeFrameSize('tablet');
    if(!desktopSizeBoolean && !tabletSizeBoolean) changeFrameSize('mobile');

  }, [desktopSizeBoolean, tabletSizeBoolean, changeFrameSize])

  return (
    <>
      <Component {...pageProps} />
      <AppAbsolutes />
    </>
  );
}

export default MyApp;