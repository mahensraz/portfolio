"use client";

import ScrollReveal, {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/ScrollReveal";
import { useLang } from "@/context/LanguageContext";
import { PROFILE } from "@/lib/data";
import { motion } from "framer-motion";
import { Code2, Globe, Layers, Zap } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const colorMap = {
  blue: {
    bg: "bg-accent-blue/10",
    border: "border-accent-blue/20",
    dot: "bg-accent-blue",
  },
  purple: {
    bg: "bg-accent-purple/10",
    border: "border-accent-purple/20",
    dot: "bg-accent-purple",
  },
  cyan: {
    bg: "bg-accent-cyan/10",
    border: "border-accent-cyan/20",
    dot: "bg-accent-cyan",
  },
};
const traitColors = ["blue", "purple", "cyan"] as const;

export default function About() {
  const { t, lang } = useLang();
  const [imageError, setImageError] = useState(false);

  const stats = [
    { label: t.about.stats.projects, value: "5+", icon: <Layers size={16} /> },
    { label: t.about.stats.stack, value: "16+", icon: <Code2 size={16} /> },
    { label: t.about.stats.freelance, value: "3+", icon: <Zap size={16} /> },
    { label: t.about.stats.years, value: "4+", icon: <Globe size={16} /> },
  ];

  return (
    <section id="about" className="section-padding">
      <div className="container-section">
        <ScrollReveal className="mb-14">
          <div className="flex items-center gap-3">
            <span className="font-mono-custom text-xs text-accent-blue">
              {t.about.sectionNum}
            </span>
            <h2 className="font-display text-3xl font-bold text-text-primary lg:text-4xl">
              {t.about.sectionTitle}
            </h2>
            <div className="ml-4 h-px flex-1 bg-border" />
          </div>
        </ScrollReveal>

        <div className="grid gap-12 lg:grid-cols-[1fr_340px]">
          {/* Left */}
          <div className="flex flex-col gap-8">
            {t.about.paragraphs.map((para, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <p className="text-base leading-8 text-text-secondary lg:text-lg">
                  {para}
                </p>
              </ScrollReveal>
            ))}

            <StaggerContainer
              className="mt-4 grid gap-4 sm:grid-cols-3"
              delay={0.2}
            >
              {t.about.traits.map((trait, i) => {
                const c = colorMap[traitColors[i]];
                return (
                  <StaggerItem key={trait.title}>
                    <div
                      className={`card-shine group rounded-xl border ${c.border} ${c.bg} p-4 transition-all duration-300 hover:-translate-y-1`}
                    >
                      <div className={`mb-2 h-1.5 w-6 rounded-full ${c.dot}`} />
                      <h3 className="mb-1.5 font-display text-sm font-semibold text-text-primary">
                        {trait.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-text-secondary">
                        {trait.desc}
                      </p>
                    </div>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>

          {/* Right */}
          <ScrollReveal direction="left" delay={0.2}>
            <div className="flex flex-col gap-5">
              {/* Identity card */}
              <div
                className="card-shine relative overflow-hidden rounded-2xl border border-border p-6"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(79,142,247,0.06) 0%, rgba(155,92,246,0.04) 100%)",
                }}
              >
                <div className="mb-5 flex justify-center">
                  <div
                    className="relative h-20 w-20 overflow-hidden rounded-2xl text-3xl font-bold font-display"
                    style={{
                      background:
                        "linear-gradient(135deg,rgba(79,142,247,0.25),rgba(155,92,246,0.25))",
                      border: "2px solid rgba(79,142,247,0.2)",
                    }}
                  >
                    {!imageError ? (
                      <Image
                        src={PROFILE.image}
                        alt={PROFILE.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="gradient-text">
                          {PROFILE.initials}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="font-display text-lg font-bold text-text-primary">
                    {PROFILE.name}
                  </h3>
                  <p className="mt-1 text-xs text-text-secondary">
                    {lang === "fr"
                      ? "Développeur Full Stack · Étudiant en Génie Logiciel"
                      : "Full Stack Developer · Software Engineering Student"}
                  </p>
                  <div className="mt-3 flex items-center justify-center gap-1.5">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                    <span className="font-mono-custom text-[11px] text-emerald-400">
                      {t.about.card.openToWork}
                    </span>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-2 border-t border-border pt-4">
                  {[
                    { label: t.about.card.location, value: PROFILE.location },
                    { label: t.about.card.focus, value: "Full Stack" },
                    { label: t.about.card.status, value: t.about.card.status },
                    { label: t.about.card.email, value: t.about.card.emailVal },
                  ].map((item) => (
                    <div key={item.label} className="text-center">
                      <p className="font-mono-custom text-[10px] uppercase tracking-wider text-text-muted">
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-xs font-medium text-text-secondary">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3">
                {stats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    className="card-shine rounded-xl border border-border bg-surface p-4 text-center transition-all hover:border-border-light hover:-translate-y-0.5"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="mb-2 flex justify-center text-text-muted">
                      {stat.icon}
                    </div>
                    <div className="font-display text-2xl font-bold gradient-text">
                      {stat.value}
                    </div>
                    <div className="mt-0.5 font-mono-custom text-[10px] uppercase tracking-wider text-text-muted">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
