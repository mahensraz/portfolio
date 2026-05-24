"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Code2, Calendar } from "lucide-react";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/animations/ScrollReveal";
import { EXPERIENCE, PROFILE } from "@/lib/data";
import { useLang } from "@/context/LanguageContext";
import type { ExperienceItem } from "@/types";

const TYPE_ICON = {
  work:      <Briefcase size={14} />,
  project:   <Code2 size={14} />,
  education: <GraduationCap size={14} />,
};
const TYPE_STYLE = {
  work:      { color: "text-accent-blue",   bg: "bg-accent-blue/10",   border: "border-accent-blue/20" },
  project:   { color: "text-accent-purple", bg: "bg-accent-purple/10", border: "border-accent-purple/20" },
  education: { color: "text-accent-cyan",   bg: "bg-accent-cyan/10",   border: "border-accent-cyan/20" },
};

function TimelineItem({ item, isLast }: { item: ExperienceItem; isLast: boolean }) {
  const { lang } = useLang();
  const style = TYPE_STYLE[item.type];

  return (
    <StaggerItem>
      <div className="relative flex gap-5">
        <div className="flex flex-col items-center">
          <motion.div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border ${style.border} ${style.bg} ${style.color}`} whileHover={{ scale: 1.1 }}>
            {TYPE_ICON[item.type]}
          </motion.div>
          {!isLast && (
            <div className="mt-2 w-px flex-1" style={{ background: "linear-gradient(to bottom, rgba(30,30,53,0.8), transparent)", minHeight: "40px" }} />
          )}
        </div>

        <div className={`card-shine mb-8 flex-1 overflow-hidden rounded-2xl border border-border bg-surface p-5 transition-all duration-200 hover:border-border-light ${isLast ? "mb-0" : ""}`}>
          <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="font-display text-base font-bold text-text-primary">{item.role[lang]}</h3>
              <p className={`mt-0.5 text-sm font-medium ${style.color}`}>{item.company}</p>
            </div>
            <div className="flex items-center gap-1.5 rounded-md border border-border bg-surface-2 px-2.5 py-1 text-xs text-text-muted">
              <Calendar size={11} />
              <span className="font-mono-custom">{item.period}</span>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-text-secondary">{item.description[lang]}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {item.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}
          </div>
        </div>
      </div>
    </StaggerItem>
  );
}

export default function Experience() {
  const { t } = useLang();

  return (
    <section id="experience" className="section-padding">
      <div className="container-section">
        <ScrollReveal className="mb-14">
          <div className="flex items-center gap-3">
            <span className="font-mono-custom text-xs text-accent-blue">{t.experience.sectionNum}</span>
            <h2 className="font-display text-3xl font-bold text-text-primary lg:text-4xl">{t.experience.sectionTitle}</h2>
            <div className="ml-4 h-px flex-1 bg-border" />
          </div>
          <p className="mt-4 max-w-2xl text-base text-text-secondary">{t.experience.sectionDesc}</p>
        </ScrollReveal>

        <div className="grid gap-12 lg:grid-cols-[1fr_300px]">
          <StaggerContainer delay={0.1} staggerDelay={0.12}>
            {EXPERIENCE.map((item, i) => (
              <TimelineItem key={item.id} item={item} isLast={i === EXPERIENCE.length - 1} />
            ))}
          </StaggerContainer>

          <ScrollReveal direction="left" delay={0.2}>
            <div className="flex flex-col gap-5 lg:sticky lg:top-24">
              {/* Profile card */}
              <div className="rounded-2xl border border-border p-5"
                style={{ background: "linear-gradient(135deg,rgba(79,142,247,0.06) 0%,rgba(155,92,246,0.04) 100%)" }}>
                <h3 className="font-display text-sm font-semibold text-text-primary">{t.experience.profile.title}</h3>
                <div className="mt-4 flex flex-col gap-3">
                  {[
                    { label: t.experience.profile.approach, value: t.experience.profile.approachVal, color: "text-accent-blue" },
                    { label: t.experience.profile.strength, value: t.experience.profile.strengthVal, color: "text-accent-purple" },
                    { label: t.experience.profile.interest, value: t.experience.profile.interestVal, color: "text-accent-cyan" },
                    { label: t.experience.profile.learning, value: t.experience.profile.learningVal, color: "text-emerald-400" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className="font-mono-custom text-[11px] uppercase tracking-wider text-text-muted">{item.label}</span>
                      <span className={`text-xs font-medium ${item.color}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="rounded-2xl border border-border bg-surface p-5">
                <h3 className="mb-3 font-display text-sm font-semibold text-text-primary">{t.experience.legend.title}</h3>
                <div className="flex flex-col gap-2.5">
                  {(["work","project","education"] as const).map((type) => {
                    const s = TYPE_STYLE[type];
                    const label = type === "work" ? t.experience.legend.work : type === "project" ? t.experience.legend.project : t.experience.legend.education;
                    return (
                      <div key={type} className="flex items-center gap-2.5">
                        <div className={`flex h-6 w-6 items-center justify-center rounded-lg border ${s.border} ${s.bg} ${s.color}`}>
                          {TYPE_ICON[type]}
                        </div>
                        <span className="text-xs text-text-secondary">{label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* CTA card */}
              <a href={`mailto:${PROFILE.email}`}
                className="block rounded-2xl border border-accent-blue/20 bg-gradient-to-br from-accent-blue/10 to-accent-purple/10 p-5 text-center transition-all hover:border-accent-blue/30">
                <p className="font-display text-sm font-semibold text-text-primary">{t.experience.cta.title}</p>
                <p className="mt-1 text-xs text-text-secondary">{t.experience.cta.sub}</p>
                <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-accent-blue">
                  {t.experience.cta.link}
                </div>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
