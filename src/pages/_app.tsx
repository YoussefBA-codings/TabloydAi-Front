// Types Import
import type { AppProps } from 'next/app';

// CSS Imports
import '@SRC/styles/globals.scss';

export default function TablifyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
