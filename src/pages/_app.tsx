import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '../global.css';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  // Additional context providers, layouts, or other setup can be added here
  return <Component {...pageProps} />;
}

export default MyApp;