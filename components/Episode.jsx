import React from 'react';
import { css } from '@emotion/css';
import get from 'lodash.get';
import useSWR from 'swr';
import PropTypes from 'prop-types';
import tw from '@tailwindcssinjs/macro';

const Episode = ({ url }) => {
  const { data: episodeData, isValidating } = useSWR(url);
  const episodeName = get(episodeData, 'name', '');

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

Episode.defaultProps = {
  url: '',
};

Episode.propTypes = {
  url: PropTypes.string,
};

export default Episode;
