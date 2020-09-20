import { css } from "@emotion/css";
import get from "lodash.get";
import useSWR from "swr";
import tw from "@tailwindcssinjs/macro";
import Episode from "./Episode";

const fetcher = (url) => fetch(url).then((r) => r.json());

const Card = ({ data }) => {
  const name = get(data, "name", "");
  const image = get(data, "image", "");
  const species = get(data, "species", "");
  const originAPI = get(data, "origin.url", "");
  const { data: originData, isValidating } = useSWR(originAPI, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 300000,
  });

  const originName = get(originData, "name", "");
  const originDimension = get(originData, "dimension", "");
  const originResidents = get(originData, "residents", []);

  const episodes = get(data, "episode", []);

  return (
    <>
      <div
        className={css(tw`w-full sm:w-full  md:w-full lg:w-1/2 mb-4  px-2 `)}
      >
        <div class={css(tw`bg-cool-gray-100 shadow rounded p-6 h-full`)}>
          <div class={css(tw`md:flex `)}>
            <img
              // class="bg-cover w-12"
              loading="lazy"
              className={css(
                tw`h-24 w-24 md:h-32 md:w-32 rounded mx-auto md:mx-0 md:mr-6`
              )}
              width="10rem"
              src={image}
              alt={name}
            />
            <div className={css(tw`text-center md:text-left`)}>
              <h2 className={css(tw`text-gray-800 font-bold text-xl mb-1`)}>{name}</h2>
              {species && (
                <p className={css(tw`text-gray-700 text-base`)}>
                  Species: {species}
                </p>
              )}
              {originName && (
                <p className={css(tw`text-gray-700 text-base`)}>
                  Origin: {originName}
                </p>
              )}
              {originDimension && (
                <p className={css(tw`text-gray-700 text-base`)}>
                  Dimension: {originDimension}
                </p>
              )}
              {originResidents.length > 0 && (
                <p className={css(tw`text-gray-700 text-base`)}>
                  No of residents: {originResidents.length}
                </p>
              )}
            </div>
          </div>
          <div class={css(tw`md:flex bg-cool-gray-200 rounded p-2 mt-6`)}>
            <div className={css(tw`text-center md:text-left`)}>
              <h4 className={css(tw`text-gray-800 font-bold text-sm mb-1`)}>Featured in</h4>
              <div className={css(tw``)}>
                {Array.isArray(episodes) &&
                  episodes.map((index) => <Episode url={index} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;