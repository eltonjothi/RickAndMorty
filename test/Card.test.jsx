import React from 'react';
import 'whatwg-fetch';
import { SWRConfig, cache } from 'swr';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Card from '../components/Card';
import { server } from './server';

afterEach(() => cache.clear());
// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
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
