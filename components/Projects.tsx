"use client";

import { motion, type Variants } from "framer-motion";

const projects = [
  {
    title: "NutriSnap",
    category: "AI / Mobile",
    description:
      "Snap-to-nutrition app leveraging computer vision and a custom ML model to identify food items and return macro breakdowns in real time.",
    stack: ["React Native", "Python", "FastAPI", "TensorFlow"],
    year: "2024",
    accent: "#c8f542",
  },
  {
    title: "OwnHealth",
    category: "Full-Stack SaaS",
    description:
      "Personal health dashboard that aggregates wearable data, lab results and doctor notes into a single privacy-first timeline.",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    year: "2024",
    accent: "#42d4f4",
  },
  {
    title: "Pokédex",
    category: "Frontend",
    description:
      "High-fidelity animated Pokédex PWA with instant search, type filtering, and silky 60 fps card-flip transitions.",
    stack: ["Next.js", "Framer Motion", "PokéAPI", "Tailwind"],
    year: "2024",
    accent: "#f4a142",
  },
  {
    title: "Portfolio v2",
    category: "Creative Dev",
    description:
      "The site you're looking at — scroll-linked canvas animation, parallax overlays, and hand-crafted motion design.",
    stack: ["Next.js 14", "Framer Motion", "Canvas API", "Tailwind"],
    year: "2024",
    accent: "#c842f4",
  },
];

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export default function Projects() {
  return (
    <section className="relative py-32 px-6 md:px-16 overflow-hidden" id="work">
      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Section header */}
        <div className="mb-16">
          <p className="text-xs tracking-[0.35em] uppercase text-[var(--accent)] mb-3 font-medium">
            Selected Work
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Projects
          </h2>
        </div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {projects.map((p) => (
            <motion.div
              key={p.title}
              variants={item}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative rounded-2xl p-8 cursor-pointer overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.09)",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Hover glow */}
              <div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(400px circle at 50% 50%, ${p.accent}18, transparent 60%)`,
                }}
              />

              {/* Top row */}
              <div className="flex items-start justify-between mb-6">
                <span
                  className="text-xs tracking-[0.3em] uppercase font-medium px-3 py-1 rounded-full"
                  style={{
                    color: p.accent,
                    background: `${p.accent}18`,
                    border: `1px solid ${p.accent}33`,
                  }}
                >
                  {p.category}
                </span>
                <span className="text-white/30 text-sm">{p.year}</span>
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-[var(--accent)] transition-colors duration-300">
                {p.title}
              </h3>

              {/* Description */}
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                {p.description}
              </p>

              {/* Stack tags */}
              <div className="flex flex-wrap gap-2">
                {p.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-1 rounded-md text-white/40"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Arrow */}
              <div className="absolute bottom-8 right-8 text-white/20 group-hover:text-[var(--accent)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 text-lg">
                ↗
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
