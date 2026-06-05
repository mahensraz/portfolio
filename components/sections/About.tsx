"use client";

import ScrollReveal, {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/ScrollReveal";
import { useLang } from "@/context/LanguageContext";
import { PROFILE } from "@/lib/data";
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

        <div className="grid gap-12 lg:grid-cols-[1fr_400px]">
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
            <div className="rounded-[1.75rem] border border-border bg-surface p-5 shadow-[0_16px_40px_rgba(0,0,0,0.18)]">
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div>
                    <p className="font-mono-custom text-[10px] uppercase tracking-[0.22em] text-text-muted">
                      Profile
                    </p>
                    <h3 className="mt-1 font-display text-xl font-semibold text-text-primary">
                      {PROFILE.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-emerald-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span className="font-mono-custom uppercase tracking-[0.18em]">
                      {t.about.card.statusVal}
                    </span>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="relative h-44 w-44 overflow-hidden rounded-[1.5rem] border border-border-light bg-background shadow-[0_16px_32px_rgba(0,0,0,0.24)] sm:h-48 sm:w-48">
                    {!imageError ? (
                      <Image
                        src={PROFILE.image}
                        alt={PROFILE.name}
                        fill
                        sizes="(max-width: 640px) 176px, 192px"
                        className="object-cover"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent-blue/10 to-accent-purple/10">
                        <span className="font-display text-4xl font-bold gradient-text">
                          {PROFILE.initials}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm leading-6 text-text-secondary">
                    {lang === "fr"
                      ? "Développeur Full Stack · Étudiant en Génie Logiciel"
                      : "Full Stack Developer · Software Engineering Student"}
                  </p>

                  <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border-light bg-background px-3 py-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span className="font-mono-custom text-[11px] uppercase tracking-[0.16em] text-text-secondary">
                      {t.about.card.openToWork}
                    </span>
                  </div>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  {[
                    { label: t.about.card.location, value: PROFILE.location },
                    { label: t.about.card.focus, value: "Full Stack" },
                    { label: t.about.card.status, value: t.about.card.statusVal },
                    { label: t.about.card.email, value: t.about.card.emailVal },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl border border-border bg-background px-4 py-3"
                    >
                      <p className="font-mono-custom text-[10px] uppercase tracking-[0.18em] text-text-muted">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm font-medium text-text-primary">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
