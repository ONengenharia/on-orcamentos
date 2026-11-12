import { Composition } from "remotion";
import { Portfolio } from "./Portfolio";

// 19 cenas somando 105 s, menos 18 transições de 0,5 s = 96 s
export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Portfolio"
      component={Portfolio}
      durationInFrames={2880}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
