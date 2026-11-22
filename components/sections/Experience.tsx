"use client";

import { Briefcase, GraduationCap, Code2 } from "lucide-react";
import ScrollReveal, {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/ScrollReveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  EXPERIENCE,
  getLocalizedList,
  getLocalizedText,
  PROFILE,
} from "@/lib/data";
import { useLang } from "@/context/LanguageContext";
import type { ExperienceItem } from "@/types";

const WORK_PROJECT_ORDER = [
  "hoticket-internship",
  "netpass-freelance",
  "geohetra-freelance",
  "agriconnect-school",
  "internship-takalou",
] as const;

const EDUCATION_ORDER = ["master2", "licence", "bac"] as const;

const TYPE_ICON = {
  work: <Briefcase size={12} aria-hidden="true" />,
  project: <Code2 size={12} aria-hidden="true" />,
  education: <GraduationCap size={12} aria-hidden="true" />,
};

const TYPE_COLOR = {
  work: "text-primary",
  project: "text-accent-purple",
  education: "text-accent-cyan",
};

function sortByOrder(items: ExperienceItem[], order: readonly string[]) {
  const rank = new Map(order.map((id, index) => [id, index]));
  return [...items].sort((a, b) => {
    const rankA = rank.get(a.id) ?? Number.MAX_SAFE_INTEGER;
    const rankB = rank.get(b.id) ?? Number.MAX_SAFE_INTEGER;
    return rankA - rankB;
  });
}

