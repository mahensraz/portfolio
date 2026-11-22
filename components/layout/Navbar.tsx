"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLang, type Lang } from "@/context/LanguageContext";
import { NAV_HREF, PROFILE } from "@/lib/data";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Globe, Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const prefersReducedMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const navItems = [
    { label: t.nav.about, href: NAV_HREF.about },
    { label: t.nav.stack, href: NAV_HREF.stack },
    { label: t.nav.projects, href: NAV_HREF.projects },
    { label: t.nav.experience, href: NAV_HREF.experience },
    { label: t.nav.contact, href: NAV_HREF.contact },
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = Object.values(NAV_HREF).map((h) => h.replace("#", ""));
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const go = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const langOptions: { value: Lang; code: string; label: string }[] = [
    { value: "en", code: "EN", label: "English" },
    { value: "fr", code: "FR", label: "Français" },
  ];

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.6,
          delay: 1.9,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
        style={{
          background: scrolled ? "hsl(var(--background) / 0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid hsl(var(--border) / 0.8)"
            : "1px solid transparent",
        }}
      >
        <div className="container-section flex h-16 items-center justify-between">
          {/* ── Logo ── */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center gap-2.5 focus-visible:outline-none"
          >
            <div
              className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg text-sm font-bold font-display transition-all group-hover:scale-105"
              style={{
                background:
                  "linear-gradient(135deg,hsl(var(--primary) / 0.2),hsl(var(--accent-purple) / 0.2))",
                border: "1px solid hsl(var(--primary) / 0.25)",
              }}
            >
              {!imageError ? (
                <Image
                  src={PROFILE.image}
                  alt={PROFILE.name}
                  fill
                  className="object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <span className="gradient-text">MR</span>
              )}
            </div>

            <span className="hidden font-display text-sm font-semibold text-text-primary sm:block">
              {PROFILE.name}
            </span>
          </button>
          {/* ── Desktop links ── */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((link) => {
              const isActive = active === link.href.replace("#", "");
              return (
                <Button
                  key={link.href}
                  type="button"
                  variant="ghost"
                  onClick={() => go(link.href)}
                  className={`relative h-auto rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 hover:bg-transparent ${isActive ? "text-text-primary hover:text-text-primary" : "text-text-secondary hover:text-text-primary"}`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg border border-primary/20 bg-surface-2"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Button>
              );
            })}
          </div>
          {/* ── Right actions ── */}
          <div className="flex items-center gap-2">
            {/* Available badge */}
            <Badge
              variant="success"
              className="hidden whitespace-nowrap rounded-full px-3 py-1 font-mono-custom text-[11px] sm:inline-flex"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
              <span>{t.nav.available}</span>
            </Badge>

            {/* Language toggle */}
            <div
              role="group"
              aria-label={
                lang === "fr" ? "Sélecteur de langue" : "Language switcher"
              }
              className="inline-flex h-9 items-center gap-0.5 rounded-lg border border-border bg-surface/80 p-1"
            >
              <Globe
                size={13}
                aria-hidden="true"
                className="ml-1.5 mr-1 shrink-0 text-text-muted"
              />
              {langOptions.map((option) => {
                const isActive = lang === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setLang(option.value)}
                    aria-pressed={isActive}
                    title={option.label}
                    aria-label={option.label}
                    className={`relative flex h-7 items-center justify-center rounded-md px-2.5 font-mono-custom text-[11px] font-medium tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      isActive
                        ? "text-text-primary"
                        : "text-text-muted hover:text-text-secondary"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-lang-active"
                        className="absolute inset-0 rounded-md border border-border-light/80 bg-surface-2"
                        transition={
                          prefersReducedMotion
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 420, damping: 32 }
                        }
                      />
                    )}
                    <span className="relative z-10">{option.code}</span>
                  </button>
                );
              })}
            </div>

            {/* Hire me */}
            <Button
              asChild
              variant="outline"
              className="hidden h-auto rounded-lg border-border-light bg-surface px-4 py-2 text-sm text-text-primary transition-all hover:border-accent-blue/30 hover:bg-accent-blue/5 hover:text-text-primary md:inline-flex"
            >
              <a href={`mailto:${PROFILE.email}`}>{t.nav.hire}</a>
            </Button>

            {/* Hamburger */}
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setMenuOpen(!menuOpen)}
              className="h-9 w-9 rounded-lg border-border bg-transparent text-text-secondary transition-all hover:border-border-light hover:bg-transparent hover:text-text-primary md:hidden"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-background pt-16 md:hidden"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
          >
            <div className="container-section flex flex-col gap-1 pt-6">
              {navItems.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => go(link.href)}
                  className="flex items-center justify-between rounded-xl border border-transparent px-4 py-4 text-left text-lg font-medium text-text-secondary transition-colors hover:border-border hover:text-text-primary"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  {link.label}
                  <span className="font-mono-custom text-xs text-text-muted">
                    0{i + 1}
                  </span>
                </motion.button>
              ))}

              {/* Mobile lang toggle */}
              <div
                role="group"
                aria-label={
                  lang === "fr" ? "Sélecteur de langue" : "Language switcher"
                }
                className="mt-2 grid grid-cols-2 gap-1 rounded-xl border border-border bg-surface p-1"
              >
                {langOptions.map((option) => {
                  const isActive = lang === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setLang(option.value)}
                      aria-pressed={isActive}
                      aria-label={option.label}
                      className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        isActive
                          ? "border border-border-light/80 bg-surface-2 text-text-primary"
                          : "border border-transparent text-text-muted hover:text-text-primary"
                      }`}
                    >
                      <span className="font-mono-custom text-xs tracking-wider">
                        {option.code}
                      </span>
                      <span className="text-xs text-text-secondary">
                        {option.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 border-t border-border pt-5">
                <Button
                  asChild
                  variant="gradient"
                  className="h-auto w-full rounded-xl bg-gradient-to-r px-5 py-3 text-base"
                >
                  <a
                    href={`mailto:${PROFILE.email}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {t.nav.hire}
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
