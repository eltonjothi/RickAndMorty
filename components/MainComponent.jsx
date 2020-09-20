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
  const { data: charactersData, isValidating } = useSWR(charactersAPI);
  const charactersDataResults = get(charactersData, 'results', []);
  const totalPages = get(charactersData, 'info.pages', 0);
  if (isValidating || charactersData === undefined) {
    return (
      <div className={css(tw`flex justify-center mt-4`)}>
        <Spinner />
      </div>
    );
  }
  return (
    <>
      <div className={css(tw`container mx-auto mt-4`)}>
        <div className={css(tw`flex flex-wrap `)}>
          {Array.isArray(charactersDataResults) &&
            charactersDataResults.map(data => {
              const name = get(data, 'name', '');
              const image = get(data, 'image', '');
              const species = get(data, 'species', '');
              const originAPI = get(data, 'origin.url', '');
              const episodes = get(data, 'episode', []);
              return (
                <Card
                  key={data.id}
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
