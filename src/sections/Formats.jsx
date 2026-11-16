import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Icon from "../components/Icon";
import SectionTitle from "../components/SectionTitle";
import Button from "../components/Button";
import { Reveal, RevealItem } from "../components/Reveal";
import { FORMATS } from "../data/content";

const EASE = [0.22, 1, 0.36, 1];

function Visual({ id }) {
  // Small illustrative visual per format (pure CSS)
  if (id === "live")
    return (
      <div className="grid grid-cols-3 gap-2">
        {["Trainer", "You", "Aisha", "Rahul", "Lina", "Dev"].map((n, i) => (
          <div key={n} className={`relative grid aspect-video place-items-center rounded-lg text-[11px] font-semibold ${i === 0 ? "col-span-2 row-span-2 bg-[linear-gradient(135deg,#0B4F8A,#2F8FD8)] text-white" : "bg-surface-2 text-muted"}`}>
            {n}
            {i === 0 && <span className="absolute left-2 top-2 flex items-center gap-1 rounded bg-red-500 px-1.5 py-0.5 text-[9px] font-bold text-white"><span className="h-1.5 w-1.5 rounded-full bg-white" />LIVE</span>}
          </div>
        ))}
      </div>
    );
  if (id === "self")
    return (
      <div className="space-y-3">
        {[["Module 1 · Network fundamentals", 100], ["Module 2 · IP addressing", 100], ["Module 3 · Switching", 72], ["Module 4 · Routing", 30]].map(([l, p], i) => (
          <div key={l}>
            <div className="mb-1 flex justify-between text-xs text-muted"><span>{l}</span><span>{p}%</span></div>
            <div className="h-2 overflow-hidden rounded-full bg-surface-2">
              <motion.div className="h-full origin-left rounded-full bg-[linear-gradient(90deg,#2F8FD8,#7FC4F0)]" initial={{ scaleX: 0 }} animate={{ scaleX: p / 100 }} transition={{ duration: 0.8, delay: 0.1 + i * 0.1, ease: EASE }} />
            </div>
          </div>
        ))}
      </div>
    );
  if (id === "classroom")
    return (
      <div>
        <div className="mx-auto mb-3 h-2 w-2/3 rounded-full bg-accent/40" title="Whiteboard" />
        <div className="grid grid-cols-6 gap-2">
          {Array.from({ length: 18 }).map((_, i) => (
            <motion.span key={i} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.025 }} className={`aspect-square rounded-md ${[2, 5, 9, 13].includes(i) ? "bg-surface-2" : "bg-accent/70"}`} />
          ))}
        </div>
      </div>
    );
  return (
    <div className="grid grid-cols-3 gap-2 text-center text-xs font-semibold">
      {[["Live", "40%"], ["Self-paced", "35%"], ["Lab days", "25%"]].map(([l, p]) => (
        <div key={l} className="rounded-xl bg-surface-2 p-3">
          <div className="font-display text-2xl font-extrabold text-accent">{p}</div>
          <div className="mt-1 text-muted">{l}</div>
        </div>
      ))}
    </div>
  );
}

export default function Formats() {
  const [active, setActive] = useState(FORMATS[0].id);
  const listRef = useRef(null);
  const current = FORMATS.find((f) => f.id === active);

  const onKeyDown = (e) => {
    const i = FORMATS.findIndex((f) => f.id === active);
    let n = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") n = (i + 1) % FORMATS.length;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") n = (i - 1 + FORMATS.length) % FORMATS.length;
    if (n === null) return;
    e.preventDefault();
    setActive(FORMATS[n].id);
    listRef.current?.querySelectorAll('[role="tab"]')[n]?.focus();
  };

  return (
    <section id="formats" aria-labelledby="formats-title" className="relative bg-bg-2/60 py-20 sm:py-28">
      <div className="container-x">
        <SectionTitle id="formats-title" eyebrow="Training formats" title="Learn the way" highlight="you learn best" subtitle="Four flexible formats — switch between them anytime during your program." />

        <Reveal className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <RevealItem>
            <div ref={listRef} role="tablist" aria-orientation="vertical" aria-label="Training formats" onKeyDown={onKeyDown} className="grid grid-cols-2 gap-2 lg:grid-cols-1">
              {FORMATS.map((f) => {
                const on = f.id === active;
                return (
                  <button
                    key={f.id}
                    role="tab"
                    type="button"
                    id={`fmt-${f.id}`}
                    aria-selected={on}
                    aria-controls="fmt-panel"
                    tabIndex={on ? 0 : -1}
                    onClick={() => setActive(f.id)}
                    className={`relative flex items-center gap-3 rounded-2xl border p-3 text-left transition-colors sm:p-4 ${on ? "border-accent/50 bg-surface shadow-soft" : "border-transparent hover:bg-surface/60"}`}
                  >
                    {on && <motion.span layoutId="fmt-indicator" className="absolute inset-y-3 left-0 w-1 rounded-full bg-accent" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
                    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${on ? "bg-accent text-[rgb(var(--bg))]" : "bg-surface-2 text-muted"} transition-colors`}>
                      <Icon name={f.icon} size={19} />
                    </span>
                    <span className="text-sm font-semibold text-text sm:text-base">{f.label}</span>
                  </button>
                );
              })}
            </div>
          </RevealItem>

          <RevealItem>
            <div id="fmt-panel" role="tabpanel" aria-labelledby={`fmt-${active}`} className="relative min-h-[420px] overflow-hidden rounded-3xl border border-border bg-surface p-6 shadow-soft sm:p-8">
              <div aria-hidden="true" className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="relative grid gap-8 md:grid-cols-[1.1fr_1fr]"
                >
                  <div>
                    <h3 className="font-display text-2xl font-extrabold text-text sm:text-3xl">{current.headline}</h3>
                    <p className="mt-3 leading-relaxed text-muted">{current.desc}</p>
                    <ul className="mt-6 space-y-3">
                      {current.points.map((p, i) => (
                        <motion.li key={p} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.08 }} className="flex items-center gap-2.5 text-sm font-medium text-text">
                          <CheckCircle2 size={18} className="text-accent" aria-hidden="true" /> {p}
                        </motion.li>
                      ))}
                    </ul>
                    <dl className="mt-7 grid grid-cols-3 gap-3 border-t border-border pt-6">
                      {current.meta.map(([k, v]) => (
                        <div key={k}>
                          <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted">{k}</dt>
                          <dd className="mt-1 text-sm font-semibold text-text">{v}</dd>
                        </div>
                      ))}
                    </dl>
                    <div className="mt-7">
                      <Button href="#demo" variant="primary" onClick={() => window.dispatchEvent(new CustomEvent("nb:form-tab", { detail: "demo" }))}>
                        Book a free counselling call
                      </Button>
                    </div>
                  </div>
                  <div className="self-center rounded-2xl border border-border bg-bg/60 p-4 sm:p-5">
                    <Visual id={current.id} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}
