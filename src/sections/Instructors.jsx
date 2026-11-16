import { useState } from "react";
import { ArrowRight, Award, RotateCcw } from "lucide-react";
import SectionTitle from "../components/SectionTitle";
import { Reveal, RevealItem } from "../components/Reveal";
import { INSTRUCTORS } from "../data/instructors";

function InstructorCard({ p }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className="flip-scene h-[360px]"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div className="flip-inner h-full" data-flipped={flipped}>
        {/* Front */}
        <div className="flip-face absolute inset-0 flex flex-col items-center rounded-3xl border border-border bg-surface p-7 text-center shadow-soft">
          <div className={`rounded-full bg-gradient-to-br p-[3px] ${p.gradient}`}>
            <div className="grid h-24 w-24 place-items-center rounded-full bg-surface font-display text-3xl font-extrabold text-text">
              {p.initials}
            </div>
          </div>
          <h3 className="mt-5 font-display text-xl font-bold text-text">{p.name}</h3>
          <p className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
            <Award size={15} aria-hidden="true" /> {p.experience}
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {p.skills.map((s) => (
              <span key={s} className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs font-medium text-text">
                {s}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setFlipped(true)}
            className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
            aria-label={`Read more about ${p.name}`}
          >
            Read profile <ArrowRight size={15} aria-hidden="true" />
          </button>
        </div>
        {/* Back */}
        <div className="flip-face flip-back absolute inset-0 flex flex-col rounded-3xl bg-[linear-gradient(150deg,#0B1B2E,#123A63)] p-7 text-white shadow-lift" aria-hidden={!flipped}>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-cyan">{p.title}</p>
          <h3 className="mt-2 font-display text-xl font-bold">{p.name}</h3>
          <p className="mt-4 text-sm leading-relaxed text-white/80">{p.bio}</p>
          <div className="mt-auto flex items-center justify-between">
            <a href="#demo" tabIndex={flipped ? 0 : -1} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-cyan hover:underline">
              Book a session <ArrowRight size={15} aria-hidden="true" />
            </a>
            <button type="button" tabIndex={flipped ? 0 : -1} onClick={() => setFlipped(false)} aria-label="Flip back" className="grid h-9 w-9 place-items-center rounded-lg bg-white/10 hover:bg-white/20">
              <RotateCcw size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Instructors() {
  return (
    <section id="instructors" aria-labelledby="instructors-title" className="relative bg-bg-2/60 py-20 sm:py-28">
      <div className="container-x">
        <SectionTitle id="instructors-title" eyebrow="Mentors" title="Meet our" highlight="instructors" subtitle="Certified practitioners who teach from real deployments, not just textbooks." />
        <Reveal className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
          {INSTRUCTORS.map((p) => (
            <RevealItem key={p.name}>
              <InstructorCard p={p} />
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
