import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Award, BookOpen, Calendar, Check, ChevronDown, Clock, Download, Headphones, Signal, Star, Users, X } from "lucide-react";
import { toast } from "sonner";
import Icon from "./Icon";
import { CURRICULA } from "../data/curriculum";

const EASE = [0.22, 1, 0.36, 1];
const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Locks page scroll while open, without the layout jump from a disappearing scrollbar. */
function useScrollLock(active) {
  useEffect(() => {
    if (!active) return;
    const { body, documentElement } = document;
    const prev = { overflow: body.style.overflow, paddingRight: body.style.paddingRight };
    const gap = window.innerWidth - documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    return () => {
      body.style.overflow = prev.overflow;
      body.style.paddingRight = prev.paddingRight;
    };
  }, [active]);
}

function Module({ index, module, open, onToggle }) {
  const id = useId();
  return (
    <li className="rounded-xl border border-border bg-surface-2/60">
      <h4>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={onToggle}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors hover:bg-accent/5"
        >
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-accent/10 font-mono text-xs font-semibold text-accent">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="flex-1 text-sm font-semibold text-text">{module.title}</span>
          <span className="hidden text-xs text-muted sm:inline">{module.topics.length} topics</span>
          <ChevronDown size={16} aria-hidden="true" className={`shrink-0 text-muted transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
        </button>
      </h4>
      {/* grid-rows 0fr → 1fr animates to the content's natural height in pure CSS */}
      <div id={id} className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <div className="overflow-hidden" inert={open ? undefined : ""}>
          <ul className="space-y-1.5 px-4 pb-4 pl-14 text-sm text-muted">
            {module.topics.map((t) => (
              <li key={t} className="relative before:absolute before:-left-3.5 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-accent/70">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}

/**
 * Course details dialog opened from a course card's "View curriculum" button.
 * Accessible modal: focus moves in on open, Tab is trapped, Escape/backdrop close it,
 * and focus returns to the button that opened it.
 */
export default function CurriculumDialog({ course, onClose, onTalk }) {
  const reduce = useReducedMotion();
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const titleId = useId();
  const [openModules, setOpenModules] = useState(() => new Set([0]));
  const info = course ? CURRICULA[course.id] : null;

  useScrollLock(Boolean(course));

  // Reset accordion when a different course opens
  useEffect(() => {
    if (course) setOpenModules(new Set([0]));
  }, [course]);

  // Focus management + keyboard handling
  useEffect(() => {
    if (!course) return;
    const opener = document.activeElement;
    const t = window.setTimeout(() => closeRef.current?.focus(), 30);
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = [...panelRef.current.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      if (opener instanceof HTMLElement) opener.focus({ preventScroll: true });
    };
  }, [course, onClose]);

  const allOpen = info && openModules.size === info.modules.length;
  const toggle = (i) =>
    setOpenModules((s) => {
      const next = new Set(s);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  const toggleAll = () => setOpenModules(allOpen ? new Set() : new Set(info.modules.map((_, i) => i)));

  const downloadSyllabus = () => {
    if (!course || !info) return;
    const content = `NETWORK BINARY — COURSE SYLLABUS & CURRICULUM
==================================================
Course: ${course.title}
Code: ${course.art.code}
Certification Exam: ${info.exam}
Duration: ${course.duration} | Level: ${course.level}
Next Cohort: ${course.cohort}
Rating: ${course.rating}/5.0 (${course.learners.toLocaleString("en-IN")} enrolled)

OVERVIEW:
${info.overview}

WHAT YOU'LL LEARN:
${info.outcomes.map((o) => `• ${o}`).join("\n")}

MODULE-BY-MODULE CURRICULUM:
${info.modules
  .map(
    (m, idx) => `
${idx + 1}. ${m.title}
${m.topics.map((t) => `   - ${t}`).join("\n")}`
  )
  .join("\n")}

WHAT'S INCLUDED:
${info.includes.map((inc) => `✓ ${inc}`).join("\n")}

==================================================
Contact Network Binary:
Email: learning@networkbinary.com
Phone/WhatsApp: +91 92891 11686
Website: https://networkbinary.com
`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${course.id}-syllabus-network-binary.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success("Syllabus downloaded!", {
      description: `Complete syllabus for “${course.title}” saved to your device.`,
    });
  };

  return createPortal(
    <AnimatePresence>
      {course && (
        <motion.div
          key="curriculum"
          className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div aria-hidden="true" className="absolute inset-0 bg-[#050C16]/60 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-border bg-surface shadow-lift sm:max-h-[88vh] sm:rounded-3xl"
            initial={{ opacity: 0, y: reduce ? 0 : 40, scale: reduce ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: reduce ? 0 : 24, scale: reduce ? 1 : 0.98 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            {/* Header */}
            <header className="relative shrink-0 overflow-hidden px-5 pb-5 pt-5 text-white sm:px-7 sm:pt-6" style={{ background: `linear-gradient(135deg, ${course.art.from}, ${course.art.to})` }}>
              <Icon name={course.art.icon} size={150} strokeWidth={1} className="pointer-events-none absolute -bottom-8 -right-6 text-white/15" />
              <div className="relative flex items-start justify-between gap-4">
                <span className="rounded-lg bg-white/15 px-2.5 py-1 font-mono text-xs font-semibold tracking-wider backdrop-blur">{course.art.code}</span>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close course details"
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/15 backdrop-blur transition hover:bg-white/30 focus-visible:outline-white"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>
              <h3 id={titleId} className="relative mt-4 max-w-[90%] font-display text-xl font-bold leading-snug sm:text-2xl">
                {course.title}
              </h3>
              <ul className="relative mt-4 flex flex-wrap gap-2 text-xs font-medium">
                {[
                  [Clock, course.duration],
                  [Signal, course.level],
                  [Calendar, `Next cohort: ${course.cohort}`],
                  [Star, `${course.rating} rating`],
                  [Users, `${course.learners.toLocaleString("en-IN")} enrolled`],
                ].map(([I, label]) => (
                  <li key={label} className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 backdrop-blur">
                    <I size={13} aria-hidden="true" /> {label}
                  </li>
                ))}
              </ul>
            </header>

            {/* Body */}
            <div className="scroll-thin flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-7">
              {info ? (
                <div className="space-y-7">
                  <p className="text-[0.95rem] leading-relaxed text-muted">{info.overview}</p>

                  <section aria-labelledby={`${titleId}-learn`}>
                    <h4 id={`${titleId}-learn`} className="font-display text-base font-bold text-text">What you'll learn</h4>
                    <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                      {info.outcomes.map((o) => (
                        <li key={o} className="flex gap-2.5 text-sm text-text">
                          <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                            <Check size={12} strokeWidth={3} aria-hidden="true" />
                          </span>
                          {o}
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section aria-labelledby={`${titleId}-cur`}>
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <h4 id={`${titleId}-cur`} className="font-display text-base font-bold text-text">Curriculum</h4>
                        <p className="mt-0.5 text-xs text-muted">
                          {info.modules.length} modules · {info.modules.reduce((n, m) => n + m.topics.length, 0)} topics
                        </p>
                      </div>
                      <button type="button" onClick={toggleAll} className="text-xs font-semibold text-accent hover:underline">
                        {allOpen ? "Collapse all" : "Expand all"}
                      </button>
                    </div>
                    <ol className="mt-3 space-y-2">
                      {info.modules.map((m, i) => (
                        <Module key={m.title} index={i} module={m} open={openModules.has(i)} onToggle={() => toggle(i)} />
                      ))}
                    </ol>
                  </section>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <section className="rounded-xl border border-border p-4" aria-labelledby={`${titleId}-inc`}>
                      <h4 id={`${titleId}-inc`} className="flex items-center gap-2 text-sm font-bold text-text">
                        <BookOpen size={16} className="text-accent" aria-hidden="true" /> What's included
                      </h4>
                      <ul className="mt-2.5 space-y-1.5 text-sm text-muted">
                        {info.includes.map((x) => (
                          <li key={x} className="flex gap-2">
                            <Check size={14} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" /> {x}
                          </li>
                        ))}
                      </ul>
                    </section>
                    <section className="rounded-xl border border-border p-4" aria-labelledby={`${titleId}-exam`}>
                      <h4 id={`${titleId}-exam`} className="flex items-center gap-2 text-sm font-bold text-text">
                        <Award size={16} className="text-accent" aria-hidden="true" /> Certification
                      </h4>
                      <p className="mt-2.5 text-sm text-muted">{info.exam}</p>
                    </section>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted">The detailed curriculum for this course is coming soon. Talk to our experts for the full syllabus.</p>
              )}
            </div>

            {/* Footer */}
            <footer className="flex shrink-0 flex-col-reverse gap-2.5 border-t border-border bg-surface px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <button
                type="button"
                onClick={downloadSyllabus}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border bg-surface-2/60 px-4 text-sm font-semibold text-text transition-colors hover:border-accent/60 hover:text-accent"
              >
                <Download size={16} aria-hidden="true" /> Download syllabus
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="hidden sm:inline-flex h-11 items-center justify-center rounded-xl border border-border px-4 text-sm font-semibold text-text transition-colors hover:border-accent/60"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => onTalk(course)}
                  className="btn-shine inline-flex h-11 flex-1 sm:flex-none items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,rgb(var(--btn-from)),rgb(var(--btn-to)))] px-5 text-sm font-semibold text-[rgb(var(--btn-text))] shadow-glow"
                >
                  <Headphones size={16} aria-hidden="true" /> Talk to our experts
                </button>
              </div>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
