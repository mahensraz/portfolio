"use client";

import ScrollReveal, {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/ScrollReveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLang } from "@/context/LanguageContext";
import {
  getLocalizedList,
  getLocalizedText,
  PROFILE,
  PROJECTS,
} from "@/lib/data";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  ImageOff,
  Images,
  Lock,
  Tag,
  X,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const CURRENT_PROJECT_ID = "hoticket";
const KEY_PROJECT_ORDER = ["impot-local", "netpass"] as const;
const OTHER_PROJECT_ORDER = ["complaint-system", "agri-connect"] as const;

/**
 * Curated landscape screenshot indices per project for the cover slideshow.
 * Indices always refer to the exact positions inside `project.images` so
 * opening the gallery lands on the exact visible cover image.
 * For GeoHetra (`impot-local`), only the 5 landscape web captures (0..4) are
 * cycled on the 16:10 cover while all 17 captures remain in the full gallery.
 */
const COVER_INDICES_BY_ID: Record<string, number[]> = {
  hoticket: [0, 1, 2, 4, 5],
  "impot-local": [0, 1, 2, 3, 4],
  netpass: [0, 1, 2, 10, 11],
  "complaint-system": [0, 6, 7, 8, 9],
  "agri-connect": [0, 1, 2, 3, 6],
};

const SLIDESHOW_INTERVAL_MS = 4500;
const MODAL_DESC_CHAR_LIMIT = 200;

function truncateAtWord(text: string, limit: number): string {
  if (text.length <= limit) return text;
  const sliced = text.slice(0, limit);
  const lastSpace = sliced.lastIndexOf(" ");
  return `${(lastSpace > 0 ? sliced.slice(0, lastSpace) : sliced).trimEnd()}…`;
}

const PROJECT_GRADIENTS: Record<string, string> = {
  hoticket: "from-primary/15 via-accent-purple/10 to-transparent",
  netpass: "from-blue-600/20 via-cyan-500/10 to-transparent",
  "impot-local": "from-amber-600/20 via-orange-500/10 to-transparent",
  "complaint-system": "from-purple-600/20 via-pink-500/10 to-transparent",
  "agri-connect": "from-emerald-600/20 via-lime-500/10 to-transparent",
};

const DEFAULT_PROJECT_GRADIENT =
  "from-accent-blue/20 via-accent-purple/10 to-transparent";

function getProjectGradient(projectId: string): string {
  return PROJECT_GRADIENTS[projectId] ?? DEFAULT_PROJECT_GRADIENT;
}

function getCoverSlideIndices(project: Project): number[] {
  if (project.images.length === 0) return [];
  const configured = COVER_INDICES_BY_ID[project.id];
  if (configured) {
    const valid = configured.filter((i) => i >= 0 && i < project.images.length);
    if (valid.length > 0) return valid;
  }
  const maxSlides = Math.min(5, project.images.length);
  return Array.from({ length: maxSlides }, (_, i) => i);
}

