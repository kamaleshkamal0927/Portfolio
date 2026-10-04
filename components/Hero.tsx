"use client";

import { useRef, useEffect, useState } from "react";
import ScrollyCanvas from "./ScrollyCanvas";
import Overlay from "./Overlay";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isScrollingRef = useRef(false);

  // true  = auto-scroll in progress → hide nudge, show skip
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);

  useEffect(() => {
    if (window.scrollY > 10) return;

    // Scroll all the way to the END of the hero (500vh = 5 × innerHeight)
    // so it lands cleanly at the section below.
    const TARGET = window.innerHeight * 5;
    const DURATION = 14000; // ms — slow, cinematic 14 s
    const scrollRoot = document.documentElement;
    const previousScrollBehavior = scrollRoot.style.scrollBehavior;
    let startTime: number | null = null;

    // Seventh-order smootherstep softens acceleration and deceleration further.
    const ease = (t: number) =>
      t * t * t * t * (35 - 84 * t + 70 * t * t - 20 * t * t * t);

    const stop = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
      scrollRoot.style.scrollBehavior = previousScrollBehavior;
      isScrollingRef.current = false;
      setIsAutoScrolling(false);
    };

    const step = (ts: number) => {
      if (!isScrollingRef.current) return; // cancelled by skip or wheel
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const progress = Math.min(elapsed / DURATION, 1);
      window.scrollTo(0, TARGET * ease(progress));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        // Finished naturally
        stop();
      }
    };

    // Allow wheel / touch to cancel auto-scroll (user wants control back)
    const onUserScroll = () => {
      if (isScrollingRef.current) stop();
    };

    window.addEventListener("wheel", onUserScroll, { passive: true });
    window.addEventListener("touchstart", onUserScroll, { passive: true });

    timerRef.current = setTimeout(() => {
      scrollRoot.style.scrollBehavior = "auto";
      isScrollingRef.current = true;
      setIsAutoScrolling(true);
      rafRef.current = requestAnimationFrame(step);
    }, 700); // slight pause so page settles before moving

    return () => {
      stop();
      window.removeEventListener("wheel", onUserScroll);
      window.removeEventListener("touchstart", onUserScroll);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const skipIntro = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (timerRef.current) clearTimeout(timerRef.current);
    isScrollingRef.current = false;
    setIsAutoScrolling(false);
    // Snap to end of hero instantly
    window.scrollTo({ top: window.innerHeight * 5, behavior: "smooth" });
  };

  return (
    <div ref={containerRef} className="relative" style={{ height: "500vh" }}>
      {/* Canvas — sticky, fills the viewport */}
      <ScrollyCanvas containerRef={containerRef} />

      {/* Text overlays */}
      <Overlay containerRef={containerRef} />

      {/* Scroll nudge — hidden while auto-scrolling */}
      <div
        className="fixed bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none z-30 transition-opacity duration-700"
        style={{ opacity: isAutoScrolling ? 0 : 1 }}
      >
        <span className="text-[9px] tracking-[0.4em] uppercase text-white/25">scroll</span>
        <div className="w-px h-7 bg-gradient-to-b from-white/25 to-transparent" />
      </div>

      {/* Skip intro button — only visible during auto-scroll */}
      <button
        onClick={skipIntro}
        className="fixed bottom-7 right-7 z-40 transition-all duration-500 pointer-events-auto"
        style={{
          opacity: isAutoScrolling ? 1 : 0,
          transform: isAutoScrolling ? "translateY(0)" : "translateY(6px)",
          pointerEvents: isAutoScrolling ? "auto" : "none",
        }}
        aria-label="Skip intro"
      >
        <span className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-md text-white/50 text-[10px] tracking-[0.3em] uppercase hover:bg-white/10 hover:text-white/80 hover:border-white/30 transition-colors">
          Skip
          <svg
            width="10" height="10" viewBox="0 0 10 10" fill="none"
            className="opacity-60"
          >
            <path d="M2 1l4 4-4 4M7 1v8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>
    </div>
  );
}
