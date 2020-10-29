import React from 'react';
import { css } from '@emotion/css';
import get from 'lodash.get';
import useSWR from 'swr';
import tw from '@tailwindcssinjs/macro';

type Props = {
  url: string;
};

const Episode = ({ url }: Props) => {
  const { data: episodeData } = useSWR(url);
  const episodeName = get(episodeData, 'name', '');
  return (
    <>
      <span
        className={css(
          tw`text-xs bg-white text-gray-800  py-1 px-1 rounded mr-1 mb-1 inline-block`,
        )}
        data-testid="episode-name"
      >
        {episodeName}
      </span>
    </>
  );
};

export default Episode;
