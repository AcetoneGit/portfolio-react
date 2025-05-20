import React from "react";
import "./AnimatedDashedPath.css";

const NB_DASHES = 4;
const DASH_SPACING = 18;
const DASH_WIDTH = 3;
const DASH_HEIGHT = 12;

const AnimatedDashedPath: React.FC = () => (
  <div
    className="dashed-hover-reveal"
    style={{
      position: "relative",
      width: "100%",
      height: `${(NB_DASHES - 1) * DASH_SPACING + DASH_HEIGHT}px`,
      margin: "0 auto",
      zIndex: 10,
      display: "flex",
      justifyContent: "center",
    }}
  >
    <svg
      width="32"
      height={(NB_DASHES - 1) * DASH_SPACING + DASH_HEIGHT}
      viewBox={`0 0 32 ${(NB_DASHES - 1) * DASH_SPACING + DASH_HEIGHT}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      {Array.from({ length: NB_DASHES }).map((_, i) => (
        <rect
          key={i}
          x={16 - DASH_WIDTH / 2}
          y={i * DASH_SPACING}
          width={DASH_WIDTH}
          height={DASH_HEIGHT}
          rx={DASH_WIDTH / 2}
          className="animated-dash-rect"
          style={{ animationDelay: `${i * 0.18}s` }}
        />
      ))}
    </svg>
  </div>
);

export default AnimatedDashedPath; 