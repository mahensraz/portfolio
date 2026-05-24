"use client";

import ScrollReveal, {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/ScrollReveal";
import { useLang } from "@/context/LanguageContext";
import { PROFILE, PROJECTS } from "@/lib/data";
import type { Project } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  ImageOff,
  Tag,
  X,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";

/* ─── Image carousel used inside the modal ─────────────────────────────────── */
function ImageCarousel({ images, title }: { images: string[]; title: string }) {
  const { t } = useLang();
  const [idx, setIdx] = useState(0);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});

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
      <div className="relative h-64 w-full overflow-hidden bg-black/20 sm:h-[28rem]">
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
                alt={`${title} screenshot ${idx + 1}`}
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
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-lg bg-black/50 text-white/80 backdrop-blur-sm transition-all hover:bg-black/70 hover:text-white"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-lg bg-black/50 text-white/80 backdrop-blur-sm transition-all hover:bg-black/70 hover:text-white"
            >
              <ChevronRight size={14} />
            </button>
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

/* ─── Thumbnail preview used on the card ───────────────────────────────────── */
function CardThumbnail({ project }: { project: Project }) {
  const [imgError, setImgError] = useState(false);
  const firstImg = project.images[0];

  if (!firstImg || imgError) {
    // Fallback: gradient header with icon
    return (
      <div
        className={`relative flex h-40 w-full items-center justify-center bg-gradient-to-br ${project.gradient}`}
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.08) 1px,transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <span className="relative text-5xl">{project.icon}</span>
        <div className="absolute top-3 right-3 rounded-md border border-white/10 bg-black/30 px-2 py-0.5 font-mono-custom text-[10px] text-white/60 backdrop-blur-sm">
          {project.category}
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative h-40 w-full overflow-hidden"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
    >
      <Image
        src={firstImg}
        alt={`${project.title} preview`}
        fill
        sizes="(max-width: 640px) 100vw, 768px"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        onError={() => setImgError(true)}
      />
      {/* Overlay with category */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="absolute top-3 right-3 rounded-md border border-white/10 bg-black/40 px-2 py-0.5 font-mono-custom text-[10px] text-white/70 backdrop-blur-sm">
        {project.category}
      </div>
      {/* Image count badge */}
      {project.images.length > 1 && (
        <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-md bg-black/50 px-1.5 py-0.5 backdrop-blur-sm">
          <span className="font-mono-custom text-[10px] text-white/70">
            {project.images.length} 📸
          </span>
        </div>
      )}
    </div>
  );
}

/* ─── Project card ──────────────────────────────────────────────────────────── */
function ProjectCard({
  project,
  onExpand,
}: {
  project: Project;
  onExpand: (p: Project) => void;
}) {
  const { t, lang } = useLang();

  return (
    <StaggerItem>
      <motion.article
        className="card-shine group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:border-border-light hover:-translate-y-1"
        whileHover={{ boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}
      >
        {/* Thumbnail or gradient header */}
        <CardThumbnail project={project} />

        {/* Content */}
        <div className="flex flex-1 flex-col gap-4 p-5">
          <div>
            <h3 className="font-display text-lg font-bold text-text-primary">
              {project.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              {project.description[lang]}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="tag">+{project.tags.length - 4}</span>
            )}
          </div>

          {/* Actions */}
          <div className="mt-auto flex items-center gap-2 pt-2">
            <button
              onClick={() => onExpand(project)}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border-light bg-surface-2 py-2 text-xs font-medium text-text-secondary transition-all hover:border-border hover:text-text-primary"
            >
              {t.projects.viewDetails} <ArrowRight size={12} />
            </button>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                title={t.projects.viewGithub}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-light text-text-muted transition-all hover:border-accent-blue/40 hover:bg-accent-blue/5 hover:text-accent-blue"
              >
                <Github size={14} />
              </a>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                title={t.projects.viewLive}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-light text-text-muted transition-all hover:border-border hover:text-text-primary"
              >
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>
      </motion.article>
    </StaggerItem>
  );
}

/* ─── Project detail modal ──────────────────────────────────────────────────── */
function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const { t, lang } = useLang();

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 pt-10 pb-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm"
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
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-lg bg-surface/80 text-text-secondary backdrop-blur-sm transition-colors hover:bg-surface-2 hover:text-text-primary"
        >
          <X size={14} />
        </button>

        {/* Header */}
        <div
          className={`relative flex h-28 items-center gap-4 bg-gradient-to-br ${project.gradient} px-6`}
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.08) 1px,transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <span className="relative text-5xl">{project.icon}</span>
          <div className="relative">
            <p className="font-mono-custom text-[11px] text-white/50">
              {project.category}
            </p>
            <h3 className="font-display text-2xl font-bold text-white">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-6 p-6">
          {/* Description */}
          <p className="text-sm leading-7 text-text-secondary">
            {project.longDescription[lang]}
          </p>

          {/* Screenshots section */}
          <div>
            <p className="mb-3 flex items-center gap-2 font-mono-custom text-xs uppercase tracking-widest text-accent-blue">
              <span className="h-px w-4 bg-accent-blue/50" />
              {t.projects.screenshots}
            </p>
            <ImageCarousel images={project.images} title={project.title} />
          </div>

          {/* Tech stack */}
          <div>
            <p className="mb-3 flex items-center gap-2 font-mono-custom text-xs uppercase tracking-widest text-text-muted">
              <Tag size={11} />
              {t.projects.tags}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action links */}
          <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border-light bg-surface-2 py-3 text-sm font-semibold text-text-primary transition-all hover:border-accent-blue/30 hover:bg-accent-blue/5"
              >
                <Github size={16} />
                {t.projects.viewGithub}
                <ExternalLink size={12} className="text-text-muted" />
              </a>
            ) : (
              <div className="flex flex-1 items-center justify-center rounded-xl border border-border bg-surface-2 py-3 text-xs text-text-muted">
                {t.projects.sourceOnRequest}
              </div>
            )}
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white"
                style={{
                  background: "linear-gradient(135deg,#4f8ef7,#9b5cf6)",
                }}
              >
                <ExternalLink size={15} />
                {t.projects.viewLive}
              </a>
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
  const [expanded, setExpanded] = useState<Project | null>(null);

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

          <StaggerContainer
            className="grid gap-5 sm:grid-cols-2"
            delay={0.1}
            staggerDelay={0.1}
          >
            {PROJECTS.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onExpand={setExpanded}
              />
            ))}
          </StaggerContainer>

          <ScrollReveal delay={0.3} className="mt-12 text-center">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-border-light bg-surface px-6 py-3 text-sm font-medium text-text-secondary transition-all hover:border-border hover:text-text-primary"
            >
              <Github size={15} />
              {t.projects.seeMore}
              <ArrowRight size={13} className="ml-1" />
            </a>
          </ScrollReveal>
        </div>
      </section>

      <AnimatePresence>
        {expanded && (
          <ProjectModal project={expanded} onClose={() => setExpanded(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
