import { AppProps } from 'next/app';

import { GlobalContextProvider } from '@/contexts/GlobalContext';

import '../styles/global.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <GlobalContextProvider>
    <Component {...pageProps} />
  </GlobalContextProvider>
);

export default MyApp;
