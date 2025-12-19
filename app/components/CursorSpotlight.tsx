"use client";

import { useEffect, useRef, useCallback } from "react";

export default function CursorSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  const updateSpotlight = useCallback(() => {
    if (spotlightRef.current) {
      spotlightRef.current.style.setProperty("--mouse-x", `${mousePos.current.x}px`);
      spotlightRef.current.style.setProperty("--mouse-y", `${mousePos.current.y}px`);
    }
    rafRef.current = null;
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(updateSpotlight);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateSpotlight]);

  return (
    <div
      ref={spotlightRef}
      className="cursor-spotlight"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        background: `
          radial-gradient(
            600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(65, 105, 225, 0.08),
            transparent 40%
          )
        `,
      }}
    />
  );
}
