"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  Send,
  CheckCircle2,
  MapPin,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import ScrollReveal, {
  StaggerContainer,
  StaggerItem,
} from "@/components/animations/ScrollReveal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
    {
      icon: <Mail size={16} aria-hidden="true" />,
      label: "Email",
      value: PROFILE.email,
      href: `mailto:${PROFILE.email}`,
      external: false,
    },
    {
      icon: <Github size={16} aria-hidden="true" />,
      label: "GitHub",
      value: "github.com/mahensraz",
      href: PROFILE.github,
      external: true,
    },
    {
      icon: <Linkedin size={16} aria-hidden="true" />,
      label: "LinkedIn",
      value: "linkedin.com/in/mahensraz",
      href: PROFILE.linkedin,
      external: true,
    },
  ];

  return (
    <section id="contact" className="section-padding">
      <div className="container-section">
        <ScrollReveal className="mb-14">
          <div className="flex items-center gap-3">
            <span className="font-mono-custom text-xs text-accent-blue">
              {t.contact.sectionNum}
            </span>
            <h2 className="font-display text-3xl font-bold text-text-primary lg:text-4xl">
              {t.contact.sectionTitle}
            </h2>
            <div className="ml-4 h-px flex-1 bg-border" />
          </div>
          <p className="mt-4 max-w-2xl text-base text-text-secondary">
            {t.contact.sectionDesc}
          </p>
        </ScrollReveal>

        <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:items-start lg:gap-12">
          {/* Form anchored in a single sober Card */}
          <ScrollReveal>
            <Card className="p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {state === "success" ? (
                  <motion.div
                    key="success"
                    className="flex min-h-[340px] flex-col items-center justify-center gap-4 rounded-xl border border-success/20 bg-success/5 p-8 text-center"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <CheckCircle2 size={44} className="text-success" />
                    <h3 className="font-display text-xl font-semibold text-foreground">
                      {t.contact.success.title}
                    </h3>
                    <p className="max-w-sm text-sm text-muted-foreground">
                      {t.contact.success.desc}
                    </p>
                    <Button
                      type="button"
                      variant="link"
                      size="sm"
                      onClick={() => setState("idle")}
                      className="mt-2 h-auto p-0 text-xs text-success underline underline-offset-4 hover:text-success/90"
                    >
                      {t.contact.success.again}
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="contact-name"
                          className="font-mono-custom text-xs text-muted-foreground"
                        >
                          {t.contact.form.name}
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          autoComplete="name"
                          placeholder={t.contact.form.namePlaceholder}
                          value={form.name}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, name: e.target.value }))
                          }
                          className="rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20 hover:border-ring/70"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="contact-email"
                          className="font-mono-custom text-xs text-muted-foreground"
                        >
                          {t.contact.form.email}
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          autoComplete="email"
                          placeholder={t.contact.form.emailPlaceholder}
                          value={form.email}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, email: e.target.value }))
                          }
                          className="rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20 hover:border-ring/70"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="contact-message"
                        className="font-mono-custom text-xs text-muted-foreground"
                      >
                        {t.contact.form.message}
                      </label>
                      <textarea
                        id="contact-message"
                        required
                        rows={6}
                        placeholder={t.contact.form.messagePlaceholder}
                        value={form.message}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, message: e.target.value }))
                        }
                        className="resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20 hover:border-ring/70"
                      />
                    </div>

                    {state === "error" && (
                      <p
                        role="alert"
                        className="rounded-xl border border-destructive bg-destructive px-3 py-2 text-xs text-destructive-foreground"
                      >
                        {t.contact.error.desc}
                      </p>
                    )}

                    <motion.div
                      whileHover={state === "sending" ? undefined : { scale: 1.01 }}
                      whileTap={state === "sending" ? undefined : { scale: 0.99 }}
                    >
                      <Button
                        type="submit"
                        variant="gradient"
                        disabled={state === "sending"}
                        className="h-12 w-full rounded-xl text-base disabled:opacity-70"
                      >
                        {state === "sending" ? (
                          <>
                            <motion.div
                              className="h-4 w-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground"
                              animate={{ rotate: 360 }}
                              transition={{
                                repeat: Infinity,
                                duration: 0.8,
                                ease: "linear",
                              }}
                            />
                            {t.contact.form.sending}
                          </>
                        ) : (
                          <>
                            {t.contact.form.submit} <Send size={15} />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>
            </Card>
          </ScrollReveal>

          {/* Editorial availability + hairline direct links (no repeated cards) */}
          <ScrollReveal direction="left" delay={0.15}>
            <div className="flex flex-col gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-success" />
                  <span className="font-mono-custom text-xs text-success">
                    {t.contact.availability.status}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {t.contact.availability.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t.contact.availability.desc}
                  </p>
                </div>

                <div className="space-y-2 pt-1">
                  <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                    <MapPin size={14} className="shrink-0" aria-hidden="true" />
                    <span>
                      {PROFILE.location} — {t.contact.availability.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                    <Clock size={14} className="shrink-0" aria-hidden="true" />
                    <span>{t.contact.availability.response}</span>
                  </div>
                </div>
              </div>

              <StaggerContainer
                className="divide-y divide-border border-y border-border"
                delay={0.08}
                staggerDelay={0.06}
              >
                {contacts.map((contact) => (
                  <StaggerItem key={contact.label}>
                    <a
                      href={contact.href}
                      target={contact.external ? "_blank" : undefined}
                      rel={contact.external ? "noopener noreferrer" : undefined}
                      className="group -mx-2 flex items-center justify-between gap-3 rounded-lg px-2 py-4 transition-colors duration-200 hover:bg-card/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <div className="flex min-w-0 items-center gap-3.5">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-card text-muted-foreground transition-colors duration-200 group-hover:border-border-light group-hover:text-foreground">
                          {contact.icon}
                        </div>
                        <div className="min-w-0">
                          <p className="font-mono-custom text-[11px] uppercase tracking-wider text-muted-foreground">
                            {contact.label}
                          </p>
                          <p className="break-all text-sm font-medium text-foreground">
                            {contact.value}
                          </p>
                        </div>
                      </div>
                      <ArrowUpRight
                        size={15}
                        aria-hidden="true"
                        className="shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
                      />
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
