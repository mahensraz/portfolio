"use client";

import { useLang } from "@/context/LanguageContext";
import { PROFILE } from "@/lib/data";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Sparkles } from "lucide-react";

const WORD_DELAY = 0.08;

function AnimatedWord({ word, index }: { word: string; index: number }) {
  return (
    <motion.span
      className="inline-block"
      initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        delay: 2 + index * WORD_DELAY,
        duration: 0.55,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      {word}&nbsp;
    </motion.span>
  );
}

export default function Hero() {
  const { t, lang } = useLang();
  const taglineWords = t.hero.tagline.split(" ");

  const scrollToAbout = () =>
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Dot grid background */}
      <div
        className="dot-grid absolute inset-0 opacity-40"
        style={{
          maskImage:
            "radial-gradient(ellipse at 50% 50%, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 50%, black 30%, transparent 80%)",
        }}
      />

      {/* Glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="h-[600px] w-[600px] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(79,142,247,0.1) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 flex max-w-4xl flex-col items-center text-center">
        {/* Status pill */}
        <motion.div
          className="mb-8 flex items-center gap-2 rounded-full border border-accent-blue/20 bg-accent-blue/5 px-4 py-1.5"
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 2.0, duration: 0.45 }}
        >
          <Sparkles size={12} className="text-accent-blue" />
          <span className="font-mono-custom text-[11px] tracking-widest text-accent-blue uppercase">
            {t.hero.available}
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          className="font-display text-5xl font-extrabold leading-none tracking-tight text-text-primary sm:text-6xl lg:text-7xl xl:text-8xl"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 2.1,
            duration: 0.6,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
        >
          {PROFILE.name}
        </motion.h1>

        {/* Title */}
        <motion.p
          className="mt-4 font-display text-xl font-medium text-text-secondary sm:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.25, duration: 0.55 }}
        >
          {t.hero.title}{" "}
          <span className="text-text-muted">{t.hero.titleAnd}</span>{" "}
          <span className="gradient-text">{t.hero.titleSub}</span>
        </motion.p>

        {/* Tagline word by word */}
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
          {taglineWords.map((word, i) => (
            <AnimatedWord key={`${word}-${i}-${lang}`} word={word} index={i} />
          ))}
        </p>

        {/* Code snippet */}
        <motion.div
          className="mt-10 rounded-xl border border-border bg-surface px-5 py-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
            </div>
            <span className="font-mono-custom text-xs text-text-muted">
              portfolio.ts
            </span>
          </div>
          <div className="mt-2 font-mono-custom text-sm leading-relaxed">
            <span className="text-purple-400">const</span>{" "}
            <span className="text-accent-blue">developer</span>{" "}
            <span className="text-text-muted">=</span>{" "}
            <span className="text-accent-cyan">&#123;</span>
            <br />
            <span className="ml-4 text-text-muted">
              stack:{" "}
              <span className="text-emerald-400">
                ["React", "Next.js", "Laravel", "Node.js"]
              </span>
              ,
            </span>
            <br />
            <span className="ml-4 text-text-muted">
              passion:{" "}
              <span className="text-yellow-300/80">{t.hero.codePassion}</span>
            </span>
            <br />
            <span className="text-accent-cyan">&#125;</span>
            <span className="cursor-blink ml-0.5 inline-block h-4 w-0.5 bg-accent-blue align-middle" />
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.0, duration: 0.5 }}
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-xl px-6 font-medium text-white"
            style={{
              background: "linear-gradient(135deg, #4f8ef7 0%, #9b5cf6 100%)",
            }}
          >
            <span className="shimmer absolute inset-0" />
            <span className="relative">{t.hero.cta_projects}</span>
            <ArrowDown
              size={15}
              className="relative transition-transform group-hover:translate-y-0.5"
            />
          </a>

          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 items-center gap-2 rounded-xl border border-border-light bg-surface px-5 text-sm font-medium text-text-primary transition-all hover:border-border hover:bg-surface-2"
          >
            <Github size={15} /> {t.hero.cta_github}
          </a>

          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 items-center gap-2 rounded-xl border border-border-light bg-surface px-5 text-sm font-medium text-text-primary transition-all hover:border-border hover:bg-surface-2"
          >
            <Linkedin size={15} /> {t.hero.cta_linkedin}
          </a>
        </motion.div>

        {/* Location */}
        <motion.div
          className="mt-8 flex items-center gap-2 text-xs text-text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2 }}
        >
          <span className="h-1 w-1 rounded-full bg-text-muted" />
          <span className="font-mono-custom">
            {t.hero.basedIn} {PROFILE.location}
          </span>
          <span className="h-1 w-1 rounded-full bg-text-muted" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted transition-colors hover:text-text-secondary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
        aria-label="Scroll down"
      >
        <span className="font-mono-custom text-[10px] uppercase tracking-widest">
          {t.hero.scroll}
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.button>
    </section>
  );
}
