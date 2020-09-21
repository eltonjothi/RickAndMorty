import React from 'react';
import 'whatwg-fetch';
import { SWRConfig, cache } from 'swr';
import {
  render,
  fireEvent,
  waitFor,
  screen,
  waitForDomChange,
} from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom/extend-expect';
import Card from '../components/Card';

const server = setupServer(
  rest.get('https://rickandmortyapi.com/api/location/1', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        name: 'Earth (C-137)',
        type: 'Planet',
        dimension: 'Dimension C-137',
        residents: [
          'https://rickandmortyapi.com/api/character/38',
          'https://rickandmortyapi.com/api/character/45',
          'https://rickandmortyapi.com/api/character/71',
          'https://rickandmortyapi.com/api/character/82',
          'https://rickandmortyapi.com/api/character/83',
          'https://rickandmortyapi.com/api/character/92',
          'https://rickandmortyapi.com/api/character/112',
          'https://rickandmortyapi.com/api/character/114',
          'https://rickandmortyapi.com/api/character/116',
          'https://rickandmortyapi.com/api/character/117',
          'https://rickandmortyapi.com/api/character/120',
          'https://rickandmortyapi.com/api/character/127',
          'https://rickandmortyapi.com/api/character/155',
          'https://rickandmortyapi.com/api/character/169',
          'https://rickandmortyapi.com/api/character/175',
          'https://rickandmortyapi.com/api/character/179',
          'https://rickandmortyapi.com/api/character/186',
          'https://rickandmortyapi.com/api/character/201',
          'https://rickandmortyapi.com/api/character/216',
          'https://rickandmortyapi.com/api/character/239',
          'https://rickandmortyapi.com/api/character/271',
          'https://rickandmortyapi.com/api/character/302',
          'https://rickandmortyapi.com/api/character/303',
          'https://rickandmortyapi.com/api/character/338',
          'https://rickandmortyapi.com/api/character/343',
          'https://rickandmortyapi.com/api/character/356',
          'https://rickandmortyapi.com/api/character/394',
        ],
        url: 'https://rickandmortyapi.com/api/location/1',
        created: '2017-11-10T12:42:04.162Z',
      }),
    );
  }),
  rest.get('https://rickandmortyapi.com/api/episode/1', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        name: 'Pilot',
        air_date: 'December 2, 2013',
        episode: 'S01E01',
        characters: [
          'https://rickandmortyapi.com/api/character/1',
          'https://rickandmortyapi.com/api/character/2',
          'https://rickandmortyapi.com/api/character/35',
          'https://rickandmortyapi.com/api/character/38',
          'https://rickandmortyapi.com/api/character/62',
          'https://rickandmortyapi.com/api/character/92',
          'https://rickandmortyapi.com/api/character/127',
          'https://rickandmortyapi.com/api/character/144',
          'https://rickandmortyapi.com/api/character/158',
          'https://rickandmortyapi.com/api/character/175',
          'https://rickandmortyapi.com/api/character/179',
          'https://rickandmortyapi.com/api/character/181',
          'https://rickandmortyapi.com/api/character/239',
          'https://rickandmortyapi.com/api/character/249',
          'https://rickandmortyapi.com/api/character/271',
          'https://rickandmortyapi.com/api/character/338',
          'https://rickandmortyapi.com/api/character/394',
          'https://rickandmortyapi.com/api/character/395',
          'https://rickandmortyapi.com/api/character/435',
        ],
        url: 'https://rickandmortyapi.com/api/episode/1',
        created: '2017-11-10T12:56:33.798Z',
      }),
    );
  }),
  rest.get('*', (req, res, ctx) => {
    console.error(`Please add request handler for ${req.url.toString()}`);
    return res(
      ctx.status(500),
      ctx.json({ error: 'You must add request handler.' }),
    );
  }),
);
afterEach(() => cache.clear());
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Card', () => {
  let expectedProps;
  beforeEach(() => {
    expectedProps = {
      name: 'Rick Sanchez',
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      species: 'Human',
      originAPI: 'https://rickandmortyapi.com/api/location/1',
      episodes: ['https://rickandmortyapi.com/api/episode/1'],
    };
  });

  test('Render name, address, and image', () => {
    const { getByText, getByAltText } = render(<Card {...expectedProps} />);
    const name = getByText(expectedProps.name);
    const species = getByText(`Species: ${expectedProps.species}`);
    const image = getByAltText(expectedProps.name);
    expect(name).toBeVisible();
    expect(species).toBeVisible();
    expect(image).toBeVisible();
  });

  test('Handles Origin API', async () => {
    const { getByText, getByAltText, findByText } = render(
      <SWRConfig
        value={{
          fetcher: (...args) => fetch(...args).then(res => res.json()),
          // revalidateOnFocus: false,
          dedupingInterval: 0,
        }}
      >
        <Card {...expectedProps} />
      </SWRConfig>,
    );
    // const ee = await findByText('Origin: Earth (C-137)');
    // expect(ee).toBeInTheDocument;

    await waitFor(() => screen.getByTestId('origin'));
    const origin = getByText(`Origin: Earth (C-137)`);
    expect(origin).toBeVisible();
  });

  test('Handles Episode API', async () => {
    const { getByText, getByAltText, findByText } = render(
      <SWRConfig
        value={{
          fetcher: (...args) => fetch(...args).then(res => res.json()),
          // revalidateOnFocus: false,
          dedupingInterval: 0,
        }}
      >
        <Card {...expectedProps} />
      </SWRConfig>,
    );
    await waitFor(() => screen.getByTestId('episode-name'));
    const episodeName = getByText(`Pilot`);
    expect(episodeName).toBeVisible();
  });
});
