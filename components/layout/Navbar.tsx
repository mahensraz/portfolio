"use client";

import { useLang, type Lang } from "@/context/LanguageContext";
import { NAV_HREF, PROFILE } from "@/lib/data";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { lang, setLang, t } = useLang();
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

  const getLangFlag = (value: Lang) => (value === "en" ? "🇨🇦" : "🇫🇷");

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
          background: scrolled ? "rgba(8,8,16,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(30,30,53,0.8)"
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
                  "linear-gradient(135deg,rgba(79,142,247,0.2),rgba(155,92,246,0.2))",
                border: "1px solid rgba(79,142,247,0.25)",
              }}
            >
              {!imageError ? (
                <Image
                  src={PROFILE.image}
                  alt="Mahen's Raz"
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
                <button
                  key={link.href}
                  onClick={() => go(link.href)}
                  className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 ${isActive ? "text-text-primary" : "text-text-secondary hover:text-text-primary"}`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg bg-surface-2"
                      style={{ border: "1px solid rgba(79,142,247,0.2)" }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </div>
          {/* ── Right actions ── */}
          <div className="flex items-center gap-2">
            {/* Available badge */}
            <div className="hidden items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 sm:flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              <span className="font-mono-custom text-[11px] text-emerald-400">
                {t.nav.available}
              </span>
            </div>

            {/* Language toggle */}
            <div
              className="flex items-center overflow-hidden rounded-lg border border-border-light bg-surface p-0.5 text-xs font-medium"
              aria-label="Language switcher"
            >
              {(["en", "fr"] as Lang[]).map((value) => {
                const isActive = lang === value;

                return (
                  <motion.button
                    key={value}
                    onClick={() => setLang(value)}
                    className={`flex min-w-10 items-center justify-center rounded-md px-2.5 py-1.5 transition-all ${isActive ? "bg-accent-blue/10 text-accent-blue" : "text-text-secondary hover:text-text-primary"}`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    title={`Switch to ${value.toUpperCase()}`}
                    aria-label={`Switch language to ${value.toUpperCase()}`}
                  >
                    <span className="text-sm leading-none">
                      {getLangFlag(value)}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Hire me */}
            <a
              href={`mailto:${PROFILE.email}`}
              className="hidden rounded-lg border border-border-light bg-surface px-4 py-2 text-sm font-medium text-text-primary transition-all hover:border-accent-blue/30 hover:bg-accent-blue/5 md:block"
            >
              {t.nav.hire}
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-secondary transition-all hover:border-border-light hover:text-text-primary md:hidden"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
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
              <div className="mt-2 flex gap-2">
                {(["en", "fr"] as Lang[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-xl border py-2.5 font-mono-custom text-sm uppercase tracking-widest transition-all ${lang === l ? "border-accent-blue/40 bg-accent-blue/10 text-accent-blue" : "border-border bg-surface text-text-muted"}`}
                    aria-label={`Switch language to ${l.toUpperCase()}`}
                  >
                    <span className="text-sm leading-none">
                      {getLangFlag(l)}
                    </span>
                    <span>{l.toUpperCase()}</span>
                  </button>
                ))}
              </div>

              <div className="mt-4 border-t border-border pt-5">
                <a
                  href={`mailto:${PROFILE.email}`}
                  onClick={() => setMenuOpen(false)}
                  className="block w-full rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple px-5 py-3 text-center font-medium text-white"
                >
                  {t.nav.hire}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
