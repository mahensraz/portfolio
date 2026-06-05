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
  // const showSecondary = filter === "all" || filter === "secondary";

  // const domainData = [
  //   {
  //     key:   "frontend",
  //     label: t.stack.domains.frontend,
  //     items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Flutter"],
  //     color: "#4F8EF7",
  //     pct:   85,
  //   },
  //   {
  //     key:   "backend",
  //     label: t.stack.domains.backend,
  //     items: ["Laravel", "NestJS", "Node.js", "MySQL", "PostgreSQL"],
  //     color: "#9B5CF6",
  //     pct:   82,
  //   },
  //   {
  //     key:   "devops",
  //     label: t.stack.domains.devops,
  //     items: ["Docker", "Git", "GitHub", "Linux", "Jenkins"],
  //     color: "#22D3EE",
  //     pct:   60,
  //   },
  // ];

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

      </div>
    </section>
  );
}