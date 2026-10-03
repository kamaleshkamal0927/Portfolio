"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative py-24 px-6 md:px-16 border-t border-white/5 overflow-hidden" id="contact">
      {/* Big ambient glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-20 blur-[120px]"
        style={{ background: "var(--accent)" }}
      />

      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="text-xs tracking-[0.35em] uppercase text-[var(--accent)] mb-4 font-medium">
            Let&apos;s connect
          </p>
          <h2 className="text-5xl md:text-7xl font-bold text-white leading-none mb-6">
            Say Hello.
          </h2>
          <p className="text-white/40 text-lg mb-10 max-w-md mx-auto">
            Open to Full-time roles, Freelance projects, and interesting collaborations.
          </p>

          <a
            href="mailto:kamaleshperz1708@gmail.com"
            className="inline-block px-8 py-4 rounded-full text-black bg-[var(--accent)] font-semibold text-base hover:scale-105 transition-transform duration-300"
          >
            kamaleshperz1708@gmail.com
          </a>
        </motion.div>

        {/* Bottom row */}
        <div className="mt-24 flex flex-col md:flex-row items-center justify-between gap-4 text-white/25 text-sm">
          <span>© 2026 Kamalesh G</span>
          <div className="flex gap-6">
            {[
              { label: "GitHub", href: "https://github.com/kamaleshkamal0927" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/kamalesh-g-291b89265/" },
              { label: "Mobile", href: "tel:+919940151335" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
