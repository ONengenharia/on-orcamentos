import type React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/fonts";

export const fontFamily = "Montserrat";
for (const weight of ["400", "600", "700", "800"]) {
  loadFont({
    family: fontFamily,
    url: staticFile(`fonts/montserrat-latin-${weight}-normal.woff2`),
    weight,
  });
}

export const NAVY = "#1e2f40";
export const BG = "#101b26";
export const BLUE = "#62a8dc";
export const LIGHT = "#cfe0ee";

const ease = Easing.bezier(0.16, 1, 0.3, 1);

/** Foto de fundo com movimento lento (Ken Burns) e escurecimento. */
export const PhotoBg: React.FC<{
  readonly src: string;
  readonly name: string;
  readonly from?: number;
  readonly to?: number;
  readonly position?: string;
  readonly shade?: string;
}> = ({
  src,
  name,
  from = 1.05,
  to = 1.18,
  position = "center",
  shade = `linear-gradient(90deg, ${BG}f2 0%, ${BG}c0 45%, ${BG}30 100%)`,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: BG }}>
      <Img
        name={name}
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: position,
          scale: interpolate(frame, [0, durationInFrames], [from, to], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
      <AbsoluteFill style={{ background: shade }} />
    </AbsoluteFill>
  );
};

/** Elemento que entra subindo com fade, com atraso em frames. */
export const Reveal: React.FC<{
  readonly name: string;
  readonly delay?: number;
  readonly distance?: number;
  readonly style?: React.CSSProperties;
  readonly children: React.ReactNode;
}> = ({ name, delay = 0, distance = 40, style, children }) => {
  const frame = useCurrentFrame();
  return (
    <Interactive.Div
      name={name}
      style={{
        opacity: interpolate(frame, [delay, delay + 18], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        translate: interpolate(
          frame,
          [delay, delay + 24],
          [`0px ${distance}px`, "0px 0px"],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease },
        ),
        ...style,
      }}
    >
      {children}
    </Interactive.Div>
  );
};

/** Rótulo pequeno em azul, acima dos títulos. */
export const Kicker: React.FC<{
  readonly children: React.ReactNode;
  readonly delay?: number;
}> = ({ children, delay = 0 }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
      <div
        style={{
          height: 6,
          backgroundColor: BLUE,
          width: interpolate(frame, [delay, delay + 20], [0, 70], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: ease,
          }),
        }}
      />
      <Reveal
        name="Rótulo"
        delay={delay + 4}
        distance={0}
        style={{
          color: BLUE,
          fontSize: 34,
          fontWeight: 700,
          letterSpacing: 6,
          textTransform: "uppercase",
        }}
      >
        {children}
      </Reveal>
    </div>
  );
};

/** Número que conta de 0 até o valor. */
export const Counter: React.FC<{
  readonly value: number;
  readonly prefix?: string;
  readonly suffix?: string;
  readonly decimals?: number;
  readonly delay?: number;
}> = ({ value, prefix = "", suffix = "", decimals = 0, delay = 0 }) => {
  const frame = useCurrentFrame();
  const v = interpolate(frame, [delay, delay + 45], [0, value], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const txt = v.toLocaleString("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return (
    <span>
      {prefix}
      {txt}
      {suffix}
    </span>
  );
};

/** Marca d'água pequena com o logo no canto. */
export const Corner: React.FC = () => (
  <div
    style={{
      position: "absolute",
      right: 80,
      bottom: 60,
      display: "flex",
      alignItems: "center",
      gap: 14,
      color: "#ffffffaa",
      fontSize: 22,
      fontWeight: 700,
      letterSpacing: 5,
    }}
  >
    ON ENGENHARIA
  </div>
);

export const Scene: React.FC<{ readonly children: React.ReactNode }> = ({
  children,
}) => (
  <AbsoluteFill style={{ fontFamily, color: "white", backgroundColor: BG }}>
    {children}
  </AbsoluteFill>
);

export const Content: React.FC<{
  readonly children: React.ReactNode;
  readonly width?: number;
  readonly style?: React.CSSProperties;
}> = ({ children, width = 1000, style }) => (
  <AbsoluteFill
    style={{
      padding: "120px 140px",
      justifyContent: "center",
      ...style,
    }}
  >
    <div
      style={{ width, display: "flex", flexDirection: "column", gap: 28 }}
    >
      {children}
    </div>
  </AbsoluteFill>
);

export const H1: React.CSSProperties = {
  fontSize: 92,
  fontWeight: 800,
  lineHeight: 1.05,
  margin: 0,
};
export const P: React.CSSProperties = {
  fontSize: 40,
  fontWeight: 400,
  lineHeight: 1.4,
  color: LIGHT,
};
