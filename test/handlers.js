/* eslint-disable import/prefer-default-export */
// src/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
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
];
