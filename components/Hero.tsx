"use client";

import { useRef } from "react";
import ScrollyCanvas from "./ScrollyCanvas";
import Overlay from "./Overlay";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    // This 500vh div is the scroll travel distance.
    // Both ScrollyCanvas and Overlay share this ref for scroll measurement.
    <div ref={containerRef} className="relative" style={{ height: "500vh" }}>
      {/* Canvas — sticky, fills the viewport */}
      <ScrollyCanvas containerRef={containerRef} />

      {/* Text overlays — sticky inside the same container */}
      <Overlay containerRef={containerRef} />

      {/* Scroll nudge */}
      <div className="fixed bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none z-30">
        <span className="text-[9px] tracking-[0.4em] uppercase text-white/25">scroll</span>
        <div className="w-px h-7 bg-gradient-to-b from-white/25 to-transparent" />
      </div>
    </div>
  );
}
