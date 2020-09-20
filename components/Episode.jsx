import React from 'react';
import { css } from '@emotion/css';
import get from 'lodash.get';
import useSWR from 'swr';
import tw from '@tailwindcssinjs/macro';

const fetcher = (url) => fetch(url).then((r) => r.json());

const Episode = ({ url }) => {
  const { data: episodeData, isValidating } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 300000,
  });
  const episodeName = get(episodeData, 'name', '');
  const episode = get(episodeData, 'episode', '');

  return (
    <>
      {!isValidating && (
        <span
          className={css(
            tw`text-xs bg-white text-gray-800  py-1 px-1 rounded mr-1 mb-1 inline-block`,
          )}
        >
          {episodeName}
        </span>
      )}
    </>
  );
};

export default Episode;
