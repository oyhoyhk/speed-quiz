import React from "react";
import styled from "@emotion/styled";
import { useRecoilValue } from "recoil";
import { timerState } from "../../utils/lib/atom";

const WIDTH = 320;

// eslint-disable-next-line react/prop-types
const Component = ({ time }) => {
  const timer = useRecoilValue(timerState);
  return (
    <Wrapper>
      <Bar
        style={{ transform: `translateX(${-100 + (time / timer) * 100}%)` }}
      />
    </Wrapper>
  );
};

const Bar = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #c0f4eb, #198bef);
  transition: 0.3s;
  border-radius: 0.5rem;
`;

const Wrapper = styled.div`
  width: ${WIDTH}px;
  height: 5px;
  border-radius: 0.5rem;
  overflow: hidden;
`;

const Timer = React.memo(Component);
export default Timer;
