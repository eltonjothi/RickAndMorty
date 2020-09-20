import { css } from "@emotion/css";
import tw from "@tailwindcssinjs/macro";

const Header = () => (
  <>
    <div className={css(tw`container mx-auto`)}>
      <h1
        className={css`
          ${tw`text-ha font-extrabold text-2xl md:text-4xl text-center mt-4 mb-4`}
          /* color: #fb6f0d; */
          /* font-size: 24px; */
        `}
      >
        The Rick and Morty API
      </h1>
    </div>
  </>
);

export default Header;
