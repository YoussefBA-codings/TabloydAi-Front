import { Provider } from 'react-redux';
import { useRouter } from 'next/router';

// Store Imports
import store from '@/store';

// CSS Imports
import '@/styles/globals.scss';

// MUI Imports

// Components Imports
import ResponsiveAppBar from '@/components/Navbar.component';

export default function TablAIdApp({ Component, pageProps }: any) {
  const router = useRouter();
  return (
    <>
      <Provider store={store}>
        <ResponsiveAppBar />
        <Component key={router.asPath} {...pageProps} />
      </Provider>
    </>
  );
}