function TimelineRow({
  item,
  compact = false,
}: {
  item: ExperienceItem;
  compact?: boolean;
}) {
  const { lang, t } = useLang();
  const typeLabel =
    item.type === "work"
      ? t.experience.legend.work
      : item.type === "project"
        ? t.experience.legend.project
        : t.experience.legend.education;

  return (
    <StaggerItem>
      <div
        className={`grid gap-2.5 transition-colors duration-200 hover:bg-card/40 md:-mx-4 md:grid-cols-[176px_1fr] md:gap-8 md:rounded-lg md:px-4 ${
          compact ? "py-5" : "py-6"
        }`}
      >
        {/* Left: Period + subtle type marker */}
        <div className="flex flex-wrap items-center justify-between gap-2 md:flex-col md:items-start md:justify-start md:gap-1.5">
          <span className="font-mono-custom text-xs text-muted-foreground">
            {item.period[lang]}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 font-mono-custom text-[11px] ${TYPE_COLOR[item.type]}`}
          >
            {TYPE_ICON[item.type]}
            <span>{typeLabel}</span>
          </span>
        </div>

        {/* Right: Role, organization, description, discrete tags */}
        <div className="min-w-0 space-y-2.5">
          <div>
            <h3 className="font-display text-base font-semibold leading-snug text-foreground">
              {item.role[lang]}
            </h3>
            <p className="mt-0.5 text-sm font-medium text-primary">
              {getLocalizedText(item.company, lang)}
            </p>
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">
            {item.description[lang]}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {getLocalizedList(item.tags, lang).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="whitespace-nowrap border-border/80 bg-transparent px-2 py-0.5 font-mono-custom text-[11px] font-normal text-muted-foreground"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </StaggerItem>
  );
}

export default function Experience() {
  const { t } = useLang();

  const workAndProjects = sortByOrder(
    EXPERIENCE.filter((item) => item.type !== "education"),
    WORK_PROJECT_ORDER,
  );

  const educationItems = sortByOrder(
    EXPERIENCE.filter((item) => item.type === "education"),
    EDUCATION_ORDER,
  );

  return (
    <section id="experience" className="section-padding">
      <div className="container-section">
        <ScrollReveal className="mb-14">
          <div className="flex items-center gap-3">
            <span className="font-mono-custom text-xs text-accent-blue">
              {t.experience.sectionNum}
            </span>
            <h2 className="font-display text-3xl font-bold text-text-primary lg:text-4xl">
              {t.experience.sectionTitle}
            </h2>
            <div className="ml-4 h-px flex-1 bg-border" />
          </div>
          <p className="mt-4 max-w-2xl text-base text-text-secondary">
            {t.experience.sectionDesc}
          </p>
        </ScrollReveal>

        <div className="grid gap-12 lg:grid-cols-[1fr_300px] lg:items-start">
          {/* Editorial chronology */}
          <div className="space-y-12">
            {/* Group 1: Work & Projects */}
            <div>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <p className="font-mono-custom text-xs uppercase tracking-widest text-muted-foreground">
                  {t.experience.legend.work} · {t.experience.legend.project}
                </p>
              </div>
              <StaggerContainer
                className="divide-y divide-border border-y border-border"
                delay={0.05}
                staggerDelay={0.08}
              >
                {workAndProjects.map((item) => (
                  <TimelineRow key={item.id} item={item} />
                ))}
              </StaggerContainer>
            </div>

            {/* Group 2: Education */}
            <div>
              <div className="mb-3 flex items-center justify-between gap-2">
                <p className="font-mono-custom text-xs uppercase tracking-widest text-muted-foreground">
                  {t.experience.legend.education}
                </p>
              </div>
              <StaggerContainer
                className="divide-y divide-border border-y border-border"
                delay={0.08}
                staggerDelay={0.08}
              >
                {educationItems.map((item) => (
                  <TimelineRow key={item.id} item={item} compact />
                ))}
              </StaggerContainer>
            </div>
          </div>

          {/* Single cohesive sticky sidebar Card */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ScrollReveal direction="left" delay={0.15}>
              <Card className="overflow-hidden">
              <CardHeader className="p-5 pb-4">
                <CardTitle className="text-sm font-semibold text-foreground">
                  {t.experience.profile.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-5 px-5 pb-5 pt-0">
                <dl className="divide-y divide-border/70 border-y border-border/70">
                  {[
                    {
                      label: t.experience.profile.approach,
                      value: t.experience.profile.approachVal,
                      color: "text-primary",
                    },
                    {
                      label: t.experience.profile.strength,
                      value: t.experience.profile.strengthVal,
                      color: "text-accent-purple",
                    },
                    {
                      label: t.experience.profile.interest,
                      value: t.experience.profile.interestVal,
                      color: "text-accent-cyan",
                    },
                    {
                      label: t.experience.profile.learning,
                      value: t.experience.profile.learningVal,
                      color: "text-success",
                    },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between gap-3 py-2.5"
                    >
                      <dt className="font-mono-custom text-[11px] uppercase tracking-wider text-muted-foreground">
                        {row.label}
                      </dt>
                      <dd className={`text-right text-xs font-medium ${row.color}`}>
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                {/* Inline compact legend (no separate card) */}
                <div className="space-y-2">
                  <p className="font-mono-custom text-[11px] uppercase tracking-wider text-muted-foreground">
                    {t.experience.legend.title}
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5">
                    {(["work", "project", "education"] as const).map((type) => {
                      const label =
                        type === "work"
                          ? t.experience.legend.work
                          : type === "project"
                            ? t.experience.legend.project
                            : t.experience.legend.education;
                      return (
                        <span
                          key={type}
                          className={`inline-flex items-center gap-1.5 text-xs ${TYPE_COLOR[type]}`}
                        >
                          {TYPE_ICON[type]}
                          <span className="text-muted-foreground">{label}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col items-stretch gap-3 border-t border-border bg-secondary/20 p-5">
                <div>
                  <p className="font-display text-sm font-semibold text-foreground">
                    {t.experience.cta.title}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {t.experience.cta.sub}
                  </p>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="w-full rounded-lg border-border-light bg-background text-xs font-medium text-foreground hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                >
                  <a href={`mailto:${PROFILE.email}`}>
                    {t.experience.cta.link}
                  </a>
                </Button>
              </CardFooter>
            </Card>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
