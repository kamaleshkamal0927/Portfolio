"use client";

import { useEffect, useRef } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const TOTAL_FRAMES = 231;
const pad = (n: number) => String(n).padStart(3, "0");

interface Props {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function ScrollyCanvas({ containerRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  const drawFrame = (idx: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[idx];
    if (!canvas || !img || !img.complete) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const imgR = iw / ih;
    const canR = W / H;

    let sx = 0, sy = 0, sw = iw, sh = ih;
    if (imgR > canR) {
      sw = ih * canR;
      sx = (iw - sw) / 2;
    } else {
      sh = iw / canR;
      sy = (ih - sh) / 2;
    }

    ctx.clearRect(0, 0, W, H);
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, W, H);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * (window.devicePixelRatio || 1);
      canvas.height = canvas.offsetHeight * (window.devicePixelRatio || 1);
      drawFrame(currentFrameRef.current);
    };

    // Preload all frames
    let loaded = 0;
    const images = new Array<HTMLImageElement>(TOTAL_FRAMES);

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/sequence/ezgif-frame-${pad(i + 1)}.png`;
      const idx = i;
      img.onload = () => {
        images[idx] = img;
        imagesRef.current[idx] = img;
        loaded++;
        // Draw as soon as the first frame is ready
        if (loaded === 1 && idx === 0) {
          resize();
        }
      };
    }

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    const idx = Math.round(Math.max(0, Math.min(TOTAL_FRAMES - 1, latest)));
    if (idx === currentFrameRef.current && idx !== 0) return;
    currentFrameRef.current = idx;
    drawFrame(idx);
  });

  return (
    <div className="sticky top-0 h-screen w-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ background: "#0d0d0d" }}
      />
    </div>
  );
}
