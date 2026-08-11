import React from "react";
import { Composition } from "remotion";
import { HeroFlow, DURATION, FPS, HEIGHT, WIDTH } from "./HeroFlow";

export const Root: React.FC = () => {
  return (
    <Composition
      id="HeroFlow"
      component={HeroFlow}
      durationInFrames={DURATION}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
      defaultProps={{ plateau: 22, shoulder: 100, beats: 16 }}
    />
  );
};
