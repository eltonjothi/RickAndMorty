/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { SWRConfig } from 'swr';
import Head from 'next/head';
import '../styles/base.css';

export default function MyApp({ Component, pageProps }) {
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
          <title>The Rick and Morty API</title>
        </Head>
        <Component {...pageProps} />
      </SWRConfig>
    </>
  );
}
