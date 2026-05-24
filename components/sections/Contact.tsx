"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin, Send, CheckCircle2, MapPin, Clock } from "lucide-react";
import ScrollReveal, { StaggerContainer, StaggerItem } from "@/components/animations/ScrollReveal";
import { PROFILE } from "@/lib/data";
import { useLang } from "@/context/LanguageContext";

type FormState = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [state, setState] = useState<FormState>("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      });

      if (!res.ok) {
        throw new Error("Contact request failed");
      }

      setState("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setState("error");
    }
  };

  const contacts = [
    { icon: <Mail size={18} />,     label: "Email",    value: PROFILE.email,                  href: `mailto:${PROFILE.email}`, color: "text-accent-blue",  bg: "bg-accent-blue/10",  border: "border-accent-blue/20" },
    { icon: <Github size={18} />,   label: "GitHub",   value: "github.com/mahensraz",          href: PROFILE.github,            color: "text-text-primary", bg: "bg-surface-2",        border: "border-border-light",  external: true },
    { icon: <Linkedin size={18} />, label: "LinkedIn", value: "linkedin.com/in/mahensraz",     href: PROFILE.linkedin,          color: "text-blue-400",     bg: "bg-blue-500/10",     border: "border-blue-500/20",   external: true },
  ];

  return (
    <section id="contact" className="section-padding">
      <div className="container-section">
        <ScrollReveal className="mb-14">
          <div className="flex items-center gap-3">
            <span className="font-mono-custom text-xs text-accent-blue">{t.contact.sectionNum}</span>
            <h2 className="font-display text-3xl font-bold text-text-primary lg:text-4xl">{t.contact.sectionTitle}</h2>
            <div className="ml-4 h-px flex-1 bg-border" />
          </div>
          <p className="mt-4 max-w-2xl text-base text-text-secondary">{t.contact.sectionDesc}</p>
        </ScrollReveal>

        <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
          {/* Form */}
          <ScrollReveal>
            <AnimatePresence mode="wait">
              {state === "success" ? (
                <motion.div key="success"
                  className="flex h-full min-h-[360px] flex-col items-center justify-center gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-10 text-center"
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                  <CheckCircle2 size={48} className="text-emerald-400" />
                  <h3 className="font-display text-xl font-bold text-text-primary">{t.contact.success.title}</h3>
                  <p className="text-sm text-text-secondary">{t.contact.success.desc}</p>
                  <button onClick={() => setState("idle")} className="mt-2 text-xs text-emerald-400 underline underline-offset-4">
                    {t.contact.success.again}
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="flex flex-col gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono-custom text-xs text-text-muted">{t.contact.form.name}</label>
                      <input type="text" required placeholder={t.contact.form.namePlaceholder} value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                        className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary placeholder-text-muted outline-none transition-all focus:border-accent-blue/50 focus:ring-2 focus:ring-accent-blue/15 hover:border-border-light" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono-custom text-xs text-text-muted">{t.contact.form.email}</label>
                      <input type="email" required placeholder={t.contact.form.emailPlaceholder} value={form.email}
                        onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                        className="rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary placeholder-text-muted outline-none transition-all focus:border-accent-blue/50 focus:ring-2 focus:ring-accent-blue/15 hover:border-border-light" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono-custom text-xs text-text-muted">{t.contact.form.message}</label>
                    <textarea required rows={6} placeholder={t.contact.form.messagePlaceholder} value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className="resize-none rounded-xl border border-border bg-surface px-4 py-3 text-sm text-text-primary placeholder-text-muted outline-none transition-all focus:border-accent-blue/50 focus:ring-2 focus:ring-accent-blue/15 hover:border-border-light" />
                  </div>
                  {state === "error" && (
                    <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                      {t.contact.error.desc}
                    </p>
                  )}
                  <motion.button type="submit" disabled={state === "sending"}
                    className="flex h-12 items-center justify-center gap-2 rounded-xl font-medium text-white disabled:opacity-70"
                    style={{ background: "linear-gradient(135deg,#4f8ef7 0%,#9b5cf6 100%)" }}
                    whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    {state === "sending" ? (
                      <>
                        <motion.div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                          animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} />
                        {t.contact.form.sending}
                      </>
                    ) : (
                      <>{t.contact.form.submit} <Send size={15} /></>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </ScrollReveal>

          {/* Contact info */}
          <ScrollReveal direction="left" delay={0.15}>
            <div className="flex flex-col gap-5">
              {/* Availability */}
              <div className="relative overflow-hidden rounded-2xl border border-border p-6"
                style={{ background: "linear-gradient(135deg,rgba(79,142,247,0.08) 0%,rgba(155,92,246,0.06) 100%)" }}>
                <div className="mb-4 flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                  <span className="font-mono-custom text-xs text-emerald-400">{t.contact.availability.status}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-text-primary">{t.contact.availability.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">{t.contact.availability.desc}</p>
                <div className="mt-5 flex flex-col gap-2.5 border-t border-border pt-4">
                  <div className="flex items-center gap-2 text-xs text-text-secondary"><MapPin size={13} className="text-text-muted" />{PROFILE.location} — {t.contact.availability.location}</div>
                  <div className="flex items-center gap-2 text-xs text-text-secondary"><Clock size={13} className="text-text-muted" />{t.contact.availability.response}</div>
                  <div className="flex items-center gap-2 text-xs text-text-secondary"><Mail size={13} className="text-text-muted" />{PROFILE.email}</div>
                </div>
              </div>

              {/* Contact links */}
              <StaggerContainer className="flex flex-col gap-3" delay={0.1} staggerDelay={0.08}>
                {contacts.map((contact) => (
                  <StaggerItem key={contact.label}>
                    <a href={contact.href} target={contact.external ? "_blank" : undefined} rel={contact.external ? "noopener noreferrer" : undefined}
                      className={`card-shine flex items-center gap-4 rounded-xl border ${contact.border} ${contact.bg} p-4 transition-all hover:-translate-y-0.5 hover:shadow-card`}>
                      <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${contact.color}`}
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                        {contact.icon}
                      </div>
                      <div>
                        <p className="font-mono-custom text-[11px] uppercase tracking-wider text-text-muted">{contact.label}</p>
                        <p className="text-sm font-medium text-text-primary">{contact.value}</p>
                      </div>
                    </a>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