/* ─── Image carousel used inside the modal ─────────────────────────────────── */
function ImageCarousel({
  images,
  title,
  initialIndex = 0,
}: {
  images: string[];
  title: string;
  initialIndex?: number;
}) {
  const { t } = useLang();
  const safeInitial =
    images.length > 0
      ? Math.max(0, Math.min(initialIndex, images.length - 1))
      : 0;
  const [idx, setIdx] = useState(safeInitial);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});

  useEffect(() => {
    setIdx(safeInitial);
  }, [safeInitial]);

  const prev = useCallback(
    () => setIdx((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );
  const next = useCallback(
    () => setIdx((i) => (i + 1) % images.length),
    [images.length],
  );

  if (images.length === 0) {
    return (
      <div className="flex h-48 flex-col items-center justify-center gap-3 rounded-xl border border-border bg-surface text-text-muted">
        <ImageOff size={28} className="opacity-40" />
        <p className="text-xs">{t.projects.noScreenshots}</p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-surface">
      {/* Image or placeholder */}
      <div className="relative h-64 w-full overflow-hidden bg-background/40 sm:h-[28rem]">
        <AnimatePresence mode="wait">
          {!imgError[idx] ? (
            <motion.div
              key={idx}
              className="absolute inset-0 p-2 sm:p-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              <Image
                src={images[idx]}
                alt={`${title} — ${t.projects.screenshots} ${idx + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, 768px"
                className="object-contain"
                onError={() => setImgError((e) => ({ ...e, [idx]: true }))}
              />
            </motion.div>
          ) : (
            <motion.div
              key={`err-${idx}`}
              className="flex h-full flex-col items-center justify-center gap-2 text-text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ImageOff size={24} className="opacity-30" />
              <p className="font-mono-custom text-[11px] opacity-40">
                {images[idx]}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nav arrows — only if multiple images */}
        {images.length > 1 && (
          <>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={prev}
              aria-label={t.projects.prevImg}
              className="absolute left-2 top-1/2 h-7 w-7 -translate-y-1/2 rounded-lg bg-background/70 text-foreground/80 backdrop-blur-sm transition-all hover:bg-background/90 hover:text-foreground"
            >
              <ChevronLeft size={14} />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={next}
              aria-label={t.projects.nextImg}
              className="absolute right-2 top-1/2 h-7 w-7 -translate-y-1/2 rounded-lg bg-background/70 text-foreground/80 backdrop-blur-sm transition-all hover:bg-background/90 hover:text-foreground"
            >
              <ChevronRight size={14} />
            </Button>
          </>
        )}
      </div>

      {/* Dots + counter */}
      {images.length > 1 && (
        <div className="flex items-center justify-center gap-2 px-4 py-2.5">
          <span className="font-mono-custom text-[10px] text-text-muted">
            {idx + 1} / {images.length}
          </span>
          <div className="flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`${title} ${i + 1}`}
                onClick={() => setIdx(i)}
                className={`h-1.5 rounded-full transition-all ${i === idx ? "w-4 bg-accent-blue" : "w-1.5 bg-border-light hover:bg-text-muted"}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Cover stage with accessible gallery trigger & discreet slideshow ─────── */
function ProjectCover({
  project,
  featuredLayout,
  isGalleryOpen,
  onOpenGallery,
}: {
  project: Project;
  featuredLayout?: boolean;
  isGalleryOpen: boolean;
  onOpenGallery: (project: Project, realImageIndex: number) => void;
}) {
  const { t, lang } = useLang();
  const projectTitle = getLocalizedText(project.title, lang);
  const stageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(stageRef, { amount: 0.25 });
  const prefersReducedMotion = useReducedMotion();

  const coverIndices = useMemo(() => getCoverSlideIndices(project), [project]);
  const [slidePos, setSlidePos] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [failedIndices, setFailedIndices] = useState<Record<number, boolean>>(
    {},
  );

  const hasImages = coverIndices.length > 0;
  const currentRealIndex = hasImages
    ? (coverIndices[slidePos % coverIndices.length] ?? 0)
    : 0;
  const currentSrc = hasImages ? project.images[currentRealIndex] : undefined;

  const canAutoPlay =
    coverIndices.length > 1 &&
    isInView &&
    !isHovered &&
    !isFocused &&
    !isGalleryOpen &&
    !prefersReducedMotion;

  useEffect(() => {
    if (!canAutoPlay) return;
    const timer = window.setInterval(() => {
      setSlidePos((prev) => (prev + 1) % coverIndices.length);
    }, SLIDESHOW_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [canAutoPlay, coverIndices.length]);

  /* Honest, sober placeholder for projects without screenshots (e.g. HOTICKET) */
  if (!hasImages) {
    return (
      <div
        ref={stageRef}
        className={cn(
          "flex flex-col justify-center border-b border-border bg-secondary/20 p-4 sm:p-5",
          featuredLayout && "lg:col-span-7 lg:border-b-0 lg:border-r lg:p-6",
        )}
      >
        <div className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-background/60 px-6 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground">
            <Images size={18} aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <p className="font-display text-sm font-medium text-foreground">
              {projectTitle}
            </p>
            <p className="max-w-xs text-xs leading-relaxed text-muted-foreground">
              {t.projects.screenshotsSoon}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={stageRef}
      className={cn(
        "flex flex-col border-b border-border bg-secondary/20 p-3 sm:p-4",
        featuredLayout && "lg:col-span-7 lg:border-b-0 lg:border-r lg:p-5",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        type="button"
        onClick={() => onOpenGallery(project, currentRealIndex)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        aria-label={`${t.projects.openGallery} — ${projectTitle} (${project.images.length} ${t.projects.screenshotsCount})`}
        className="group/cover relative block aspect-[16/10] w-full cursor-pointer overflow-hidden rounded-md border border-border/80 bg-background/70 text-left transition-colors duration-200 hover:border-border-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
      >
        <div className="absolute inset-0" aria-live="off">
          <AnimatePresence mode="wait" initial={false}>
            {currentSrc && !failedIndices[currentRealIndex] ? (
              <motion.div
                key={currentRealIndex}
                className="absolute inset-0 p-1.5"
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.4,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src={currentSrc}
                  alt={`${projectTitle} — ${t.projects.screenshots} ${currentRealIndex + 1}`}
                  fill
                  sizes={
                    featuredLayout
                      ? "(max-width: 1024px) 100vw, 58vw"
                      : "(max-width: 768px) 100vw, 48vw"
                  }
                  className="object-contain"
                  onError={() =>
                    setFailedIndices((prev) => ({
                      ...prev,
                      [currentRealIndex]: true,
                    }))
                  }
                />
              </motion.div>
            ) : (
              <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                <ImageOff size={22} className="opacity-40" />
              </div>
            )}
          </AnimatePresence>
        </div>
      </button>

      {/* Discreet indicators and total count below the screenshot (never over it) */}
      <div className="mt-2.5 flex items-center justify-between gap-3 px-0.5">
        <div
          className="flex items-center gap-1.5"
          aria-hidden="true"
        >
          {coverIndices.length > 1 &&
            coverIndices.map((realIdx, pos) => (
              <span
                key={realIdx}
                className={cn(
                  "h-1 rounded-full transition-all duration-300",
                  pos === slidePos % coverIndices.length
                    ? "w-4 bg-primary"
                    : "w-1.5 bg-border-light",
                )}
              />
            ))}
        </div>

        <span className="inline-flex items-center gap-1.5 font-mono-custom text-[11px] text-muted-foreground">
          <Images size={12} aria-hidden="true" />
          <span>
            {project.images.length} {t.projects.screenshotsCount}
          </span>
        </span>
      </div>
    </div>
  );
}

/* ─── Project card ──────────────────────────────────────────────────────────── */
function ProjectCard({
  project,
  onExpand,
  isGalleryOpen,
  featuredLayout = false,
  isInProgress = false,
}: {
  project: Project;
  onExpand: (p: Project, initialIndex?: number) => void;
  isGalleryOpen: boolean;
  featuredLayout?: boolean;
  isInProgress?: boolean;
}) {
  const { t, lang } = useLang();
  const projectTitle = getLocalizedText(project.title, lang);
  const projectCategory = getLocalizedText(project.category, lang);
  const projectTags = getLocalizedList(project.tags, lang);
  const visibleTags = featuredLayout
    ? projectTags.slice(0, 6)
    : projectTags.slice(0, 4);
  const hiddenTagCount = projectTags.length - visibleTags.length;

  return (
    <StaggerItem className={cn("h-full", featuredLayout && "md:col-span-2")}>
      <article className="h-full">
        <Card
          className={cn(
            "flex h-full flex-col overflow-hidden transition-colors duration-200 hover:border-border-light",
            featuredLayout && "lg:grid lg:grid-cols-12",
          )}
        >
          {/* Cover stage */}
          <ProjectCover
            project={project}
            featuredLayout={featuredLayout}
            isGalleryOpen={isGalleryOpen}
            onOpenGallery={(p, idx) => onExpand(p, idx)}
          />

          {/* Content */}
          <div
            className={cn(
              "flex flex-1 flex-col",
              featuredLayout && "lg:col-span-5",
            )}
          >
            <CardHeader
              className={cn(
                "space-y-2.5 p-5 pb-3",
                featuredLayout && "lg:p-6 lg:pb-3",
              )}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono-custom text-[11px] uppercase tracking-wider text-muted-foreground">
                  {projectCategory}
                </span>

                {isInProgress && (
                  <Badge
                    variant="subtle"
                    className="whitespace-nowrap rounded-full px-2.5 py-0.5 font-mono-custom text-[11px]"
                  >
                    {t.projects.inProgressBadge}
                  </Badge>
                )}
              </div>

              <CardTitle
                className={cn(
                  "text-lg font-semibold tracking-tight text-foreground",
                  featuredLayout && "text-xl lg:text-2xl",
                )}
              >
                {projectTitle}
              </CardTitle>

              <CardDescription className="pt-0.5 text-sm leading-relaxed text-muted-foreground">
                {project.description[lang]}
              </CardDescription>
            </CardHeader>

            <CardContent
              className={cn(
                "flex-1 px-5 pb-4 pt-1",
                featuredLayout && "lg:px-6",
              )}
            >
              <div className="flex flex-wrap gap-1.5">
                {visibleTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="whitespace-nowrap border-border/80 bg-secondary/40 px-2 py-0.5 font-mono-custom text-[11px] font-normal text-muted-foreground"
                  >
                    {tag}
                  </Badge>
                ))}
                {hiddenTagCount > 0 && (
                  <Badge
                    variant="outline"
                    className="whitespace-nowrap border-border/80 bg-secondary/40 px-2 py-0.5 font-mono-custom text-[11px] font-normal text-muted-foreground"
                  >
                    +{hiddenTagCount}
                  </Badge>
                )}
              </div>
            </CardContent>

            <CardFooter
              className={cn(
                "mt-auto flex-wrap items-center gap-2 border-t border-border/60 px-5 py-4",
                featuredLayout && "lg:px-6",
              )}
            >
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => onExpand(project, 0)}
                className="h-9 flex-1 gap-1.5 rounded-lg border border-border-light bg-surface-2 py-2 text-xs text-text-secondary transition-all hover:border-border hover:bg-surface-2 hover:text-text-primary"
              >
                {t.projects.viewDetails} <ArrowRight size={12} />
              </Button>

              {project.github ? (
                <Button
                  asChild
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-lg border-border-light bg-transparent text-text-muted transition-all hover:border-accent-blue/40 hover:bg-accent-blue/5 hover:text-accent-blue"
                >
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={t.projects.viewGithub}
                  >
                    <Github size={14} />
                  </a>
                </Button>
              ) : (
                <span className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-background/50 px-3 font-mono-custom text-[11px] text-muted-foreground">
                  <Lock size={12} aria-hidden="true" />
                  <span>{t.projects.privateRepo}</span>
                </span>
              )}

              {project.link && (
                <Button
                  asChild
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-lg border-border-light bg-transparent text-text-muted transition-all hover:border-border hover:bg-transparent hover:text-text-primary"
                >
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={t.projects.viewLive}
                  >
                    <ExternalLink size={14} />
                  </a>
                </Button>
              )}
            </CardFooter>
          </div>
        </Card>
      </article>
    </StaggerItem>
  );
}

/* ─── Project detail modal ──────────────────────────────────────────────────── */
function ProjectModal({
  project,
  initialIndex,
  onClose,
}: {
  project: Project;
  initialIndex: number;
  onClose: () => void;
}) {
  const { t, lang } = useLang();
  const [showFullDesc, setShowFullDesc] = useState(false);

  const projectTitle = getLocalizedText(project.title, lang);
  const projectCategory = getLocalizedText(project.category, lang);
  const projectTags = getLocalizedList(project.tags, lang);
  const fullDescription = project.longDescription[lang];
  const isTruncatable = fullDescription.length > MODAL_DESC_CHAR_LIMIT;
  const displayedDescription =
    showFullDesc || !isTruncatable
      ? fullDescription
      : truncateAtWord(fullDescription, MODAL_DESC_CHAR_LIMIT);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto p-4 pt-10 pb-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Panel */}
      <motion.div
        className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-surface shadow-card"
        initial={{ scale: 0.95, y: 24, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 24, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label={t.projects.close}
          className="absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-lg bg-surface/80 text-text-secondary backdrop-blur-sm transition-colors hover:bg-surface-2 hover:text-text-primary"
        >
          <X size={14} />
        </button>

        {/* Header */}
        <div
          className={`relative flex h-28 items-center gap-4 border-b border-border bg-gradient-to-br ${getProjectGradient(project.id)} px-6`}
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(hsl(var(--foreground) / 0.08) 1px,transparent 1px),linear-gradient(90deg,hsl(var(--foreground) / 0.08) 1px,transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <span className="relative text-5xl">{project.icon}</span>
          <div className="relative">
            <p className="font-mono-custom text-[11px] text-muted-foreground">
              {projectCategory}
            </p>
            <h3 className="font-display text-2xl font-bold text-foreground">
              {projectTitle}
            </h3>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-6 p-6">
          {/* Description with read more / show less toggle so screenshots stay visible immediately */}
          <p className="whitespace-pre-line text-sm leading-7 text-text-secondary">
            {displayedDescription}
            {isTruncatable && (
              <button
                type="button"
                onClick={() => setShowFullDesc((prev) => !prev)}
                aria-expanded={showFullDesc}
                className="ml-1.5 inline font-medium text-primary underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {showFullDesc ? t.projects.readLess : t.projects.readMore}
              </button>
            )}
          </p>

          {/* Screenshots section */}
          <div>
            <p className="mb-3 flex items-center gap-2 font-mono-custom text-xs uppercase tracking-widest text-accent-blue">
              <span className="h-px w-4 bg-accent-blue/50" />
              {t.projects.screenshots}
            </p>
            <ImageCarousel
              images={project.images}
              title={projectTitle}
              initialIndex={initialIndex}
            />
          </div>

          {/* Tech stack */}
          <div>
            <p className="mb-3 flex items-center gap-2 font-mono-custom text-xs uppercase tracking-widest text-text-muted">
              <Tag size={11} />
              {t.projects.tags}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {projectTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="subtle"
                  className="whitespace-nowrap rounded px-2 py-0.5 font-mono-custom text-[11px] tracking-wide"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action links */}
          <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row">
            {project.github ? (
              <Button
                asChild
                variant="secondary"
                className="h-auto flex-1 gap-2 rounded-xl border border-border-light bg-surface-2 py-3 text-sm font-semibold text-text-primary transition-all hover:border-accent-blue/30 hover:bg-accent-blue/5"
              >
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={16} />
                  {t.projects.viewGithub}
                  <ExternalLink size={12} className="text-text-muted" />
                </a>
              </Button>
            ) : (
              <div className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-surface-2 py-3 text-xs text-text-muted">
                <Lock size={13} aria-hidden="true" />
                <span>{t.projects.privateRepo}</span>
              </div>
            )}
            {project.link && (
              <Button
                asChild
                variant="gradient"
                className="h-auto flex-1 gap-2 rounded-xl py-3 text-sm font-semibold"
              >
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={15} />
                  {t.projects.viewLive}
                </a>
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Section ───────────────────────────────────────────────────────────────── */
export default function Projects() {
  const { t } = useLang();
  const [expanded, setExpanded] = useState<{
    project: Project;
    initialIndex: number;
  } | null>(null);

  const handleExpand = useCallback((project: Project, initialIndex = 0) => {
    setExpanded({ project, initialIndex });
  }, []);

  const currentProject = PROJECTS.find((p) => p.id === CURRENT_PROJECT_ID);

  const keyProjects = KEY_PROJECT_ORDER.map((id) =>
    PROJECTS.find((p) => p.id === id),
  ).filter((p): p is Project => Boolean(p));

  const otherProjects = OTHER_PROJECT_ORDER.map((id) =>
    PROJECTS.find((p) => p.id === id),
  ).filter((p): p is Project => Boolean(p));

  const knownIds = new Set<string>([
    CURRENT_PROJECT_ID,
    ...KEY_PROJECT_ORDER,
    ...OTHER_PROJECT_ORDER,
  ]);
  const remainingProjects = PROJECTS.filter((p) => !knownIds.has(p.id));

  const isGalleryOpen = Boolean(expanded);

  return (
    <>
      <section id="projects" className="section-padding">
        <div className="container-section">
          <ScrollReveal className="mb-14">
            <div className="flex items-center gap-3">
              <span className="font-mono-custom text-xs text-accent-blue">
                {t.projects.sectionNum}
              </span>
              <h2 className="font-display text-3xl font-bold text-text-primary lg:text-4xl">
                {t.projects.sectionTitle}
              </h2>
              <div className="ml-4 h-px flex-1 bg-border" />
            </div>
            <p className="mt-4 max-w-2xl text-base text-text-secondary">
              {t.projects.sectionDesc}
            </p>
          </ScrollReveal>

          <div className="space-y-12">
            {/* Row 1: HOTICKET (Current M2 internship spotlight) */}
            {currentProject && (
              <div className="space-y-4">
                <p className="font-mono-custom text-xs uppercase tracking-widest text-muted-foreground">
                  {t.projects.groupCurrent}
                </p>
                <StaggerContainer className="grid gap-6 md:grid-cols-2" delay={0.05}>
                  <ProjectCard
                    project={currentProject}
                    onExpand={handleExpand}
                    isGalleryOpen={isGalleryOpen}
                    featuredLayout
                    isInProgress
                  />
                </StaggerContainer>
              </div>
            )}

            {/* Row 2: Key projects (GeoHetra & NetPass) */}
            {keyProjects.length > 0 && (
              <div className="space-y-4">
                <p className="font-mono-custom text-xs uppercase tracking-widest text-muted-foreground">
                  {t.projects.groupKey}
                </p>
                <StaggerContainer
                  className="grid gap-6 md:grid-cols-2"
                  delay={0.08}
                  staggerDelay={0.08}
                >
                  {keyProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onExpand={handleExpand}
                      isGalleryOpen={isGalleryOpen}
                    />
                  ))}
                </StaggerContainer>
              </div>
            )}

            {/* Row 3: Other projects (Complaint_app & AgriConnect) */}
            {(otherProjects.length > 0 || remainingProjects.length > 0) && (
              <div className="space-y-4">
                <p className="font-mono-custom text-xs uppercase tracking-widest text-muted-foreground">
                  {t.projects.groupOther}
                </p>
                <StaggerContainer
                  className="grid gap-6 md:grid-cols-2"
                  delay={0.08}
                  staggerDelay={0.08}
                >
                  {[...otherProjects, ...remainingProjects].map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onExpand={handleExpand}
                      isGalleryOpen={isGalleryOpen}
                    />
                  ))}
                </StaggerContainer>
              </div>
            )}
          </div>

          <ScrollReveal delay={0.25} className="mt-12 text-center">
            <Button
              asChild
              variant="outline"
              className="h-auto gap-2 rounded-xl border-border-light bg-surface px-6 py-3 text-sm font-medium text-text-secondary transition-all hover:border-border hover:bg-surface hover:text-text-primary"
            >
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={15} />
                {t.projects.seeMore}
                <ArrowRight size={13} className="ml-1" />
              </a>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      <AnimatePresence>
        {expanded && (
          <ProjectModal
            project={expanded.project}
            initialIndex={expanded.initialIndex}
            onClose={() => setExpanded(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
