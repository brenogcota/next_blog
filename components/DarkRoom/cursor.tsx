import { useState, useRef, useEffect } from "react";
import { styled, keyframes } from "@stitches/react";

const lightBreath = keyframes({
  "0%, 100%": {
    transform: "translate(-50%, -50%) scale(1)",
    opacity: 0.9,
  },
  "50%": {
    transform: "translate(-50%, -50%) scale(1.06)",
    opacity: 1,
  },
});

const flameBreath = keyframes({
  "0%, 100%": {
    transform: "translateX(-50%) scale(1)",
    opacity: 0.85,
    filter: "blur(0.6px)",
  },
  "50%": {
    transform: "translateX(-50%) scale(1.12, 1.2)",
    opacity: 1,
    filter: "blur(0.9px)",
  },
});

const CustomCursor = styled("div", {
  position: "fixed",
  width: "10px",
  height: "28px",
  borderRadius: "2px",
  zIndex: 300,
  pointerEvents: "none",
  transform: "translate(-50%, -50%)",

  backgroundColor: "rgba(255, 200, 100, 0.8)",

  boxShadow: `
    0 0 45px 22px rgba(255, 180, 80, 0.35),
    0 0 90px 45px rgba(255, 140, 60, 0.18)
  `,

  animation: `${lightBreath} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite`,

  ".flameWrapper": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "-10px",
    left: "50%",
    transform: "translateX(-50%)",
    transformOrigin: "50% 0%",
    transition: "transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)",
  },

  ".flame": {
    width: "8px",
    height: "16px",
    borderRadius: "50%",
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    background:
      "radial-gradient(circle at 50% 30%, #ffffff 0%, #ffd27d 35%, #ff9f43 60%, rgba(255, 140, 60, 0.15) 75%)",
    filter: "blur(0.6px)",
    transformOrigin: "50% 80%",
    animation: `${flameBreath} 2s ease-in-out infinite`,
  },
});

interface CandleCursorProps {
  mousePos: { x: number; y: number };
}

const CandleCursor = ({ mousePos }: CandleCursorProps) => {
  const lastXRef = useRef(mousePos.x);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [direction, setDirection] = useState<"left" | "right" | null>(null);

  useEffect(() => {
    const dx = mousePos.x - lastXRef.current;

    if (dx > 0) setDirection("right");
    else if (dx < 0) setDirection("left");

    lastXRef.current = mousePos.x;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setDirection(null);
    }, 100);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [mousePos]);

  const rotate =
    direction === "right" ? "-15deg" : direction === "left" ? "15deg" : "0deg";

  return (
    <CustomCursor
      style={{
        left: mousePos.x,
        top: mousePos.y,
        opacity: mousePos.x > 0 ? 1 : 0,
      }}
    >
      <div
        className="flameWrapper"
        style={{
          transform: `translateX(-50%) rotate(${rotate})`,
        }}
      >
        <div className="flame" />
      </div>
    </CustomCursor>
  );
};

export default CandleCursor;
