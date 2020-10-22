import React from 'react';
import { css } from '@emotion/css';
import Link from 'next/link';
import tw from '@tailwindcssinjs/macro';

const Header = (): JSX.Element => (
  <div className={css(tw`container mx-auto`)}>
    <Link href="/">
      <a>
        <h1
          className={css`
            ${tw`text-ha font-extrabold text-2xl md:text-4xl text-center mt-4 mb-4`}
          `}
        >
          The Rick and Morty API
        </h1>
      </a>
    </Link>
  </div>
);

export default Header;
