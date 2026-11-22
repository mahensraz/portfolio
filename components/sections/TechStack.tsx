"use client";

import ScrollReveal, {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/ScrollReveal";
import { Badge } from "@/components/ui/badge";
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

  const showPrimary = filter === "all" || filter === "primary";

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
                    className="absolute inset-0 rounded-lg border border-primary/25 bg-surface-2"
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
                  <Badge
                    variant="outline"
                    className="gap-2.5 whitespace-nowrap rounded-xl bg-surface px-3.5 py-2.5 font-display text-sm text-foreground transition-colors duration-200 hover:border-border-light hover:bg-secondary/40"
                  >
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground/[0.03]"
                      style={{ color: tech.color }}
                    >
                      <tech.icon size={16} aria-hidden="true" />
                    </span>

                    <span>{tech.name}</span>
                  </Badge>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        )}

      </div>
    </section>
  );
}