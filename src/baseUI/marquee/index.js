import styled, { keyframes } from "styled-components";

const marquee = keyframes`
from {
  left: 100%;
}
to {
  left: -100%;
}
from {
  transform: translateX(100%);
}
to {
  transform: translateX(-100%);
}
`;

const Marquee = styled.div`
  width: 100%;
  height: 35px;
  overflow: hidden;
  position: relative;
  white-space: nowrap;
  h1 {
    position: absolute;
    animation: ${marquee} 10s linear infinite;
  }
`;
export default Marquee;
