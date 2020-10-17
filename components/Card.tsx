import React from 'react';
import { css } from '@emotion/css';
import get from 'lodash.get';
import useSWR from 'swr';
import tw from '@tailwindcssinjs/macro';
import Episode from './Episode';

interface Props {
  name: string,
  image: string,
  species: string,
  originAPI: string,
  episodes: Array<number|string>,
}

const Card: React.FC<Props> = ({ name, image, species, originAPI, episodes }) => {
  const { data: originData } = useSWR(originAPI);
  const originName = get(originData, 'name', '');
  const originDimension = get(originData, 'dimension', '');
  const originResidents = get(originData, 'residents', []);
  return (
    <>
      <div
        className={css(tw`w-full sm:w-full  md:w-full lg:w-1/2 mb-4  px-2 `)}
      >
        <div className={css(tw`bg-cool-gray-100 shadow rounded p-6 h-full`)}>
          <div className={css(tw`md:flex `)}>
            <img
              // className="bg-cover w-12"
              loading="lazy"
              className={css(
                tw`h-24 w-24 md:h-32 md:w-32 rounded mx-auto md:mx-0 md:mr-6`,
              )}
              width="10rem"
              src={image}
              alt={name}
            />
            <div className={css(tw`text-center md:text-left`)}>
              <h2 className={css(tw`text-gray-800 font-bold text-xl mb-1`)}>
                {name}
              </h2>
              {species && (
                <p className={css(tw`text-gray-700 text-base`)}>
                  {`Species: ${species}`}
                </p>
              )}
              {originName && (
                <p
                  className={css(tw`text-gray-700 text-base`)}
                  data-testid="origin"
                >
                  {`Origin: ${originName}`}
                </p>
              )}
              {originDimension && (
                <p className={css(tw`text-gray-700 text-base`)}>
                  {`Dimension: ${originDimension}`}
                </p>
              )}
              {originResidents.length > 0 && (
                <p className={css(tw`text-gray-700 text-base`)}>
                  {`No of residents: ${originResidents.length}`}
                </p>
              )}
            </div>
          </div>
          <div className={css(tw`md:flex bg-cool-gray-200 rounded p-2 mt-6`)}>
            <div className={css(tw`text-center md:text-left`)}>
              <p className={css(tw`text-gray-800 font-bold text-sm mb-1`)}>
                Featured in
              </p>
              <div>
                {Array.isArray(episodes) &&
                  episodes.map((data, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Episode url={data} key={index} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
