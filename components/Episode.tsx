import React from 'react';
import { css } from '@emotion/css';
import get from 'lodash.get';
import tw from '@tailwindcssinjs/macro';

type Props = {
  data: Object;
};

const Episode = ({ data }: Props) => {
  const episodeName = get(data, 'name', '');
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
