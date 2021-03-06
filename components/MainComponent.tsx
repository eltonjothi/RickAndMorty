import React from 'react';
import { css } from '@emotion/css';
import get from 'lodash.get';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import tw from '@tailwindcssinjs/macro';
import Card from './Card';
import Spinner from './Spinner';
import Pagination from './Pagination';

const MainComponent = () => {
  const router = useRouter();
  const { page = 1 } = router.query;
  const currentPage = Number(page);
  const charactersAPI = `https://rickandmortyapi.com/api/character/?page=${currentPage}`;
  const { data: charactersData, error, isValidating } = useSWR(charactersAPI);
  const charactersDataResults: Array<string | number> = get(
    charactersData,
    'results',
    [],
  );
  const totalPages: number = get(charactersData, 'info.pages', 0);
  if (isValidating || charactersData === undefined) {
    return (
      <div className={css(tw`flex justify-center mt-4`)}>
        <Spinner />
      </div>
    );
  }
  if (error) {
    return (
      <div className={css(tw`flex justify-center mt-4`)}>
        <p>Failed to load</p>
      </div>
    );
  }
  return (
    <>
      <div className={css(tw`container mx-auto mt-4`)}>
        <div className={css(tw`flex flex-wrap `)}>
          {Array.isArray(charactersDataResults) &&
            charactersDataResults.map(data => {
              const id = get(data, 'id', '');
              const name: string = get(data, 'name', '');
              const image: string = get(data, 'image', '');
              const species: string = get(data, 'species', '');
              const originAPI: string = get(data, 'origin.url', '');
              const episodes: Array<string | number> = get(data, 'episode', []);
              return (
                <Card
                  key={id}
                  name={name}
                  image={image}
                  species={species}
                  originAPI={originAPI}
                  episodes={episodes}
                />
              );
            })}
        </div>
      </div>
      <div className={css(tw`flex justify-items-center mt-5 mb-20`)}>
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    </>
  );
};

export default MainComponent;
