"use client";

import ScrollReveal from "@/components/animations/ScrollReveal";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/context/LanguageContext";
import { getLocalizedText, TECH_STACK } from "@/lib/data";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

type Filter = "all" | "primary" | "secondary";

export default function TechStack() {
  const { t, lang } = useLang();
  const [filter, setFilter] = useState<Filter>("all");
  const prefersReducedMotion = useReducedMotion();

  const primaryCount = TECH_STACK.primary.length;
  const secondaryCount = TECH_STACK.secondary.length;
  const totalCount = primaryCount + secondaryCount;

  const filterTabs: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: t.stack.filterAll, count: totalCount },
    { key: "primary", label: t.stack.filterPrimary, count: primaryCount },
    { key: "secondary", label: t.stack.filterSecondary, count: secondaryCount },
  ];

  const showPrimary = filter === "all" || filter === "primary";
  const showSecondary = filter === "all" || filter === "secondary";

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
          <div
            role="tablist"
            aria-label={t.stack.sectionTitle}
            className="flex flex-wrap items-center gap-2"
          >
            {filterTabs.map((tab) => {
              const isActive = filter === tab.key;
              return (
                <button
                  key={tab.key}
                  id={`stack-tab-${tab.key}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="stack-tabpanel"
                  onClick={() => setFilter(tab.key)}
                  className={`relative inline-flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:bg-card/60 hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="stack-filter"
                      className="absolute inset-0 rounded-lg border border-primary/25 bg-surface-2"
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 380, damping: 30 }
                      }
                    />
                  )}
                  <span className="relative">{tab.label}</span>
                  <span className="relative font-mono-custom text-[11px] text-muted-foreground">
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Filtered content */}
        <div
          id="stack-tabpanel"
          role="tabpanel"
          aria-labelledby={`stack-tab-${filter}`}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -4 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
              className="space-y-10"
            >
              {/* Primary stack (17) */}
              {showPrimary && (
                <div>
                  <p className="mb-5 font-mono-custom text-xs uppercase tracking-widest text-accent-blue">
                    {t.stack.labelPrimary}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {TECH_STACK.primary.map((tech) => {
                      const techName = getLocalizedText(tech.name, lang);
                      return (
                        <Badge
                          key={techName}
                          variant="outline"
                          className="gap-2.5 whitespace-nowrap rounded-xl bg-surface px-3.5 py-2.5 font-display text-sm text-foreground transition-colors duration-200 hover:border-border-light hover:bg-secondary/40"
                        >
                          <span
                            className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground/[0.03]"
                            style={{ color: tech.color }}
                          >
                            <tech.icon size={16} aria-hidden="true" />
                          </span>
                          <span>{techName}</span>
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Secondary stack (5) */}
              {showSecondary && (
                <div
                  className={
                    showPrimary ? "border-t border-border pt-8" : undefined
                  }
                >
                  <p className="mb-5 font-mono-custom text-xs uppercase tracking-widest text-muted-foreground">
                    {t.stack.labelSecondary}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {TECH_STACK.secondary.map((tech) => {
                      const techName = getLocalizedText(tech.name, lang);
                      return (
                        <Badge
                          key={techName}
                          variant="outline"
                          className="gap-2.5 whitespace-nowrap rounded-xl bg-surface px-3.5 py-2.5 font-display text-sm text-foreground transition-colors duration-200 hover:border-border-light hover:bg-secondary/40"
                        >
                          <span
                            className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground/[0.03]"
                            style={{ color: tech.color }}
                          >
                            <tech.icon size={16} aria-hidden="true" />
                          </span>
                          <span>{techName}</span>
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
