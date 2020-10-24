/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import Head from 'next/head';
import '../styles/base.css';

const MyApp = ({ Component, pageProps }: AppProps) =>{
  return (
    <>
      <SWRConfig
        value={{
          fetcher: (...args) => fetch(...args).then((res) => res.json()),
          revalidateOnFocus: false,
          dedupingInterval: 300000,
        }}
      >
        <Head>
          <link rel="icon" type="image/x-icon" href="/favicon.png" />
          <title>The Rick and Morty API</title>
        </Head>
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}

export default MyApp