import { css } from '@emotion/css';
import { useRouter } from 'next/router';
import Link from 'next/link';
import tw from '@tailwindcssinjs/macro';

const Pagination = ({ currentPage, totalPages }) => {
  const router = useRouter();
  const previousPageParseQbject = JSON.parse(
    JSON.stringify({
      ...router.query,
      page: currentPage - 1,
    }),
  );
  const nextPageParseQbject = JSON.parse(
    JSON.stringify({
      ...router.query,
      page: currentPage + 1,
    }),
  );
  return (
    <div className={css(tw`inline-flex mx-auto`)}>
      {currentPage > 1 && (
        <Link
          href={{
            pathname: router.pathname,
            query: previousPageParseQbject,
          }}
        >
          <a
            className={css(
              tw`bg-white hover:bg-cool-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow mr-2`,
            )}
          >
            Prev
          </a>
        </Link>
      )}
      {currentPage < totalPages && (
        <Link
          href={{
            pathname: router.pathname,
            query: nextPageParseQbject,
          }}
        >
          <a
            className={css(
              tw`bg-white hover:bg-cool-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow ml-2`,
            )}
          >
            Next
          </a>
        </Link>
      )}
    </div>
  );
};

export default Pagination;
