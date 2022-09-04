import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
