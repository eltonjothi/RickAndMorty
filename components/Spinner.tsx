import styled from '@emotion/styled';
import { keyframes } from '@emotion/css';

const bounce = keyframes`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  color: turquoise;
  border: 8px solid #000;
  border-radius: 50%;
  border-top: 8px solid #fb6f0d;
  width: 60px;
  height: 60px;
  -webkit-animation: ${bounce} 2s linear infinite; /* Safari */
  animation: ${bounce} 2s linear infinite;
`;

export default Spinner;
