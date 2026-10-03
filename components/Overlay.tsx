"use client";

import { motion, useScroll, useTransform } from "framer-motion";

interface Section {
  scrollStart: number;
  scrollEnd: number;
  content: React.ReactNode;
  align: "center" | "left" | "right";
}

function TextBlock({
  section,
  containerRef,
}: {
  section: Section;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [
      section.scrollStart,
      section.scrollStart + 0.06,
      section.scrollEnd - 0.06,
      section.scrollEnd,
    ],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [section.scrollStart, section.scrollEnd],
    ["24px", "-24px"]
  );

  const alignClass =
    section.align === "left"
      ? "items-start text-left pl-10 md:pl-24"
      : section.align === "right"
      ? "items-end text-right pr-10 md:pr-24"
      : "items-center text-center px-6";

  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute inset-0 flex flex-col justify-center pointer-events-none ${alignClass}`}
    >
      {section.content}
    </motion.div>
  );
}

export default function Overlay({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const sections: Section[] = [
    {
      scrollStart: 0.0,
      scrollEnd: 0.26,
      align: "center",
      content: (
        <div>
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#c8f542] mb-3 font-medium">
            Portfolio · 2024
          </p>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tighter text-white mix-blend-difference">
            Kamalesh G.
          </h1>
          <p className="mt-5 text-base md:text-xl text-white/50 font-light tracking-wide">
            Software Engineer · Creative Developer
          </p>
        </div>
      ),
    },
    {
      scrollStart: 0.30,
      scrollEnd: 0.56,
      align: "left",
      content: (
        <div className="max-w-lg">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#c8f542] mb-3 font-medium">
            What I do
          </p>
          <h2 className="text-4xl md:text-6xl font-black leading-[1.05] text-white tracking-tight">
            I build digital<br />experiences.
          </h2>
          <p className="mt-5 text-white/45 text-sm md:text-base leading-relaxed">
            Full-stack engineering · AI / ML<br />
            React · Next.js · Python · Cloud
          </p>
        </div>
      ),
    },
    {
      scrollStart: 0.60,
      scrollEnd: 0.88,
      align: "right",
      content: (
        <div className="max-w-lg">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#c8f542] mb-3 font-medium">
            Philosophy
          </p>
          <h2 className="text-4xl md:text-6xl font-black leading-[1.05] text-white tracking-tight">
            Bridging design<br />and engineering.
          </h2>
          <p className="mt-5 text-white/45 text-sm md:text-base leading-relaxed">
            Where pixel-perfect craft meets<br />
            production-grade code.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 10 }}
    >
      {/* Sticky viewport that holds all the text layers */}
      <div className="sticky top-0 h-screen w-full">
        {sections.map((s, i) => (
          <TextBlock key={i} section={s} containerRef={containerRef} />
        ))}
      </div>
    </div>
  );
}
