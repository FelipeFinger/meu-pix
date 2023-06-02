import '@/styles/global.css';
import { MantineProvider } from '@mantine/core';
import { AppProps } from 'next/app';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Meu Pix</title>
        <meta name="theme-color" content="#141414" />
      </Head>
      <MantineProvider>
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
