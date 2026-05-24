"use client";

import ScrollReveal, {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/ScrollReveal";
import { useLang } from "@/context/LanguageContext";
import { TECH_STACK } from "@/lib/data";
import { motion } from "framer-motion";
import { useState } from "react";

type Filter = "all" | "primary" | "secondary";

export default function TechStack() {
  const { t } = useLang();
  const [filter, setFilter] = useState<Filter>("all");

  const filterLabels = [
    { key: "all"       as Filter, label: t.stack.filterAll       },
    { key: "primary"   as Filter, label: t.stack.filterPrimary   },
    { key: "secondary" as Filter, label: t.stack.filterSecondary },
  ];

  const showPrimary   = filter === "all" || filter === "primary";
  const showSecondary = filter === "all" || filter === "secondary";

  const domainData = [
    {
      key:   "frontend",
      label: t.stack.domains.frontend,
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Flutter"],
      color: "#4F8EF7",
      pct:   85,
    },
    {
      key:   "backend",
      label: t.stack.domains.backend,
      items: ["Laravel", "NestJS", "Node.js", "MySQL", "PostgreSQL"],
      color: "#9B5CF6",
      pct:   82,
    },
    {
      key:   "devops",
      label: t.stack.domains.devops,
      items: ["Docker", "Git", "GitHub", "Linux", "Jenkins"],
      color: "#22D3EE",
      pct:   60,
    },
  ];

  return (
    <section id="stack" className="section-padding">
      <div className="container-section">

        {/* Header */}
        <ScrollReveal className="mb-14">
          <div className="flex items-center gap-3">
            <span className="font-mono-custom text-xs text-accent-blue">
              {t.stack.sectionNum}
            </span>
            <h2 className="font-display text-3xl font-bold text-text-primary lg:text-4xl">
              {t.stack.sectionTitle}
            </h2>
            <div className="ml-4 h-px flex-1 bg-border" />
          </div>
          <p className="mt-4 max-w-2xl text-base text-text-secondary">
            {t.stack.sectionDesc}
          </p>
        </ScrollReveal>

        {/* Filter tabs */}
        <ScrollReveal delay={0.1} className="mb-10">
          <div className="flex items-center gap-2">
            {filterLabels.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className="relative rounded-lg px-4 py-2 text-sm font-medium transition-colors"
              >
                {filter === f.key && (
                  <motion.span
                    layoutId="stack-filter"
                    className="absolute inset-0 rounded-lg bg-surface-2"
                    style={{ border: "1px solid rgba(79,142,247,0.25)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span
                  className={`relative ${
                    filter === f.key
                      ? "text-text-primary"
                      : "text-text-muted hover:text-text-secondary"
                  }`}
                >
                  {f.label}
                </span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Primary */}
        {showPrimary && (
          <div className="mb-12">
            <ScrollReveal>
              <p className="mb-5 font-mono-custom text-xs uppercase tracking-widest text-accent-blue">
                {t.stack.labelPrimary}
              </p>
            </ScrollReveal>

            <StaggerContainer
              className="flex flex-wrap gap-3"
              delay={0.05}
              staggerDelay={0.05}
            >
              {TECH_STACK.primary.map((tech) => (
                <StaggerItem key={tech.name}>
                  <motion.div
                    className="card-shine group flex items-center gap-2.5 rounded-xl border border-border bg-surface px-4 py-3 transition-all duration-200 hover:border-border-light hover:-translate-y-0.5 hover:shadow-card"
                    whileHover={{ scale: 1.03 }}
                  >
                    {/* ✅ react-icons : size uniquement, pas de strokeWidth */}
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-lg"
                      style={{
                        color:           tech.color,
                        backgroundColor: "rgba(255,255,255,0.03)",
                      }}
                    >
                      <tech.icon size={16} aria-hidden="true" />
                    </span>

                    <span className="font-display text-sm font-medium text-text-primary">
                      {tech.name}
                    </span>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        )}

        {/* Secondary */}
        {showSecondary && (
          <div>
            <ScrollReveal>
              <p className="mb-5 font-mono-custom text-xs uppercase tracking-widest text-text-muted">
                {t.stack.labelSecondary}
              </p>
            </ScrollReveal>

            <StaggerContainer
              className="flex flex-wrap gap-3"
              delay={0.05}
              staggerDelay={0.05}
            >
              {TECH_STACK.secondary.map((tech) => (
                <StaggerItem key={tech.name}>
                  <div className="flex items-center gap-2.5 rounded-xl border border-border/60 bg-surface/50 px-4 py-3 opacity-70 transition-all hover:opacity-100">
                    {/* ✅ même correction ici */}
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-lg"
                      style={{
                        color:           tech.color,
                        backgroundColor: "rgba(255,255,255,0.03)",
                      }}
                    >
                      <tech.icon size={16} aria-hidden="true" />
                    </span>

                    <span className="font-display text-sm font-medium text-text-secondary">
                      {tech.name}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        )}

        {/* Domain bars */}
        <ScrollReveal delay={0.3} className="mt-16">
          <div
            className="relative overflow-hidden rounded-2xl border border-border p-6 sm:p-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(79,142,247,0.05) 0%, rgba(155,92,246,0.04) 50%, rgba(34,211,238,0.03) 100%)",
            }}
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {domainData.map((domain) => (
                <div key={domain.key} className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-sm font-semibold text-text-primary">
                      {domain.label}
                    </span>
                    <span
                      className="font-mono-custom text-xs"
                      style={{ color: domain.color }}
                    >
                      {domain.pct}%
                    </span>
                  </div>

                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: domain.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${domain.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    />
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {domain.items.map((item, idx) => (
                      <span
                        key={item}
                        className="font-mono-custom text-[11px] text-text-muted"
                      >
                        {item}{idx < domain.items.length - 1 ? "," : ""}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}