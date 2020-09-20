import React from 'react';
import {
  render,
  fireEvent,
  waitFor,
  screen,
  waitForDomChange,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Card from '../components/Card';

describe('Card', () => {
  let expectedProps;
  beforeEach(() => {
    expectedProps = {
      name: 'Rick Sanchez',
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      species: 'Human',
      originAPI: 'https://rickandmortyapi.com/api/location/1',
      episodes: [
        'https://rickandmortyapi.com/api/episode/1',
        'https://rickandmortyapi.com/api/episode/2',
      ],
    };
  });

  test('should render name, address, and image', () => {
    const { getByText, getByAltText } = render(<Card {...expectedProps} />);
    const name = getByText(expectedProps.name);
    const species = getByText(`Species: ${expectedProps.species}`);
    const image = getByAltText(expectedProps.name);
    expect(name).toBeVisible();
    expect(species).toBeVisible();
    expect(image).toBeVisible();
  });
});
