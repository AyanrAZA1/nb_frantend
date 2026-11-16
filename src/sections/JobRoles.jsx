import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import Icon from "../components/Icon";
import SectionTitle from "../components/SectionTitle";
import { Reveal, RevealItem } from "../components/Reveal";
import { spotlightHandlers } from "../hooks/usePointer";
import { ROLES } from "../data/content";

const EASE = [0.22, 1, 0.36, 1];

function RoleCard({ role, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="spotlight group relative h-[310px] overflow-hidden sm:h-[340px] rounded-2xl border border-border bg-surface shadow-soft"
      onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}
      onFocus={(e) => e.target.matches?.(":focus-visible") && setOpen(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setOpen(false)}
      {...spotlightHandlers()}
    >
      {/* Front */}
      <div className="flex h-full flex-col p-6">
        <div className="flex items-center justify-between">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent">
            <Icon name={role.icon} size={24} />
          </span>
          <span className="font-mono text-xs text-muted">0{index + 1}</span>
        </div>
        <h3 className="mt-6 font-display text-xl font-bold text-text">{role.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{role.blurb}</p>
        <p className="mt-auto inline-flex items-center gap-1.5 text-xs font-medium text-muted">
          <TrendingUp size={14} className="text-emerald-500" aria-hidden="true" /> {role.salary}
        </p>
        <button
          type="button"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="mt-4 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-accent"
        >
          View learning path <ArrowRight size={15} aria-hidden="true" />
        </button>
      </div>

      {/* Learning path overlay — slides up (transform only) */}
      <motion.div
        initial={false}
        animate={{ y: open ? "0%" : "101%" }}
        transition={{ duration: 0.45, ease: EASE }}
        className="absolute inset-0 flex flex-col bg-[linear-gradient(160deg,#0B1B2E,#0F2A47)] p-6 text-white"
        aria-hidden={!open}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-cyan">Learning path</p>
        <h3 className="mt-1 font-display text-lg font-bold">{role.title}</h3>
        <ol className="relative mt-5 space-y-4">
          <span className="absolute bottom-2 left-[13px] top-2 w-px bg-white/15" aria-hidden="true" />
          {role.path.map((step, i) => (
            <motion.li
              key={step}
              initial={false}
              animate={{ opacity: open ? 1 : 0, x: open ? 0 : -12 }}
              transition={{ delay: open ? 0.15 + i * 0.1 : 0, duration: 0.35, ease: EASE }}
              className="relative flex items-center gap-3"
            >
              <span className="relative z-[1] grid h-7 w-7 place-items-center rounded-full bg-[linear-gradient(135deg,#2F8FD8,#7FC4F0)] text-xs font-bold text-navy">
                {i + 1}
              </span>
              <span className="text-sm font-medium">{step}</span>
            </motion.li>
          ))}
        </ol>
        <a href="#demo" tabIndex={open ? 0 : -1} className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-brand-cyan hover:underline">
          Get a personalised roadmap <ArrowRight size={15} aria-hidden="true" />
        </a>
      </motion.div>
    </div>
  );
}

export default function JobRoles() {
  return (
    <section id="roles" aria-labelledby="roles-title" className="relative bg-bg-2/60 py-20 sm:py-28">
      <div className="container-x">
        <SectionTitle
          id="roles-title"
          eyebrow="Career paths"
          title="Explore by"
          highlight="job role"
          subtitle="Pick the job you want — we'll map the exact certifications to get you there. Hover or tap a card to preview the path."
        />
        <Reveal className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ROLES.map((r, i) => (
            <RevealItem key={r.title}>
              <RoleCard role={r} index={i} />
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
