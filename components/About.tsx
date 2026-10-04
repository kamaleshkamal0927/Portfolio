"use client";

import { motion } from "framer-motion";

const skills = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { group: "Backend", items: ["Node.js", "Python", "FastAPI", "Express", "REST / GraphQL"] },
  { group: "AI / ML", items: ["TensorFlow", "PyTorch", "OpenAI API", "LangChain", "Scikit-learn"] },
  { group: "Cloud & DevOps", items: ["AWS", "Vercel", "Docker", "GitHub Actions", "PostgreSQL"] },
];

export default function About() {
  return (
    <section className="relative py-32 px-6 md:px-16 border-t border-white/5" id="about">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        {/* Left — bio */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-xs tracking-[0.35em] uppercase text-[var(--accent)] mb-3 font-medium">
            About
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            Kamalesh G
          </h2>
          <div className="space-y-4 text-white/55 leading-relaxed text-base">
            <p>
              Software Engineer with a passion for building products that sit at the
              intersection of engineering rigour and thoughtful design. Completed 
              B.E. Computer Science at Sathyabama University.
            </p>
            <p>
              I&apos;ve shipped full-stack apps, trained ML models, and crafted immersive web
              experiences — always chasing that last 10% of polish that separates good from
              memorable.
            </p>
            <p>
              When I&apos;m not coding I&apos;m exploring new frameworks, reading about system design,
              or obsessing over typography.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <a
              href="mailto:kamaleshperz1708gmail.com"
              className="inline-flex w-full items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-black bg-[var(--accent)] hover:opacity-90 transition-opacity sm:w-auto"
            >
              Get in touch ↗
            </a>
            <a
              href="https://drive.google.com/uc?export=download&id=1NyqGwgZSDCKzFkRByoG9sK541c6ltDHy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white/70 hover:text-white transition-colors sm:w-auto"
              style={{ border: "1px solid rgba(255,255,255,0.15)" }}
            >
              Download Resume
            </a>
          </div>
        </motion.div>

        {/* Right — skills */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="space-y-6"
        >
          {skills.map((group) => (
            <div key={group.group}>
              <p className="text-xs tracking-[0.25em] uppercase text-white/30 mb-2">
                {group.group}
              </p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm px-3 py-1.5 rounded-lg text-white/70 hover:text-white transition-colors"
                    style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
