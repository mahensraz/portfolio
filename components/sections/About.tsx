"use client";

import ScrollReveal, {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/ScrollReveal";
import { Button } from "@/components/ui/button";
import { useLang } from "@/context/LanguageContext";
import { PROFILE } from "@/lib/data";
import { Eye, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const traitAccents = [
  "bg-primary",
  "bg-accent-purple",
  "bg-accent-cyan",
] as const;

export default function About() {
  const { t, lang } = useLang();
  const [imageError, setImageError] = useState(false);
  const resume = PROFILE.resume[lang];

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

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_272px] lg:items-start lg:gap-16">
          {/* Left: Editorial narrative + open specialties grid */}
          <div className="flex flex-col gap-10">
            <div className="max-w-2xl space-y-5">
              {t.about.paragraphs.map((para, i) => (
                <ScrollReveal key={i} delay={i * 0.08}>
                  <p
                    className={
                      i === 0
                        ? "text-base leading-8 text-foreground/90 lg:text-lg"
                        : "text-base leading-7 text-muted-foreground"
                    }
                  >
                    {para}
                  </p>
                </ScrollReveal>
              ))}
            </div>

            <StaggerContainer
              className="grid gap-6 border-t border-border pt-8 sm:grid-cols-3"
              delay={0.15}
            >
              {t.about.traits.map((trait, i) => (
                <StaggerItem key={trait.title}>
                  <div className="space-y-2.5">
                    <div
                      className={`h-0.5 w-6 rounded-full ${traitAccents[i] ?? "bg-primary"}`}
                    />
                    <h3 className="font-display text-sm font-semibold text-foreground">
                      {trait.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {trait.desc}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Right: Integrated editorial portrait & essentials (no Card) */}
          <ScrollReveal
            direction="left"
            delay={0.15}
            className="order-first lg:order-last"
          >
            <aside className="space-y-5">
              {/* Mobile: compact portrait lockup | Desktop: editorial aspect-[4/5] portrait */}
              <div className="flex items-start gap-4 lg:flex-col lg:gap-5">
                <div className="group relative h-24 w-20 shrink-0 overflow-hidden rounded-xl border border-border/90 bg-surface shadow-card sm:h-28 sm:w-24 lg:aspect-[4/5] lg:h-auto lg:w-full lg:rounded-2xl">
                  {!imageError ? (
                    <>
                      <Image
                        src={PROFILE.image}
                        alt={PROFILE.name}
                        fill
                        quality={95}
                        sizes="(max-width: 640px) 80px, (max-width: 1024px) 96px, 280px"
                        className="object-cover object-[50%_66%] brightness-[0.95] contrast-[1.03] transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                        onError={() => setImageError(true)}
                      />
                      {/* Subtle dark-mode edge integration so the light studio backdrop blends naturally */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-t from-background/70 via-transparent to-background/15 ring-1 ring-inset ring-white/10"
                      />
                    </>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-secondary">
                      <span className="font-display text-2xl font-bold text-primary lg:text-4xl">
                        {PROFILE.initials}
                      </span>
                    </div>
                  )}
                </div>

                <div className="min-w-0 space-y-2">
                  <div>
                    <h3 className="font-display text-lg font-semibold leading-tight text-foreground lg:text-xl">
                      {PROFILE.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-foreground/90">
                      {t.about.card.role}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {t.about.card.academic}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 pt-0.5 text-xs text-muted-foreground">
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-success"
                      aria-hidden="true"
                    />
                    <span>{t.about.card.openToWork}</span>
                  </div>
                </div>
              </div>

              {/* Essential details only: Location + clickable Email */}
              <dl className="space-y-2.5 border-t border-border pt-4 text-xs">
                <div className="flex items-center gap-2.5 text-muted-foreground">
                  <dt className="sr-only">{t.about.card.location}</dt>
                  <MapPin size={13} className="shrink-0" aria-hidden="true" />
                  <dd className="text-foreground/90">{PROFILE.location}</dd>
                </div>

                <div className="flex items-start gap-2.5 text-muted-foreground">
                  <dt className="sr-only">{t.about.card.email}</dt>
                  <Mail
                    size={13}
                    className="mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <dd className="min-w-0">
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="break-all text-primary transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {PROFILE.email}
                    </a>
                  </dd>
                </div>
              </dl>

              {/* Secondary discreet CV actions aligned with the active language */}
              <div className="grid grid-cols-1 gap-2 pt-1 sm:grid-cols-2 lg:grid-cols-1">
                {/* <Button
                  asChild
                  variant="secondary"
                  size="sm"
                  className="h-9 w-full rounded-lg border border-border-light bg-surface-2 text-xs font-medium text-foreground transition-colors hover:border-border hover:bg-surface-2/80 hover:text-foreground"
                >
                  <a href={resume.href} download={resume.filename}>
                    <Download size={14} aria-hidden="true" />
                    <span>{t.hero.cta_resume}</span>
                  </a>
                </Button> */}
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="h-9 w-full rounded-lg border border-border-light bg-surface-2 text-xs font-medium text-foreground transition-colors hover:border-border hover:bg-surface-2/80 hover:text-foreground"
                >
                  <a
                    href={resume.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Eye size={14} aria-hidden="true" />
                    <span>{t.hero.cta_resume_view}</span>
                  </a>
                </Button>
              </div>
            </aside>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
