"use client";

import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { PROFILE } from "@/lib/data";
import { useLang } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="relative border-t border-border bg-background">
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,rgba(79,142,247,0.4) 30%,rgba(155,92,246,0.4) 70%,transparent)" }} />

      <div className="container-section py-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="flex flex-col items-center gap-2 md:items-start">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold font-display"
                style={{ background: "linear-gradient(135deg,rgba(79,142,247,0.2),rgba(155,92,246,0.2))", border: "1px solid rgba(79,142,247,0.25)" }}>
                <span className="gradient-text">MR</span>
              </div>
              <span className="font-display font-semibold text-text-primary">{PROFILE.name}</span>
            </div>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {[
              { icon: <Github size={16} />,   href: PROFILE.github,              label: "GitHub",   external: true },
              { icon: <Linkedin size={16} />, href: PROFILE.linkedin,            label: "LinkedIn", external: true },
              { icon: <Mail size={16} />,     href: `mailto:${PROFILE.email}`,  label: "Email",    external: false },
            ].map((s) => (
              <a key={s.label} href={s.href}
                target={s.external ? "_blank" : undefined}
                rel={s.external ? "noopener noreferrer" : undefined}
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-muted transition-all hover:border-border-light hover:text-text-primary">
                {s.icon}
              </a>
            ))}
          </div>

          {/* Back to top */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 text-xs text-text-muted transition-colors hover:text-text-primary">
            {t.footer.backToTop}
            <span className="flex h-6 w-6 items-center justify-center rounded-md border border-border"><ArrowUp size={12} /></span>
          </button>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center">
          <p className="font-mono-custom text-xs text-text-muted">
            © {new Date().getFullYear()} Mahens_Rz. {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
