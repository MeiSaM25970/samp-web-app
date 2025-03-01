import { FC, memo, useState } from "react";
import Lottie from "react-lottie-player";
import type { AnimationSegment } from "lottie-web";
import animationData from "./espilToggle.json";
import styled, { keyframes } from "styled-components";

interface INightModeToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  speed: number;
  className?: string;
}
const NightModeToggle: FC<INightModeToggleProps> = ({
  checked,
  onChange,
  speed,
  className,
}) => {
  const [isReadyToAnimate, setReadyToAnimate] = useState(false);
  const segmentsToPlay: AnimationSegment = checked ? [250, 500] : [0, 250];
  const segmentToGoTo = checked ? 0 : 250;

  return (
    <ToggleButton
      onClick={() => {
        setReadyToAnimate(true);
        onChange(!checked);
      }}
      aria-hidden="true"
      className={className}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Lottie
          key="$preventGlitches"
          play={isReadyToAnimate}
          speed={speed}
          animationData={animationData}
          loop={false}
          segments={segmentsToPlay}
          goTo={segmentToGoTo}
          className="lottie"
        />
      </div>
    </ToggleButton>
  );
};

export default memo(NightModeToggle);

const rotate = keyframes`
  to{
    transform:rotate(360deg)
  }
`;
const ToggleButton = styled.button`
  cursor: pointer;
  overflow: hidden;
  width: 40px;
  height: 40px;
  appearance: none;
  border: none;
  background-color: ${({ theme: { colors } }) => colors.background.bg1};
  padding: 8px;
  border-radius: 8px;
  .lottie {
    animation: ${rotate} 15s linear infinite;
  }
`;
